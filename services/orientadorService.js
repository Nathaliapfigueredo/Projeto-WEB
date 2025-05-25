const repository = require('../repositories/orientadorRepository');

exports.cadastrarOrientador = async (dados) => {
  return await repository.create(dados);
};

exports.listarOrientadores = async () => {
  return await repository.findAll();
};

exports.buscarOrientador = async (id) => {
  const orientador = await repository.findById(id);
  if (!orientador) throw new Error('Orientador não encontrado');
  return orientador;
};

exports.editarOrientador = async (id, dados) => {
  const orientador = await repository.update(id, dados);
  if (!orientador) throw new Error('Orientador não encontrado');
  return orientador;
};

exports.excluirOrientador = async (id) => {
  const orientador = await repository.remove(id);
  if (!orientador) throw new Error('Orientador não encontrado');
  return orientador;
};
