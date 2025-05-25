// repositories/accountsRepository.js
const pool = require('../config/db');

exports.createAccount = (nome, email, senha) => {
  const query = `INSERT INTO accounts (nome, email, senha) VALUES ($1, $2, $3) RETURNING *`;
  return pool.query(query, [nome, email, senha]);
};

exports.findAccountByEmail = (email) => {
  const query = `SELECT * FROM accounts WHERE email = $1`;
  return pool.query(query, [email]);
};

exports.getAllAccounts = () => pool.query('SELECT * FROM accounts');

exports.findAccountById = (id) => pool.query('SELECT * FROM accounts WHERE id = $1', [id]);

exports.updateAccount = (id, nome, email, senha) => {
  const query = `
    UPDATE accounts 
    SET nome = $1, email = $2, senha = $3 
    WHERE id = $4 RETURNING *`;
  return pool.query(query, [nome, email, senha, id]);
};

exports.deleteAccount = (id) => {
  const query = `DELETE FROM accounts WHERE id = $1 RETURNING *`;
  return pool.query(query, [id]);
};
