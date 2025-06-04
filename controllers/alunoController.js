const alunoService = require('../services/alunoService');
const accountsService = require('../services/accountsService');
const { alunoSchema } = require('../models/alunoModel');


exports.formAluno = (req, res) => {
  const id_account = req.query.id;
  console.log("[formAluno] ID recebido no query:", id_account);
  res.render('formAluno', { id_account });
};

exports.listaOrientadores = async (req, res) => {
  try {
    console.log("Lista de orientadores renderizada com", orientadores.length, "orientadores");
    const allAccounts = await accountsService.listarCadastros();
    const orientadores = allAccounts.filter(user => user.user_type === 'orientador');

    res.render('listaOrientadores', { orientadores });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cadastrarAluno = async (req, res) => {
  const { error } = alunoSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const aluno = await alunoService.cadastrarAluno(req.body);
    res.status(201).json(aluno);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
