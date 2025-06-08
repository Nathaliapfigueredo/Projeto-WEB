const express = require('express');
const router = express.Router();

const sessaoController = require('../controllers/sessaoController');


router.post('/', sessaoController.cadastrarSessao);
router.get('/lista', sessaoController.listarSessoes);
router.get('/:id', sessaoController.buscarSessao);
router.put('/:id', sessaoController.editarSessao);
router.delete('/:id', sessaoController.excluirSessao);


module.exports = router;
