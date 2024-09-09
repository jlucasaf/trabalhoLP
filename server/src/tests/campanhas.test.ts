import app from "../app";
import supertest, {Response} from "supertest";
import { conectar, desconectar } from "../config/db";
import Doador from "../models/doadorModel";
import Voluntario from "../models/voluntarioModel";
import { criarVoluntario } from "./fabricas";

let token: string;

beforeAll(async ()=> {
  await conectar();
  const voluntarioValido = criarVoluntario('voluntario1@email.com'); 
  const response: Response = await supertest(app)
                              .post('/api/cadastrar')
                              .send({tipo:'voluntario', dados:voluntarioValido})
                              .set('Accept', 'application/json');
  token = response.body.dados.token;
});

afterAll(async ()=>{
  await Doador.deleteMany({});
  await Voluntario.deleteMany({});
  await desconectar();
});
    
describe('Criação de campanha por Voluntário funciona corretamente', () => {
  test('Usuário precisa estar autenticado para criar uma campanha', async () => {
    const response: Response = await supertest(app)
                                      .post('/api/campanhas')
    expect(response.statusCode).toBe(401); // Não autorizado
  });

  test('Tentar criar campanha com dados inválidos resulta em fracasso', async () => {
    const response: Response = await supertest(app)
                                      .post('/api/campanhas')
                                      .send({})
                                      .set('Accept', 'application/json')
                                      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(400); // Bad request
  });
});

