import Joi from "joi";

const esquemaLocal = {
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
}

const esquemaUsuario = {
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
  ...esquemaLocal,
}

const esquemaDoador = Joi.object({
  ...esquemaUsuario,
  CPF: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required().messages({
    'any.required': 'O CPF é obrigatório',
    'string.pattern.base': 'O CPF deve estar no formato 000.000.000-00',
    'string.empty': 'O CPF não pode estar vazio',
  }),
});

const esquemaVoluntario = Joi.object({
  ...esquemaUsuario,
  CNPJ: Joi.string().pattern(/^\d{14}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
                      .required().messages({
    'any.required': 'O CNPJ é obrigatório',
    'string.pattern.base': 'O CNPJ deve estar no formato 00.000.000/0000-00',
  }),
  doacoesEntregues: Joi.number().min(0).messages({
    'number.min':'Doações entregues deve ser um número maior ou igual a 0'
  }),
});

const esquemaNovaCampanha = Joi.object({
  titulo: Joi.string().required().messages({
    'any.required': 'O título é obrigatório',
    'string.empty': 'O título não pode estar vazio',
  }),
  descricao: Joi.string().required().messages({
    'any.required': 'A descrição é obrigatória',
    'string.empty': 'A descrição não pode estar vazia',
  }),
  dataFinal: Joi.date().greater(Date.now()).required().messages({
    'any.required': 'A data de término é obrigatória',
    'date.base': 'A data de término deve ser uma data válida',
    'date.greater': 'A data de término deve ser posterior à data de início',
  }),
  ...esquemaLocal 
});

const esquemaNovaDoacao = Joi.object({
  foto: Joi.boolean().required().messages({
    'any.required': 'A preferência por foto deve ser informada',
  }),
  id_campanha: Joi.string().required().messages({
    'any.required': 'O id da campanha de destino é obrigatório',
    'string.empty': 'O id da campanah de destino não pode estar vazio',
  }),
})


export { esquemaDoador, esquemaVoluntario, esquemaNovaCampanha, esquemaNovaDoacao };

