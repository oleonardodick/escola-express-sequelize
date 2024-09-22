const { Router } = require('express');
const CategoriaController = require('../controllers/CategoriaController.js');

const categoriaController = new CategoriaController();

const router = Router();

router.get('/categorias', (req, res) =>
  categoriaController.buscaTodosOsRegistros(req, res)
);

router.get('/categorias/:id', (req, res) =>
  categoriaController.buscaPorId(req, res)
);
router.post('/categorias', (req, res) =>
  categoriaController.criaNovo(req, res)
);
router.put('/categorias/:id', (req, res) =>
  categoriaController.atualizaRegistro(req, res)
);
router.delete('/categorias/:id', (req, res) =>
  categoriaController.excluiRegistro(req, res)
);

module.exports = router;
