const pool = require('../config/db');

exports.createAluno = (objetivo, interesses, bio, lattes_link, id_account) => {
  const query = `
    INSERT INTO aluno (objetivo, interesses, bio, lattes_link, id_account)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  return pool.query(query, [objetivo, interesses, bio, lattes_link, id_account]);
};

exports.getAllAlunos = () => pool.query('SELECT * FROM aluno');

exports.getAlunoById = (id) => pool.query('SELECT * FROM aluno WHERE id = $1', [id]);

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
