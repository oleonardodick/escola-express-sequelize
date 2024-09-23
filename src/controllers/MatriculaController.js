const Sequelize = require('sequelize');
const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async buscaMatriculasPorEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculas = await matriculaServices.buscaEContaRegistros({
        where: {
          estudante_id: Number(estudante_id),
          status: 'matriculado',
        },
        //utilizado para fazer paginação
        limit: 2,
        //utilizado para ordenar os registros
        order: [['id', 'DESC']],
      });
      return res.status(200).json(listaMatriculas);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async buscaCursosLotados(req, res) {
    const lotacaoCurso = 2;
    try {
      const cursosLotados = await matriculaServices.buscaEContaRegistros({
        where: {
          status: 'matriculado',
        },
        attributes: ['curso_id'],
        group: ['curso_id'],
        having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`),
      });
      return res.status(200).json(cursosLotados.count);
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = MatriculaController;
