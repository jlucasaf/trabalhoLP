import request, { Response } from "supertest";
import app from "../app";

describe('Rotas de usuario funcionam corretamente', () => {
  // Teste de exemplo
  test('Criação de novo usuário com dados inválidos tem resposta errada', async () => {
    const response: Response = await request(app)
                                      .post('/api/register')
                                      .send({})
                                      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Dados de usuário inválidos');
  });

  test('Criaçaõ de usuário com dados certos gera resposta de sucesso', async () => {
    const validUser = {
      username:'Username',
      email: 'user@gmail.com',
      password: 'senha123',
      birthDate: '2000-01-01'
    }

    const response: Response = await request(app)
                                      .post('/api/register')
                                      .send(validUser)
                                      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuário criado com sucesso');
  });
}) 
