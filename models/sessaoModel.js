const Joi = require('joi'); 

// Schema para cadastro e edição
const sessaoSchema = Joi.object({
  agendamento_data: Joi.string().required(), 
  agendamento_hora: Joi.string().required(),
  status: Joi.string().valid('agendada', 'cancelada', 'realizada').required(),
  external_link: Joi.string().uri().allow('').optional(),
  topico: Joi.string().required(),
  id_orientador: Joi.string().uuid().trim().required(),
  id_aluno: Joi.string().uuid().trim().required()
});

module.exports = {
  sessaoSchema
};