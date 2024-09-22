const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
  }

  async buscaMatriculasPorEstudante(id) {
    const estudante = await super.buscaPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  async buscaPessoasEscopoTodos() {
    const listaPessoas = await super.buscaRegistrosPorEscopo(
      'todosOsRegistros'
    );
    return listaPessoas;
  }
}

module.exports = PessoaServices;
