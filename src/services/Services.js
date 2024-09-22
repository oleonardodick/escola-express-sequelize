const dataSource = require('../models');

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async buscaTodosOsRegistros() {
    return await dataSource[this.model].findAll();
  }

  async buscaPorId(id) {
    return await dataSource[this.model].findByPk(id);
  }

  async criaNovo(dadosParaCriacao) {
    return await dataSource[this.model].create(dadosParaCriacao);
  }

  async atualizaRegistro(dadosAtualizados, id) {
    const listaDeRegistrosAtualizados = await dataSource[this.model].update(
      dadosAtualizados,
      { where: { id: id } }
    );
    return listaDeRegistrosAtualizados[0] > 0;
  }

  async excluiRegistro(id) {
    return await dataSource[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;
