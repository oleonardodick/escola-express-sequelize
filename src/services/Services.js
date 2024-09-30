const dataSource = require('../database/models');

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async buscaTodosOsRegistros(where = {}) {
    return await dataSource[this.model].findAll({ where: { ...where } });
  }

  async buscaRegistrosPorEscopo(escopo) {
    return await dataSource[this.model].scope(escopo).findAll();
  }

  async buscaPorId(id) {
    return await dataSource[this.model].findByPk(id);
  }

  async buscaRegistro(where) {
    return await dataSource[this.model].findOne({ where: { ...where } });
  }

  async buscaEContaRegistros(options) {
    return await dataSource[this.model].findAndCountAll({ ...options });
  }

  async criaNovo(dadosParaCriacao) {
    return await dataSource[this.model].create(dadosParaCriacao);
  }

  async atualizaRegistro(dadosAtualizados, where, transacao = null) {
    const options = {
      where: { ...where },
    };
    if (transacao) {
      options.transacao = transacao;
    }
    console.log(options);
    const listaDeRegistrosAtualizados = await dataSource[this.model].update(
      dadosAtualizados,
      options
    );
    return listaDeRegistrosAtualizados[0] > 0;
  }

  async excluiRegistro(where) {
    return await dataSource[this.model].destroy({ where: { ...where } });
  }
}

module.exports = Services;
