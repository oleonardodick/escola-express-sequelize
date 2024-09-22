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

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const registroCriado = await this.entidadeService.criaNovo(
        dadosParaCriacao
      );
      return res.status(201).json(registroCriado);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async atualizaRegistro(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(
        dadosAtualizados,
        Number(id)
      );
      if (!foiAtualizado) {
        return res
          .status(400)
          .json({ mensagem: `registro ${id} não foi atualizado` });
      } else {
        return res
          .status(200)
          .json({ mensagem: `registro ${id} atualizado com sucesso` });
      }
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async excluiRegistro(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluiRegistro(Number(id));
      return res
        .status(200)
        .json({ mensagem: `id ${id} deletado com sucesso` });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = Controller;
