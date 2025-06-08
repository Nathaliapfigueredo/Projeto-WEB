const repository = require('../repositories/sessaoRepository');

exports.cadastrarSessao = async (dados) => {
  return await repository.create(dados);
}   


exports.listarSessoes = async () => {
  return await repository.findAll();
};

exports.renderizarPaginaAgendamento = async (id_orientador, id_aluno) => {
  const orientador = await repository.findOrientadorById(id_orientador);
  if (!orientador) throw new Error('Orientador não encontrado');
  
  return {
    orientador,
    aluno: { id: id_aluno }
  };
};

exports.listarSessoesPorOrientador = async (id_orientador) => {
  const result = await pool.query(
    'SELECT * FROM sessoes WHERE id_orientador = $1 ORDER BY agendamento_data, agendamento_hora',
    [id_orientador]
  );
  return result.rows;
};

exports.buscarSessao = async (id) => {
  const sessao = await repository.findById(id);
  if (!sessao) throw new Error('Sessão não encontrada');
  return sessao;
};
exports.editarSessao = async (id, dados) => {
  const sessao = await repository.update(id, dados);
  if (!sessao) throw new Error('Sessão não encontrada');
  return sessao;
};
exports.excluirSessao = async (id) => {
  const sessao = await repository.remove(id);
  if (!sessao) throw new Error('Sessão não encontrada');
  return sessao;
};