import request, { Response } from "supertest";
import app from "../app";
import { connectDB, disconnectDB } from "../config/db";
import User from "../models/userModel";

const validUser = {
  nome:'Username',
  email: 'newuser@gmail.com',
  senha: 'senha123',
  dataNascimento: '2000-01-01'
};

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await User.deleteMany({});
  await disconnectDB();
});

describe('Criação de usuário funciona como esperado', () => {
  // Teste de exemplo
  test('Usuário no formato inválido é rejeitado pelo servidor.', async () => {
    const response: Response = await request(app)
                                      .post('/register')
                                      .send({})
                                      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Dados de usuário inválidos');
  });

  test('Usuário com formato válido não é rejeitado pelo servidor.', async () => {
    const response: Response = await request(app)
                                      .post('/register')
                                      .send(validUser)
                                      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuário criado com sucesso.');
    expect(response.body).toHaveProperty('token');
  });

  test('Usuário com email já cadastrado resulta em mensagem de erro esperada.', async () => {
    const response: Response = await request(app)
                                      .post('/register')
                                      .send(validUser)
                                      .set('Accept','application/json');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Email já está registrado.');
  });
});


