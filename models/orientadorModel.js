const Joi = require('joi');

const orientadorSchema = Joi.object({
  expertise: Joi.string().required(),
  disponibilidade_data: Joi.string(),
  disponibilidade_time: Joi.string(),
  bio: Joi.string().allow('').optional(),
  lattes_link: Joi.string().uri().allow('').optional(),
  retorno_agendamento: Joi.boolean().required(),
  id_account: Joi.string().uuid().trim().required()
});

module.exports = {
  orientadorSchema
};
