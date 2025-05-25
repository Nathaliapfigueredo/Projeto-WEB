const pool = require('../config/db');

exports.create = async (dados) => {
  const query = `
    INSERT INTO sessao (agendamento_data, agendamento_hora, status, external_link, topico, id_orientador, id_aluno)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
  const values = [
    dados.agendamento_data, dados.agendamento_hora, dados.status, dados.external_link, dados.topico, dados.id_orientador, dados.id_aluno
];
  const result = await pool.query(query, values);
  return result.rows[0];
}

exports.findAll = async () => {
    const result = await pool.query('SELECT * FROM sessao');
    return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query('SELECT * FROM sessao WHERE id = $1', [id]);
  return result.rows[0];
};

exports.update = async (id, dados) => {
  const query = `
    UPDATE sessao
    SET agendamento_data = $1, agendamento_hora = $2, status = $3, external_link = $4, topico = $5, id_orientador = $6, id_aluno = $7
    WHERE id = $8
    RETURNING *`;
  const values = [
    dados.agendamento_data, dados.agendamento_hora, dados.status, dados.external_link, dados.topico, dados.id_orientador, dados.id_aluno, id
];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.remove = async (id) => {
  const result = await pool.query('DELETE FROM sessao WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};