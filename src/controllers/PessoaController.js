const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor() {
    super(pessoaServices);
  }

  async buscaMatriculasAtivasPorEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculas =
        await pessoaServices.buscaMatriculasAtivasPorEstudante(
          Number(estudante_id)
        );
      return res.status(200).json(listaMatriculas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async buscaTodasMatriculasPorEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculas =
        await pessoaServices.buscaTodasMatriculasPorEstudante(
          Number(estudante_id)
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

  async cancelaRegistroEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      await pessoaServices.cancelaPessoaEMatriculas(Number(estudante_id));
      return res
        .status(200)
        .json({
          mensagem: `Matrículas ref. estudante ${estudante_id} canceladas.`,
        });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = PessoaController;
