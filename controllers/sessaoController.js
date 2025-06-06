const service = require('../services/sessaoService');
const { sessaoSchema } = require('../models/sessaoModel');

 
const orientadorRepository = require('../repositories/orientadorRepository');

exports.renderizarPaginaAgendamento = async (req, res) => {
  const id_orientador = req.params.id;
  const id_aluno = req.query.id_aluno ;
  console.log("[renderizarPaginaAgendamento] ID do orientador:", id_orientador);


  try {
    const orientador = await orientadorRepository.findById(id_orientador);

    if (!orientador) {
      return res.status(404).send('Orientador não encontrado');
    }
    console.log("Orientador encontrado:", orientador);
    res.render('agendamento', {
      orientador,
      aluno: { id: id_aluno }
    });
  } catch (err) {
    res.status(500).send('Erro ao carregar a página de agendamento');
  }
};



exports.cadastrarSessao = async (req, res) => {
  const { error } = sessaoSchema.validate(req.body);
  if (error) {
    return res.status(400).send(`Erro de validação: ${error.details[0].message}`);
  }

  try {
    await service.cadastrarSessao(req.body);
    res.redirect('/sessao/sucesso'); // ou outra página de confirmação
  } catch (err) {
    res.status(500).send(`Erro ao salvar sessão: ${err.message}`);
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
