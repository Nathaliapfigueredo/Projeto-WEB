// repositories/accountsRepository.js
const pool = require('../config/db');

exports.createAccount = (nome, email, senha, user_type) => {
  const query = `INSERT INTO accounts (nome, email, senha, user_type) VALUES ($1, $2, $3, $4) RETURNING *`;
  return pool.query(query, [nome, email, senha, user_type]);
};

exports.findAccountByEmail = (email) => {
  const query = `SELECT nome, email, senha, user_type FROM accounts WHERE email = $1`;
  return pool.query(query, [email]);
};

exports.getAllAccounts = () => pool.query('SELECT id, nome, email, senha, user_type FROM accounts');

exports.findAccountById = (id) => pool.query('SELECT id, nome, email, senha, user_type FROM accounts WHERE id = $1', [id]);

exports.updateAccount = (id, nome, email, senha, user_type) => {
  const query = `
    UPDATE accounts 
    SET nome = $1, email = $2, senha = $3, user_type = $4
    WHERE id = $5 RETURNING *`;
  
  return pool.query(query, [nome, email, senha, user_type, id]);
};

exports.deleteAccount = (id) => {
  const query = `DELETE FROM accounts WHERE id = $1 RETURNING *`;
  return pool.query(query, [id]);
};
