const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');

router.get('/', accountsController.listarCadastros);
router.post('/', accountsController.cadastrarAccount);
router.put('/:id', accountsController.editarCadastro);
router.delete('/:id', accountsController.excluirAccount);

// Adicione outras rotas específicas, tipo login
router.post('/login', accountsController.loginAccount);

module.exports = router;



