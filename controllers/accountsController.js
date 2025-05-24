const pool = require('../config/db');

// cria a conta (registro)
exports.cadastrarAccount = async (req, res) => {
  console.log("req.body recebido:", req.body); // debug
  const { nome, email, senha } = req.body; 
  
  const query = `
    INSERT INTO accounts (nome, email, senha)
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [nome, email, senha];

  try {
    const result = await pool.query(query, values);
    const account = result.rows[0];
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// faz o login 
exports.loginAccount = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Primeiro busca só pelo e-mail
    const query = 'SELECT * FROM accounts WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = result.rows[0];

    // Agora compara a senha enviada com a salva
    if (user.senha !== senha) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Se chegou até aqui, login foi bem-sucedido
    res.status(200).json({ message: 'Login bem-sucedido', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// lista todos os cadastros
exports.listarCadastros = async (req, res) => {
  const query = 'SELECT * FROM accounts';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.buscarCadastro = async (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM accounts WHERE id = $1';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Account não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.editarCadastro = async (req, res) => {
  const id = req.params.id;
  const { nome, email , senha } = req.body;
  
 
  const query = `
    UPDATE accounts 
      SET nome = $1, email = $2, senha = $3 
    WHERE id = $4`;
  const values = [nome, email, senha, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Account não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.excluirAccount = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM accountS WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'accounts não encontrada' });
    }
    res.status(200).json({ message: 'accounts excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};