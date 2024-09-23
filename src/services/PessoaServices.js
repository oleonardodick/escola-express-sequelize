const dataSource = require('../database/models');
const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
    this.matriculaServices = new Services('Matricula');
  }

  async buscaMatriculasAtivasPorEstudante(id) {
    const estudante = await super.buscaPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  async buscaTodasMatriculasPorEstudante(id) {
    const estudante = await super.buscaPorId(id);
    const listaMatriculas = await estudante.getTodasMatriculas();
    return listaMatriculas;
  }

  async buscaPessoasEscopoTodos() {
    const listaPessoas = await super.buscaRegistrosPorEscopo(
      'todosOsRegistros'
    );
    return listaPessoas;
  }

  async cancelaPessoaEMatriculas(estudante_id) {
    return dataSource.sequelize.transaction(async (transacao) => {
      await super.atualizaRegistro(
        { ativo: false },
        { id: estudante_id },
        transacao
      );
      await this.matriculaServices.atualizaRegistro(
        { status: 'cancelado' },
        { estudante_id: estudante_id },
        transacao
      );
    });
  }
}

module.exports = PessoaServices;
