import { Request, Response, NextFunction } from 'express';
import autenticar from '../middlewares/autenticar';
import { sign } from 'jsonwebtoken';
import { segredoToken } from '../config/config';

const access_token_secret = segredoToken 

describe('Autenticação de usuário funciona corretamente', () => {
  /** Simular requisições HTTP */
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
  
  test('Autenticar rejeita requisição sem token', async () => {
    req.headers = {}; /** Sem header de authorization */
    
    /** "Requisição" */
    await autenticar(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(401); // Unauthorized
    expect(res.json).toHaveBeenCalledWith({ sucesso: false, mensagem: 'Usuário não autorizado' }); // Mensagem legível
    expect(next).not.toHaveBeenCalled(); // Middleware não deu continuidade à requisição
  });

  test('Autenticar rejeita requisição com token inválido', async () => {
    /** Token com o formato fora do jwt */
    req.headers = { authorization: 'Bearer invalid-token' };
    
    await autenticar(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ sucesso: false, mensagem: 'Token inválido' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Autenticar aceita requisição com token válido', async () => {
    /** token gerado pelo jwt, logo válido */
    const validToken: string = sign({tipo:'doador', 
                                      id:'teste', 
                                      nome:'Nome', 
                                      email:'existing@email.com'}, 
                                    access_token_secret);

    req.headers = { authorization: `Bearer ${validToken}` };
    
    await autenticar(req as Request, res as Response, next);
    
    /** Middleware deu continuidade à requisição */
    expect(next).toHaveBeenCalled();
  });
});
