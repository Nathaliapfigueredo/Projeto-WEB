const express = require('express');
const router = express.Router();

const alunoController = require('../controllers/alunoController');

router.get('/form', alunoController.formAluno);
router.get('/listaOrientadores', alunoController.listaOrientadores);

router.get('/', alunoController.listarAluno);
router.post('/', alunoController.cadastrarAluno);
router.get('/:id', alunoController.buscarAluno);
router.put('/:id', alunoController.editarAluno);
router.delete('/:id', alunoController.excluirAluno);

module.exports = router;
