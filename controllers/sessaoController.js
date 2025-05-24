const pool = require('../config/db');

// Cadastrar sessão
exports.cadastrarSessao = async (req, res) => {
  console.log("req.body recebido:", req.body); // Debug

  const { agendamento_data,agendamento_hora, status, external_link, topico, id_orientador, id_aluno } = req.body;

  const query = `
    INSERT INTO sessao (agendamento_data,agendamento_hora, status, external_link, topico, id_orientador, id_aluno)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [agendamento_data,agendamento_hora, status, external_link, topico, id_orientador, id_aluno];

  try {
    const result = await pool.query(query, values);
    const sessao = result.rows[0];
    res.status(201).json(sessao);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Listar sessões
exports.listarSessao = async (req, res) => {
  const query = 'SELECT * FROM sessao';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar sessão
exports.editarSessao = async (req, res) => {
  const id = req.params.id;
  const {agendamento_data,agendamento_hora, status, external_link, topico, id_orientador, id_aluno } = req.body;

  const query = `
    UPDATE Sessao
    SET agendamento_data = $1, agendamento_hora = $2, status = $3, external_link = $4, topico = $5, id_orientador = $6, id_aluno = $7
    WHERE id = $8
    RETURNING *`;
  const values = [agendamento_data,agendamento_hora, status, external_link, topico, id_orientador, id_aluno , id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sessao não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir sessão
exports.excluirSessao = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM sessao WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sessao não encontrado' });
    }
    res.status(200).json({ message: 'Sessao excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
