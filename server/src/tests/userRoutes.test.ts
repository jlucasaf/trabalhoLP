import request from "supertest";
import app from "../app";

describe('Rotas de usuario funcionam corretamente', () => {
  // Teste de exemplo
  test('Criação de novo usuário tem resposta esperada', async () => {

    const newUser = {username:'Nome de Usuário',
                    email:'email@email.com',
                    password:'senha3454321'};

    const response = await request(app)
                        .post('/api/register')
                        .send(newUser)
                        .set('Accept', 'application/json');

    expect(response.status).toBe(200);
  });
}) 
