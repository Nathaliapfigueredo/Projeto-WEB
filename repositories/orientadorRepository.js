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
  console.log("findAll foi chamada")
  const query = `
    SELECT 
      o.id,
      a.nome,
      a.email,
      o.expertise,
      o.disponibilidade_data,
      o.disponibilidade_time,
      o.bio,
      o.lattes_link,
      o.retorno_agendamento,
      o.id_account
    FROM orientador o
    INNER JOIN accounts a ON o.id_account = a.id
    WHERE a.user_type = 'orientador';
  `;

  const result = await pool.query(query);
  console.log(result.rows);
  const orientadores_dto = result.rows.map(row => ({
    id: row.id,
    nome: row.nome,
    email: row.email,
    expertise: row.expertise,
    disponibilidade_data: row.disponibilidade_data,
    disponibilidade_time: row.disponibilidade_time,
    bio: row.bio,
    lattes_link: row.lattes_link,
    retorno_agendamento: row.retorno_agendamento,
    id_account: row.id_account
  }));
  console.log("orientadores_dto:", orientadores_dto);
  return orientadores_dto;
};



exports.findById = async (id) => {
  const result = await pool.query('SELECT id, expertise, disponibilidade_data, disponibilidade_time, bio, lattes_link, retorno_agendamento, id_account FROM orientador WHERE id = $1', [id]);
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
