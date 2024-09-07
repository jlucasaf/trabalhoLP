import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const esquemaVoluntario = Joi.object({
  nome: Joi.required().messages({
    'any.required' : 'O nome é obrigatório'
  }),
  email: Joi.required().messages({
    'any.required' : 'O email é obrigatório'
  }),
  senha: Joi.required().messages({
    'any.required' : 'A senha é obrigatória'
  }),

  CPF: Joi.required().messages({
    'any.required' : 'O CPF é obrigatório'
  }),

  local: Joi.object({
    cidade: Joi.required().messages({
      'any.required' : 'A cidade é obrigatória'
    }),

    endereco: Joi.string().required().messages({
      'any.required' : 'O endereço é obrigatório'
    }),

    CEP: Joi.required().messages({
      'any.required' : 'O CEP é obrigatório'
    }),

  }).required().messages({
    'any.required': 'O campo local é obrigatório',
  }),
});

const validaDoador = function (req: Request, res: Response, next: NextFunction) {
  
  const novoDoador = req.body;

  const {error} = esquemaVoluntario.validate(novoDoador, {abortEarly: false});

  if (error) {
    const corpoResposta = {
      sucesso: false,
      mensagem: 'Dados inválidos',
      // Lista com as mensagems legíveis de erro:
      detalhes: error.details.map(detalhe => detalhe.message),
    }
    res.status(400).json(corpoResposta);
  }
}

export default validaDoador;
