
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const esquemaVoluntario = Joi.object({
  nome: Joi.string().required().messages({
    'any.required': 'O nome é obrigatório',
    'string.empty': 'O nome não pode estar vazio',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'O email é obrigatório',
    'string.email': 'O email deve estar no formato válido',
    'string.empty': 'O email não pode estar vazio',
  }),
  senha: Joi.string().min(6).required().messages({
    'any.required': 'A senha é obrigatória',
    'string.min': 'A senha deve ter no mínimo 6 caracteres',
    'string.empty': 'A senha não pode estar vazia',
  }),
  CPF: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required().messages({
    'any.required': 'O CPF é obrigatório',
    'string.pattern.base': 'O CPF deve estar no formato 000.000.000-00',
    'string.empty': 'O CPF não pode estar vazio',
  }),
  local: Joi.object({
    cidade: Joi.string().required().messages({
      'any.required': 'A cidade é obrigatória',
      'string.empty': 'A cidade não pode estar vazia',
    }),
    endereco: Joi.string().required().messages({
      'any.required': 'O endereço é obrigatório',
      'string.empty': 'O endereço não pode estar vazio',
    }),
    CEP: Joi.string().pattern(/^\d{5}-\d{3}$/).required().messages({
      'any.required': 'O CEP é obrigatório',
      'string.pattern.base': 'O CEP deve estar no formato 00000-000',
      'string.empty': 'O CEP não pode estar vazio',
    }),
  }).required().messages({
    'any.required': 'O campo local é obrigatório',
  }),
});

const validaDoador = function (req: Request, res: Response, next: NextFunction) {
  const novoDoador = req.body.dados;

  const { error } = esquemaVoluntario.validate(novoDoador, { abortEarly: false });

  if (error) {
    const corpoResposta = {
      sucesso: false,
      mensagem: 'Dados inválidos',
      detalhes: error.details.map(detalhe => detalhe.message),
    };
    return res.status(400).json(corpoResposta);
  }

  next();
};

export default validaDoador;

