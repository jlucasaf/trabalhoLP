import request, { Response } from "supertest";
import app from "../app";

const validUser = {
  username:'Username',
  email: 'newuser@gmail.com',
  password: 'senha123',
  birthDate: '2000-01-01'
};

// Apagar quando o modelo e User for criado
jest.mock('../models/userModel');

describe('Criação de usuário funciona como esperado', () => {
  // Teste de exemplo
  test('Usuário no formato inválido é rejeitado pelo servidor.', async () => {
    const response: Response = await request(app)
                                      .post('/api/register')
                                      .send({})
                                      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Dados de usuário inválidos');
  });

  test('Usuário com formato válido não é rejeitado pelo servidor.', async () => {
    const response: Response = await request(app)
                                      .post('/api/register')
                                      .send(validUser)
                                      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuário criado com sucesso.');
  });
});


