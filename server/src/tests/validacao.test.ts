// Testa validaçaõ de dados (middlewares que usam esquemas de validação do Joi)
import { Request, Response, NextFunction } from 'express';
import validaNovoUsuario from '../middlewares/validaNovoUsuario';
import { criarDoador } from './fabricas';

describe('Dados de doador são corretamente validados', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {body:{tipo:'doador', dados:{}}};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('Objeto vazio é rejeitado', () => {
    validaNovoUsuario(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);

    // Acessar o argumento passado para o mock de `res.json`
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      sucesso: false,
      mensagem: 'Dados inválidos para novo doador',
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
    req.body.dados = {
      nome: '',
      email: 'formatoinv',
      senha: 'a1',
      CPF: '12345',
      local: {
        cidade: '',
        endereco: '',
        CEP: 'aa'
      }
    }

    validaNovoUsuario(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);

    // Acessar o argumento passado para o mock de `res.json`
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      sucesso: false,
      mensagem: 'Dados inválidos para novo doador',
      detalhes: expect.arrayContaining([
        'O nome não pode estar vazio',
        'O email deve estar no formato válido',
        'A senha deve ter no mínimo 6 caracteres',
        'O CPF deve estar no formato 000.000.000-00',
        'A cidade não pode estar vazia',
        'O endereço não pode estar vazio',
        'O CEP deve estar no formato 00000-000'
      ])
    })); 
  });

  test('Dados validos de doador não são rejeitados', () => {
    req.body.dados = criarDoador('email@valido.com');

    validaNovoUsuario(req as Request, res as Response, next)

    expect(next).toHaveBeenCalled();
  });
});

describe('Dados de voluntario são corretamente validados', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {body:{tipo:'voluntario', dados:{}}};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('Objeto vazio é rejeitado', () => {
    validaNovoUsuario(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});
