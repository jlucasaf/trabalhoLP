import request, { Response } from "supertest";
import app from "../app";

const validUser = {
  username:'Username',
  email: 'user@gmail.com',
  password: 'senha123',
  birthDate: '2000-01-01'
};



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

describe('Login de usuário funciona como esperado', () => {
  test('Quando o usuário não existe, deve retornar 401', async () => {
    const response: Response = await request(app)
                                      .post('/api/login')
                                      .send({email:'email@gmail.com', password:'password'})
                                      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  }); 
});
