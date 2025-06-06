const service = require('../services/orientadorService');
const accountsService = require('../services/accountsService');
orientadorRepository = require('../repositories/orientadorRepository');

const { orientadorSchema } = require('../models/orientadorModel');


exports.formOrientador = (req, res) => {
  const id_account = req.query.id;
  console.log("[formOrientador] ID recebido no query:", id_account);
  res.render('formOrientador', { id_account });
}

exports.getAll = async (req, res) => {
  try {
    console.log("Entrou na função getAll");
    const orientadores = await orientadorRepository.findAll();
    res.json(orientadores);
  } catch (err) {
    console.error('Erro em getAll:', err); 
    res.status(500).json({ error: 'Erro ao buscar orientadores' });
  }
};

exports.cadastrarOrientador = async (req, res) => {
  const { error } = orientadorSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message); // ou renderizar um erro
  }

  try {
    const orientador = await service.cadastrarOrientador(req.body);
    res.redirect('/dashboard'); 

  } catch (err) {
    console.error('[ERRO orientadorController]:', err);
    res.status(500).send('Erro ao cadastrar orientador');
  }
};


// Listar orientadores
exports.listarOrientador = async (_req, res) => {
  try {
    const orientadores = await service.listarOrientadores();
    res.status(200).json(orientadores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar orientador por ID
exports.buscarOrientador = async (req, res) => {
  try {
    const orientador = await service.buscarOrientador(req.params.id);
    res.status(200).json(orientador);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Editar orientador
exports.editarOrientador = async (req, res) => {
  const { error } = orientadorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const orientador = await service.editarOrientador(req.params.id, req.body);
    res.status(200).json(orientador);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Excluir orientador
exports.excluirOrientador = async (req, res) => {
  try {
    await service.excluirOrientador(req.params.id);
    res.status(200).json({ message: 'Orientador excluído com sucesso' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
