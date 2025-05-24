const pool = require('../config/db');

// Cadastrar orientador
exports.cadastrarOrientador = async (req, res) => {
  console.log("req.body recebido:", req.body); // Debug

  const { expertise, disponibilidade_data, disponibilidade_time, bio,lattes_link, retorno_agendamento, id_account } = req.body;

  const query = `
    INSERT INTO orientador (expertise, disponibilidade_data, disponibilidade_time, bio,lattes_link, retorno_agendamento, id_account)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const values = [expertise, disponibilidade_data, disponibilidade_time, bio,lattes_link, retorno_agendamento, id_account];

  try {
    const result = await pool.query(query, values);
    const orientador = result.rows[0];
    res.status(201).json(orientador);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Listar orientadorEes
exports.listarOrientador = async (req, res) => {
  const query = 'SELECT * FROM orientador';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar orientador
exports.editarOrientador = async (req, res) => {
  const id = req.params.id;
  const {expertise, disponibilidade_data, disponibilidade_time, bio,lattes_link, retorno_agendamento, id_account } = req.body;

  const query = `
    UPDATE orientador
    SET expertise = $1, disponibilidade_data = $2, disponibilidade_time = $3, bio = $4, lattes_link = $5, retorno_agendamento = $6, id_account = $7
    WHERE id = $8
    RETURNING *`;
  const values = [expertise, disponibilidade_data, disponibilidade_time, bio,lattes_link, retorno_agendamento, id_account, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Orientador não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir orientador
exports.excluirOrientador = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM orientador WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Orientador não encontrado' });
    }
    res.status(200).json({ message: 'Orientador excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
