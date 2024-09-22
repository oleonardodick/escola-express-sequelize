'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id',
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        //vai buscar somente as matriculas com esse status
        scope: { status: 'matriculado' },
        //e retornar no json com esse nome
        as: 'aulasMatriculadas',
      });
    }
  }
  Pessoa.init(
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      cpf: DataTypes.STRING,
      ativo: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Pessoa',
      tableName: 'pessoas',
    }
  );
  return Pessoa;
};
