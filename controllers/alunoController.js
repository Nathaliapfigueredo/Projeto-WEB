const pool = require('../config/db');

// cria a conta (registro)
exports.cadastrarAluno = async (req, res) => {
  console.log("req.body recebido:", req.body); // debug
  const { account_id, objetivo, interesse, bio, lattes_link } = req.body; 
  
  const query = `
    INSERT INTO aluno (account_id, objetivo, interesse, bio, lattes_link)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [account_id,objetivo, interesse, bio, lattes_link];

  try {
    const result = await pool.query(query, values);
    const aluno = result.rows[0];
    res.status(201).json(aluno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// lista todos os cadastros
exports.listarAluno = async (req, res) => {
  console.log("ListarAluno: rota chamada"); // confirma que chegou aqui
  const query = 'SELECT * FROM aluno';

  try {
    const result = await pool.query(query);
    console.log("Resultado banco:", result.rows); // log dos dados do banco
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Erro listarAluno:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.editarAluno = async (req, res) => {
  const id = req.params.id;
  const { account_id, objetivo, interesse, bio, lattes_link } = req.body; 
  
 
  const query = `
    UPDATE aluno 
      SET account_id = $1, objetivo = $2, interesse = $3, bio = $4, lattes_link = $5 
    WHERE id = $6`;
  const values = [account_id, objetivo, interesse, bio, lattes_link,id];

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


exports.excluirAluno = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM aluno WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'aluno não encontrada' });
    }
    res.status(200).json({ message: 'aluno excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};