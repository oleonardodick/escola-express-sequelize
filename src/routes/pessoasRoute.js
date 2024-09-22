const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = Router();

router.get('/pessoas', (req, res) =>
  pessoaController.buscaTodosOsRegistros(req, res)
);

router.get('/pessoas/:id', (req, res) => pessoaController.buscaPorId(req, res));
router.post('/pessoas', (req, res) => pessoaController.criaNovo(req, res));
router.put('/pessoas/:id', (req, res) =>
  pessoaController.atualizaRegistro(req, res)
);
router.delete('/pessoas/:id', (req, res) =>
  pessoaController.excluiRegistro(req, res)
);
router.get('/pessoas/:estudanteId/matriculas', (req, res) =>
  pessoaController.buscaMatriculasPorEstudante(req, res)
);
router.post('/pessoas/:estudanteId/matriculas', (req, res) =>
  matriculaController.criaNovo(req, res)
);

module.exports = router;
