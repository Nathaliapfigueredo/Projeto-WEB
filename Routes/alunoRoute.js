const express = require('express');
const router = express.Router();

const alunoController = require('../controllers/alunoController');

// Use rotas relativas ao path definido no server.js (/api/aluno)
router.get('/', alunoController.listarAluno);
router.post('/', alunoController.cadastrarAluno);
router.put('/:id', alunoController.editarAluno);
router.delete('/:id', alunoController.excluirAluno);

module.exports = router;
