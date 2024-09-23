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

  async criaNovo(dadosParaCriacao) {
    return await dataSource[this.model].create(dadosParaCriacao);
  }

  async atualizaRegistro(dadosAtualizados, where) {
    const listaDeRegistrosAtualizados = await dataSource[this.model].update(
      dadosAtualizados,
      { where: { ...where } }
    );
    return listaDeRegistrosAtualizados[0] > 0;
  }

  async excluiRegistro(where) {
    return await dataSource[this.model].destroy({ where: { ...where } });
  }
}

module.exports = Services;
