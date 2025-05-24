const express = require('express');
const router = express.Router();

const sessaoController = require('../controllers/sessaoController');

// Use rotas relativas ao path definido no server.js (/api/aluno)
router.get('/', sessaoController.listarSessao);
router.post('/', sessaoController.cadastrarSessao);
router.put('/:id', sessaoController.editarSessao);
router.delete('/:id', sessaoController.excluirSessao);
router.get('/:id', sessaoController.listarSessao);


module.exports = router;
