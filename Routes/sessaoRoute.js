const express = require('express');
const router = express.Router();

const sessaoController = require('../controllers/sessaoController');


router.post('/', sessaoController.cadastrarSessao);
router.get('/:id', sessaoController.buscarSessao);
router.put('/:id', sessaoController.editarSessao);
router.delete('/:id', sessaoController.excluirSessao);

router.get('/listaSessoes', sessaoController.listarSessoes);


module.exports = router;
