const express = require('express');
const router = express.Router();

const orientadorController = require('../controllers/orientadorController');

router.get('/form', orientadorController.formOrientador);

router.post('/', orientadorController.cadastrarOrientador);
router.get('/', orientadorController.renderizarListaOrientadores);
router.get('/:id', orientadorController.buscarOrientador);
router.put('/:id', orientadorController.editarOrientador);
router.delete('/:id', orientadorController.excluirOrientador);


module.exports = router;
