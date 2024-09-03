import { Request, Response, NextFunction } from 'express';
import { authenticate } from '../utils/authentication';

describe('Autenticação de usuário funciona corretamente', () => {
  
  test('Autenticar rejeita requisição sem token', async () => {
    
    // Simular requisição
    const req = { headers: {} } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn() as NextFunction;

    
    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário não autorizado' });
    expect(next).not.toHaveBeenCalled();
  });
});

