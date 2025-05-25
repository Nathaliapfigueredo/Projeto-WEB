const Joi = require('joi');

const accountSchema = Joi.object({
  nome: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  user_type: Joi.string().valid('aluno', 'orientador').required(),
});

module.exports = { accountSchema };