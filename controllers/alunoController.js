const alunoService = require('../services/alunoService');
const accountsService = require('../services/accountsService');
const alunoRepository = require('../repositories/alunoRepository');
const { alunoSchema } = require('../models/alunoModel');


exports.formAluno = (req, res) => {
  const id_account = req.query.id;
  console.log("[formAluno] ID recebido no query:", id_account);
  res.render('formAluno', { id_account });
};


exports.listaOrientadores = async (req, res) => {
  try {
    const orientadores = await alunoRepository.findAll(); // ou orientadorRepository.findAll()
    res.render('listaOrientadores', { orientadores });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.selecionarOrientador = async (req, res) => {
  const { id_aluno, id_orientador } = req.body;
  try {
    await alunoService.vincularOrientador(id_aluno, id_orientador);
    res.redirect('/aluno/dashboard'); 
  } catch (error) {
    res.status(500).send('Erro ao selecionar orientador');
  }
};


exports.cadastrarAluno = async (req, res) => {
  const { error } = alunoSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); 

  try {
    const aluno = await alunoService.cadastrarAluno(req.body);
    res.redirect(`aluno/listaOrientadores?idAluno=${aluno.id}`);

  } catch (err) {
    res.status(500).send('Erro ao cadastrar aluno');
  }
};

exports.listarAluno = async (req, res) => {
  try {
    const alunos = await alunoService.listarAlunos();
    res.status(200).json(alunos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.buscarAluno = async (req, res) => {
  try {
    const aluno = await alunoService.buscarAluno(req.params.id);
    res.status(200).json(aluno);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.editarAluno = async (req, res) => {
  try {
    const aluno = await alunoService.editarAluno(req.params.id, req.body);
    res.status(200).json(aluno);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.excluirAluno = async (req, res) => {
  try {
    await alunoService.excluirAluno(req.params.id);
    res.status(200).json({ message: 'Aluno excluído com sucesso' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
