const pool = require('../config/db');

exports.atualizarOrientador = async (id_aluno, id_orientador) => {
  const query = `
    UPDATE alunos
    SET orientador_id = $1
    WHERE id = $2
    RETURNING *;
  `;
  const values = [id_orientador, id_aluno];
  return await pool.query(query, values);
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


exports.createAluno = (objetivo, interesses, bio, lattes_link, id_account) => {
  const query = `
    INSERT INTO aluno (objetivo, interesses, bio, lattes_link, id_account)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  return pool.query(query, [objetivo, interesses, bio, lattes_link, id_account]);
};

exports.getAllAlunos = () => pool.query('SELECT id, objetivo, interesses, bio, lattes_link, id_account FROM aluno');

exports.getAlunoById = (id) => pool.query('SELECT id, objetivo, interesses, bio, lattes_link, id_account FROM aluno WHERE id = $1', [id]);

exports.updateAluno = (id, objetivo, interesses, bio, lattes_link) => {
  const query = `
    UPDATE aluno SET objetivo = $1, interesses = $2, bio = $3, lattes_link = $4
    WHERE id = $5 RETURNING *`;
  return pool.query(query, [objetivo, interesses, bio, lattes_link, id]);
};

exports.deleteAluno = (id) => {
  const query = 'DELETE FROM aluno WHERE id = $1 RETURNING *';
  return pool.query(query, [id]);
};
