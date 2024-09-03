import Joi from 'joi';

const userValidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base':'O nome deve ser uma string',
      'string.empty': 'O nome não pode estar vazio',
      'string.min': 'O nome deve ter pelo menos 3 caracteres',
      'string.max': 'O nome deve ter no máximo 30 caracteres',
      'any.required': 'O nome é obrigatório'
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'O email deve ser uma string',
      'string.email': 'O email deve ser um endereço válido',
      'string.empty': 'O email não pode estar vazio',
      'any.required': 'O email é obrigatório'
    }),
  
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': 'A senha deve ser uma string',
      'string.empty': 'A senha não pode estar vazia',
      'string.min': 'A senha deve ter pelo menos 6 caracteres',
      'any.required': 'A senha é obrigatória'
    }),

  birthDate: Joi.date()
    .min('1900-01-01')
    .less('now')
    .required()
    .messages({
      'date.base': 'A data de nascimento deve ser válida',
      'date.less': 'A data de nascimento não pode ser no futuro',
      'any.required': 'A data de nascimento é obrigatória'
    })
});

export default userValidation;
