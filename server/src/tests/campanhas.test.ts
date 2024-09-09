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
    

describe('Criação de campanha por voluntários ocorre como esperado', () => {
  test('Usuário precisa estar autenticado para criar uma campanha', async () => {
    const response: Response = await supertest(app)
                                      .post('/api/campanhas')
    expect(response.statusCode).toBe(401); // Não autorizado
  }); 
});

