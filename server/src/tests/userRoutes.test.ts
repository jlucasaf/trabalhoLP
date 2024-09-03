import request, { Response } from "supertest";
import app from "../app";

describe('Rotas de usuario funcionam corretamente', () => {
  // Teste de exemplo
  test('Criação de novo usuário com dados inválidos tem resposta errada', async () => {
    const response: Response = await request(app)
                                      .post('/api/register')
                                      .send({})
                                      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Dados de usuário inválido');
  });
}) 
