// Teste para criação e deleção de contas

import app from "../app";
import supertest, {Response} from "supertest";
import { conectar, desconectar } from "../config/db";
import Doador from "../models/doadorModel";

beforeAll(async ()=> {
  await conectar();
});

afterAll(async ()=>{
  await Doador.deleteMany({});
  await desconectar();
});

describe('Criação de usuários ocorre como esperado', () => {
  test('Tentar criar doador com dados inválidos resulta em erro', async () => {
    const response: Response = await supertest(app)
                                .post('api/doador/cadastro')
                                .send({})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(400);
  }); 
});
