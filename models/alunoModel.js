const Joi = require('joi');

const alunoSchema = Joi.object({
  objetivo: Joi.string().required(),
  interesses: Joi.string().required(),
  bio: Joi.string().required(),
  lattes_link: Joi.string().uri().required(),
  id_account: Joi.string().uuid().trim().required()
});

module.exports = { alunoSchema };
