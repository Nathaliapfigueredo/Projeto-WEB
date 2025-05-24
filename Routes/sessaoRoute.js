const express = require('express');
const router = express.Router();

const sessaoController = require('../controllers/sessaoController');

// Use rotas relativas ao path definido no server.js (/api/aluno)
router.get('/', sessaoController.listarSessao);
router.post('/', sessaoController.cadastrarSessao);
router.get('/:id', sessaoController.buscarSessao);
router.put('/:id', sessaoController.editarSessao);
router.delete('/:id', sessaoController.excluirSessao);


module.exports = router;
