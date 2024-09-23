const { Router } = require('express');
const CursoController = require('../controllers/CursoController.js');

const cursoController = new CursoController();

const router = Router();

router.get('/cursos', (req, res) => cursoController.buscaCursos(req, res));
router.get('/cursos/:id', (req, res) => cursoController.buscaPorId(req, res));
router.post('/cursos', (req, res) => cursoController.criaNovo(req, res));
router.put('/cursos/:id', (req, res) =>
  cursoController.atualizaRegistro(req, res)
);
router.delete('/cursos/:id', (req, res) =>
  cursoController.excluiRegistro(req, res)
);

module.exports = router;
