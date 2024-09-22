const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor() {
    super(pessoaServices);
  }

  async buscaMatriculasPorEstudante(req, res) {
    const { estudanteId } = req.params;
    try {
      const listaMatriculas = await pessoaServices.buscaMatriculasPorEstudante(
        Number(estudanteId)
      );
      return res.status(200).json(listaMatriculas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async buscaTodasAsPessoas(req, res) {
    try {
      const listaPessoas = await pessoaServices.buscaPessoasEscopoTodos();
      return res.status(200).json(listaPessoas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = PessoaController;
