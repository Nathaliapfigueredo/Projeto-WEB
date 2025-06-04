const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');


router.post('/login', accountsController.loginAccount);

router.get('/form', accountsController.formUser);
router.get('/', accountsController.listarCadastros);
router.post('/', accountsController.cadastrarAccount);
router.get('/:id', accountsController.buscarCadastro);
router.put('/:id', accountsController.editarCadastro);
router.delete('/:id', accountsController.excluirAccount);



module.exports = router;



