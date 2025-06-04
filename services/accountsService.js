// services/accountsService.js
const accountsRepository = require('../repositories/accountsRepository');

exports.cadastrarAccount = async ({ nome, email, senha,user_type }) => {
  const result = await accountsRepository.createAccount(nome, email, senha, user_type);
  return result.rows[0];
};

exports.loginAccount = async ({ email, senha }) => {
  const result = await accountsRepository.findAccountByEmail(email);
  if (result.rows.length === 0) {
    throw new Error('Credenciais inválidas');
  }

  const user = result.rows[0];
  if (user.senha !== senha) {
    throw new Error('Credenciais inválidas');
  }

  return user;
};

exports.listarCadastros = async () => {
  const result = await accountsRepository.getAllAccounts();
  return result.rows;
};

exports.buscarCadastro = async (id) => {
  const result = await accountsRepository.findAccountById(id);
  if (result.rows.length === 0) {
    throw new Error('Account não encontrada');
  }
  return result.rows[0];
};

exports.editarCadastro = async (id, { nome, email, senha }) => {
  const result = await accountsRepository.updateAccount(id, nome, email, senha);
  if (result.rows.length === 0) {
    throw new Error('Account não encontrada');
  }
  return result.rows[0];
};

exports.excluirAccount = async (id) => {
  const result = await accountsRepository.deleteAccount(id);
  if (result.rows.length === 0) {
    throw new Error('Account não encontrada');
  }
  return;
};