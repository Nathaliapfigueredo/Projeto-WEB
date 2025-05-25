const service = require('../services/sessaoService');
const { sessaoSchema } = require('../models/sessaoModel');

// Cadastrar sessão
exports.cadastrarSessao = async (req, res) => {
  const { error } = sessaoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const sessao = await service.cadastrarSessao(req.body);
    res.status(201).json(sessao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar sessões
exports.listarSessao = async (_req, res) => {
  try {
    const sessoes = await service.listarSessoes();
    res.status(200).json(sessoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar sessão por ID
exports.buscarSessao = async (req, res) => {
  try {
    const sessao = await service.buscarSessao(req.params.id);
    res.status(200).json(sessao);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Editar sessão
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

// Excluir sessão
exports.excluirSessao = async (req, res) => {
  try {
    await service.excluirSessao(req.params.id);
    res.status(200).json({ message: 'Sessão excluída com sucesso' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
