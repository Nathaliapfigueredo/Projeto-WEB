const accountsService = require('../services/accountsService');
const { accountSchema, loginSchema } = require('../models/accountsModel');

// Função para renderizar a view do formulário
exports.formUser = (req, res) => {
  console.log("[AccountsController] - formUser");
  res.render("formUser");
};


exports.cadastrarAccount = async (req, res) => {
  console.log("Dados recebidos no body:", req.body);
  const { error } = accountSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const account = await accountsService.cadastrarAccount(req.body);
    console.log("Conta criada:", account); 

    if (req.body.user_type === 'aluno') {
      console.log("Conta de aluno criada. Redirecionando para o formulário de dados do aluno.");
      return res.redirect(`/api/aluno/form?id=${account.id}`);
    }

    res.status(201).json(account);
  } catch (err) {
    console.error("Erro ao criar conta:", err); 
    res.status(500).json({ error: err.message });
  }
};

exports.loginAccount = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await accountsService.loginAccount(req.body);
    res.status(200).json({ message: 'Login bem-sucedido', user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.listarCadastros = async (req, res) => {
  try {
    const accounts = await accountsService.listarCadastros();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.buscarCadastro = async (req, res) => {
  try {
    const account = await accountsService.buscarCadastro(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.editarCadastro = async (req, res) => {
  const { error } = accountSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const account = await accountsService.editarCadastro(req.params.id, req.body);
    res.status(200).json(account);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.excluirAccount = async (req, res) => {
  try {
    await accountsService.excluirAccount(req.params.id);
    res.status(200).json({ message: 'Account excluída com sucesso' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};