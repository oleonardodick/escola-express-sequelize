const converteIds = require('../utils/conversorDeStringHelper');

class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async buscaTodosOsRegistros(req, res) {
    try {
      const listaDeRegistros =
        await this.entidadeService.buscaTodosOsRegistros();
      return res.status(200).json(listaDeRegistros);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async buscaPorId(req, res) {
    const { id } = req.params;
    try {
      const registro = await this.entidadeService.buscaPorId(Number(id));
      return res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async buscaRegistro(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      const registro = await this.entidadeService.buscaRegistro(where);
      return res.status(200).json(registro);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    const requisicaoVazia = Object.keys(dadosParaCriacao).length === 0;
    try {
      if (requisicaoVazia) {
        throw new Error('Corpo da requisição vazio');
      }
      const registroCriado = await this.entidadeService.criaNovo(
        dadosParaCriacao
      );
      return res.status(201).json(registroCriado);
    } catch (erro) {
      return res
        .status(requisicaoVazia ? 400 : 500)
        .json({ erro: erro.message });
    }
  }

  async atualizaRegistro(req, res) {
    const { ...params } = req.params;
    const dadosAtualizados = req.body;
    const where = converteIds(params);
    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(
        dadosAtualizados,
        where
      );
      if (!foiAtualizado) {
        return res
          .status(400)
          .json({ mensagem: 'registro não foi atualizado' });
      } else {
        return res
          .status(200)
          .json({ mensagem: 'registro atualizado com sucesso' });
      }
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({ erro: erro.message });
    }
  }

  async excluiRegistro(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      await this.entidadeService.excluiRegistro(where);
      return res
        .status(200)
        .json({ mensagem: 'registro deletado com sucesso' });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = Controller;
