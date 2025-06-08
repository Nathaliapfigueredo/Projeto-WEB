const service = require('../services/sessaoService');
const { sessaoSchema } = require('../models/sessaoModel');

 
const orientadorRepository = require('../repositories/orientadorRepository');


exports.cadastrarSessao = async (req, res) => {
  const { error } = sessaoSchema.validate(req.body);
  if (error) {
    return res.status(400).send(`Erro de validação: ${error.details[0].message}`);
  }

  try {
    await service.cadastrarSessao(req.body);
    res.redirect('/listaSessoes'); 
  } catch (err) {
    res.status(500).send(`Erro ao salvar sessão: ${err.message}`);
  }
};

exports.listarSessoes = async (req, res) => {
  try {
    const sessoes = await sessaoService.listarSessoes();
    const sessoesFormatadas = sessoes.map(sessao => ({
      data: sessao.agendamento_data,
      horario: sessao.agendamento_hora,
      orientador: sessao.nome_orientador,
      status: sessao.status
    }));

    res.render('listaSessoes', { sessoes: sessoesFormatadas });
  } catch (err) {
    res.status(500).send('Erro ao buscar sessões');
  }
};

exports.buscarSessao = async (req, res) => {
  try {
    const sessao = await service.buscarSessao(req.params.id);
    res.status(200).json(sessao);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.editarSessao = async (req, res) => {
  const { error } = sessaoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const sessao = await service.editarSessao(req.params.id, req.body);
    res.status(200).json(sessao);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.excluirSessao = async (req, res) => {
  try {
    await service.excluirSessao(req.params.id);
    res.status(200).json({ message: 'Sessão excluída com sucesso' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
