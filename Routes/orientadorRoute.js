const express = require('express');
const router = express.Router();

const orientadorController = require('../controllers/orientadorController');

// Use rotas relativas ao path definido no server.js (/api/aluno)
router.get('/', orientadorController.listarOrientador);
router.post('/', orientadorController.cadastrarOrientador);
router.get('/:id', orientadorController.buscarOrientador);
router.put('/:id', orientadorController.editarOrientador);
router.delete('/:id', orientadorController.excluirOrientador);

module.exports = router;
