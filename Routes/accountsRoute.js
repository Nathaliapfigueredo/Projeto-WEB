// routes/index.js
const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');


// Rotas para o CRUD de accounts
router.get('/accounts', accountsController.listarCadastros);
router.post('/accounts', accountsController.cadastrarAccount);
router.put('/accounts/:id', accountsController.editarCadastro);
router.delete('/accounts/:id', accountsController.excluirAccount);

// Rota para login
router.post('/login', accountsController.loginAccount);

module.exports = router;



