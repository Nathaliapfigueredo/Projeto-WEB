const express = require('express');
const router = express.Router();

const alunoController = require('../controllers/alunoController');

router.get('/aluno', alunoController.listarAluno);
router.post('/aluno', alunoController.cadastrarAluno);
router.put('/aluno/:id', alunoController.editarAluno);
router.delete('/aluno/:id', alunoController.excluirAluno);

module.exports = router;