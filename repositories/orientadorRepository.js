const pool = require('../config/db');

exports.create = async (dados) => {
  const query = `
    INSERT INTO orientador (expertise, disponibilidade_data, disponibilidade_time, bio, lattes_link, retorno_agendamento, id_account)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
  const values = [
    dados.expertise, dados.disponibilidade_data, dados.disponibilidade_time,
    dados.bio, dados.lattes_link, dados.retorno_agendamento, dados.id_account
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.findAll = async () => {
  const result = await pool.query('SELECT * FROM orientador');
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query('SELECT * FROM orientador WHERE id = $1', [id]);
  return result.rows[0];
};

exports.update = async (id, dados) => {
  const query = `
    UPDATE orientador
    SET expertise = $1, disponibilidade_data = $2, disponibilidade_time = $3, bio = $4, lattes_link = $5, retorno_agendamento = $6, id_account = $7
    WHERE id = $8
    RETURNING *`;
  const values = [
    dados.expertise, dados.disponibilidade_data, dados.disponibilidade_time,
    dados.bio, dados.lattes_link, dados.retorno_agendamento, dados.id_account, id
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.remove = async (id) => {
  const result = await pool.query('DELETE FROM orientador WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
