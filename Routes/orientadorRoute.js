const express = require('express');
const router = express.Router();

const orientadorController = require('../controllers/orientadorController');

router.get('/form', orientadorController.formOrientador);
router.get('/lista', orientadorController.mostrarLista);


router.post('/', orientadorController.cadastrarOrientador);
router.get('/', orientadorController.getAll);

router.get('/:id', orientadorController.buscarOrientador);
router.put('/:id', orientadorController.editarOrientador);
router.delete('/:id', orientadorController.excluirOrientador);

module.exports = router;
