const Joi = require('joi');

// Schema para cadastro e edição
const orientadorSchema = Joi.object({
  expertise: Joi.string().required(),
  disponibilidade_data: Joi.string().required(), // pode usar Joi.date() se for ISO
  disponibilidade_time: Joi.string().required(),
  bio: Joi.string().allow('').optional(),
  lattes_link: Joi.string().uri().allow('').optional(),
  retorno_agendamento: Joi.boolean().required(),
  id_account: Joi.string().uuid().trim().required()
});

module.exports = {
  orientadorSchema
};
