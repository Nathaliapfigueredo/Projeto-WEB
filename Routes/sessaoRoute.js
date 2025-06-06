const express = require('express');
const router = express.Router();

const sessaoController = require('../controllers/sessaoController');


router.get('/agendar/:id', sessaoController.renderizarPaginaAgendamento);

router.get('/', sessaoController.listarSessao);
router.post('/', sessaoController.cadastrarSessao);
router.get('/:id', sessaoController.buscarSessao);
router.put('/:id', sessaoController.editarSessao);
router.delete('/:id', sessaoController.excluirSessao);


module.exports = router;
