const alunoRepository = require('../repositories/alunoRepository');

exports.cadastrarAluno = async ({ objetivo, interesses, bio, lattes_link, id_account }) => {
  const result = await alunoRepository.createAluno(objetivo, interesses, bio, lattes_link, id_account);
  return result.rows[0];
};

exports.listarAlunos = async () => {
  const result = await alunoRepository.getAllAlunos();
  return result.rows;
};

exports.buscarAluno = async (id) => {
  const result = await alunoRepository.getAlunoById(id);
  if (result.rows.length === 0) throw new Error('Aluno não encontrado');
  return result.rows[0];
};

exports.editarAluno = async (id, { objetivo, interesses, bio, lattes_link }) => {
  const result = await alunoRepository.updateAluno(id, objetivo, interesses, bio, lattes_link);
  if (result.rows.length === 0) throw new Error('Aluno não encontrado');
  return result.rows[0];
};

exports.excluirAluno = async (id) => {
  const result = await alunoRepository.deleteAluno(id);
  if (result.rows.length === 0) throw new Error('Aluno não encontrado');
};