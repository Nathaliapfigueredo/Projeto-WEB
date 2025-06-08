const sessaoService = require('../services/sessaoService');
const service = require('../services/orientadorService');
const accountsService = require('../services/accountsService');
const orientadorRepository = require('../repositories/orientadorRepository');


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

exports.listarOrientador = async (_req, res) => {
  try {
    const orientadores = await service.
    listarOrientadores();
    res.status(200).json(orientadores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  
};
}

exports.renderizarListaOrientadores = async (req, res) => {
  try {
    const orientadores = await service.listarOrientadores();
    let aluno = { id: '' };
    if (req.user && req.user.id) {
      aluno.id = req.user.id;
    } else if (req.session && req.session.aluno && req.session.aluno.id) {
      aluno.id = req.session.aluno.id;
    } else if (req.query.id_aluno) {
      aluno.id = req.query.id_aluno;
    }

    // Busque as sessões agendadas do aluno
    let sessoes = [];
    if (aluno.id) {
      sessoes = await require('../services/sessaoService').listarSessoesPorAluno(aluno.id);
    }

    res.render('listaOrientadores', { orientadores, aluno, sessoes });
  } catch (err) {
    res.status(500).send('Erro ao carregar lista de orientadores');
  }
};

exports.mostrarDashboard = async (req, res) => {
  try {
    const sessoes = await sessaoService.listarSessoes();

    const sessoesFormatadas = sessoes.map(sessao => ({
      data: sessao.agendamento_data,
      horario: sessao.agendamento_hora,
      aluno: sessao.nome_aluno || 'Aluno não identificado',
      topico: sessao.topico,
      status: sessao.status
    }));

    res.render('dashboard', { sessoes: sessoesFormatadas });
  } catch (error) {
    console.error('Erro ao carregar o dashboard:', error);
    res.status(500).send('Erro ao carregar o dashboard');
  }
};

exports.buscarOrientador = async (req, res) => {
  try {
    const orientador = await service.buscarOrientador(req.params.id);
    res.status(200).json(orientador);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

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

exports.excluirOrientador = async (req, res) => {
  try {
    await service.excluirOrientador(req.params.id);
    res.status(200).json({ message: 'Orientador excluído com sucesso' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
