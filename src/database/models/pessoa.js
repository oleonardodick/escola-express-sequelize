'use strict';
const isCpfValido = require('../../utils/validaCpfHelper.js');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id',
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        //vai buscar somente os alunos matriculados
        scope: { status: 'matriculado' },
        as: 'aulasMatriculadas',
      });
    }
  }
  Pessoa.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 30],
            msg: 'O campo nome deve ter entre 3 e 30 caracteres.',
          },
        },
      },
      /*Adicionar esse código do validate é o equivalente ao
      CHECK do banco de dados. Com isso no momento de inserir
      ele valida se é e-mail e, se não for, bloqueia a inserção
      apresentando a mensagem.*/
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Formato do e-mail inválido.',
          },
        },
      },
      cpf: {
        type: DataTypes.STRING,
        validate: {
          cpfEhValido: (cpf) => {
            if (!isCpfValido(cpf)) throw new Error('Número de CPF inválido');
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Pessoa',
      tableName: 'pessoas',
      paranoid: true,
      /*Escopo exclusivo do modelo. Diferente do escopo de matriculado
      que avalia conforme o campo da tabela de matrícula. Com isso
      ao fazer um get, buscará somente as pessoas com o ativo = true*/
      defaultScope: {
        where: {
          ativo: true,
        },
      },
      /*Outros escopos. Nesse exemplo será criado um escopo que permite
      trazer todos os registros, inclusive os com ativo = false, caso
      o usuário final queira essa informação*/
      scopes: {
        todosOsRegistros: {
          where: {},
        },
      },
    }
  );
  return Pessoa;
};
