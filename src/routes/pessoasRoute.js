const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = Router();

router.get('/pessoas', (req, res) =>
  pessoaController.buscaTodosOsRegistros(req, res)
);
router.get('/pessoas/todas', (req, res) =>
  pessoaController.buscaTodasAsPessoas(req, res)
);
router.get('/pessoas/:id', (req, res) => pessoaController.buscaPorId(req, res));
router.post('/pessoas', (req, res) => pessoaController.criaNovo(req, res));
router.put('/pessoas/:id', (req, res) =>
  pessoaController.atualizaRegistro(req, res)
);
router.put('/pessoas/:estudante_id/cancela', (req, res) =>
  pessoaController.cancelaRegistroEstudante(req, res)
);
router.delete('/pessoas/:id', (req, res) =>
  pessoaController.excluiRegistro(req, res)
);
router.get('/pessoas/:estudante_id/matriculas', (req, res) =>
  pessoaController.buscaMatriculasAtivasPorEstudante(req, res)
);
router.get('/pessoas/:estudante_id/matriculas/todas', (req, res) =>
  pessoaController.buscaTodasMatriculasPorEstudante(req, res)
);
router.get('/pessoas/:estudante_id/matriculas/confirmadas', (req, res) =>
  matriculaController.buscaMatriculasPorEstudante(req, res)
);
router.get('/pessoas/matriculas/lotadas', (req, res) =>
  matriculaController.buscaCursosLotados(req, res)
);
router.get('/pessoas/:estudante_id/matriculas/:id', (req, res) =>
  matriculaController.buscaRegistro(req, res)
);
router.post('/pessoas/:estudante_id/matriculas', (req, res) =>
  matriculaController.criaNovo(req, res)
);
router.put('/pessoas/:estudante_id/matriculas/:id', (req, res) =>
  matriculaController.atualizaRegistro(req, res)
);
router.delete('/pessoas/:estudante_id/matriculas/:id', (req, res) =>
  matriculaController.excluiRegistro(req, res)
);

module.exports = router;
