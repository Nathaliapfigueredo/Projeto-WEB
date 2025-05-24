const pool = require('../config/db');

// Cadastrar aluno
exports.cadastrarAluno = async (req, res) => {
  console.log("req.body recebido:", req.body); // Debug

  const { objetivo, interesses, bio, lattes_link, id_account } = req.body;

  const query = `
    INSERT INTO aluno (objetivo, interesses, bio, lattes_link, id_account)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [objetivo, interesses, bio, lattes_link, id_account];

  try {
    const result = await pool.query(query, values);
    const aluno = result.rows[0];
    res.status(201).json(aluno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Listar alunos
exports.listarAluno = async (req, res) => {
  const query = 'SELECT * FROM aluno';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.buscarAluno = async (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM aluno WHERE id = $1';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aluno não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar aluno
exports.editarAluno = async (req, res) => {
  const id = req.params.id;
  const { objetivo, interesses, bio, lattes_link } = req.body;

  const query = `
    UPDATE aluno 
    SET objetivo = $1, interesses = $2, bio = $3, lattes_link = $4
    WHERE id = $5 RETURNING *`;
  const values = [objetivo, interesses, bio, lattes_link, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir aluno
exports.excluirAluno = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM aluno WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.status(200).json({ message: 'Aluno excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
