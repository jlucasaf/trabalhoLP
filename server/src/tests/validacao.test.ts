// Testa validaçaõ de dados (middlewares que usam esquemas de validação do Joi)
import { Request, Response, NextFunction } from 'express';
import validaDoador from '../utils/validaDoador';

describe('Dados de doador são corretamente validados', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {body:{}};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('Objeto vazio é rejeitado', () => {
    validaDoador(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);

    // Acessar o argumento passado para o mock de `res.json`
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      sucesso: false,
      mensagem: 'Dados inválidos',
      detalhes: expect.arrayContaining([
        'O nome é obrigatório',
        'O email é obrigatório',
        'A senha é obrigatória',
        'O CPF é obrigatório',
        'O campo local é obrigatório'
      ])
    }));

    expect(next).not.toHaveBeenCalled();
  });

  test('Atributos com formato inválido são rejeitados', () => {
    req.body = {
      nome: '',
      email: 'formatoinv',
      senha: 'a1',
      CPF: '12345',
      local: {
        cidade: '',
        endereco: 2,
        CEP: 'aa'
      }
    }

    validaDoador(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);

    // Acessar o argumento passado para o mock de `res.json`
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      sucesso: false,
      mensagem: 'Dados inválidos',
      detalhes: expect.arrayContaining([
        'O nome não pode estar vazio',
        'O email deve estar no formato __@_._',
        'A senha é obrigatória',
        'O CPF deve estar no formato 000.000.000-00',
        'A cidade não pode ser vazia',
        'O endereço deve ser uma string',
        'O CEP deve estar no formato 00000-000'
      ])
    }));
  
  });
});
