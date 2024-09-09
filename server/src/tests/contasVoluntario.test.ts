import app from "../app";
import supertest, {Response} from "supertest";
import { conectar, desconectar } from "../config/db";
import Doador from "../models/doadorModel";
import Voluntario from "../models/voluntarioModel";
import { criarVoluntario } from "./fabricas";

beforeAll(async ()=> {
  await conectar();
});

afterAll(async ()=>{
  await Doador.deleteMany({});
  await Voluntario.deleteMany({});
  await desconectar();
});
    
const voluntarioValido = criarVoluntario('voluntario1@email.com'); 

describe('Criação de voluntários ocorre como esperado', () => {
  
  test('Tentar criar um voluntário com dados válidos resulta em sucesso', async () => {
    const response: Response = await supertest(app)
                                .post('/api/cadastrar')
                                .send({tipo:'voluntario', dados:voluntarioValido})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('mensagem', 'Usuário cadastrado com sucesso');
    expect(response.body).toHaveProperty('dados');
    expect(response.body.dados).toHaveProperty('token');
    expect(response.body.dados).toHaveProperty('usuario');
    expect(response.body.dados.usuario).toHaveProperty('tipo', 'voluntario');
    expect(response.body.dados.usuario).toHaveProperty('id');
    expect(response.body.dados.usuario).toHaveProperty('email', voluntarioValido.email);
  });

});

describe('Login de voluntários ocorre como esperado', () => {
  test('Tentar entrar com voluntário existente resulta em resposta adequada', async () => {
    const response: Response = await supertest(app)
                                .post('/api/login')
                                .send({email: voluntarioValido.email, 
                                        senha:voluntarioValido.senha})
                                .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('mensagem', 'Usuário autenticado com sucesso');
    expect(response.body).toHaveProperty('dados');
    expect(response.body.dados).toHaveProperty('token');
  });
});
