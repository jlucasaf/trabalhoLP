// Testa validaçaõ de dados (middlewares que usam esquemas de validação do Joi)
import { Request, Response, NextFunction } from 'express';
import validaDoador from '../utils/validaDoador';

describe('Dados de doador são corretamente validados', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {params:{}};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });


  test('Objeto vazio é rejeitado', () => {
  
    validaDoador(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveProperty('mensagem', 'Dados inválidos');
    expect(res.json).toHaveProperty('detalhes'); // Lista de erros
    expect(next).not.toHaveBeenCalled();
  });

});
