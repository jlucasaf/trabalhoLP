import { Request, Response, NextFunction } from 'express';
import { authenticate } from '../utils/authentication';
import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const access_token_secret = process.env.ACCESS_TOKEN_SECRET || "default"

describe('Autenticação de usuário funciona corretamente', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });
  
  test('Autenticar rejeita requisição sem token', async () => {
    req.headers = {};
    
    await authenticate(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário não autorizado' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Autenticar rejeita requisição com token inválido', async () => {
    req.headers = { authorization: 'Bearer invalid-token' };
    
    await authenticate(req as Request, res as Response, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Autenticar aceita requisiçaõ com token válido', async () => {

    const validToken: string = sign({email:'existing@email.com'}, access_token_secret);

    req.headers = { authorization: `Bearer ${validToken}` };
    
    await authenticate(req as Request, res as Response, next);
    
    expect(next).toHaveBeenCalled();
  });
});

