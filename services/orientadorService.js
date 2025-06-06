const repository = require('../repositories/orientadorRepository');


exports.cadastrarOrientador = async ({ expertise, disponibilidade_data, disponibilidade_time, bio, lattes_link, retorno_agendamento, id_account }) => {
  console.log("[OrientadorService] Dados recebidos:", {expertise, disponibilidade_data, disponibilidade_time, bio, lattes_link, retorno_agendamento, id_account });
  if (!id_account) throw new Error("ID do usuário não informado");
  const result = await repository.create({
    expertise,
    disponibilidade_data,
    disponibilidade_time,
    bio,
    lattes_link,
    retorno_agendamento,
    id_account
  });
  return result;
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