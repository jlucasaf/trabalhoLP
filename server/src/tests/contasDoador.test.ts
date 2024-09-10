import app from "../app";
import supertest, {Response} from "supertest";
import { conectar, desconectar } from "../config/db";
import Doador from "../models/doadorModel";
import Voluntario from "../models/voluntarioModel";
import { criarDoador } from "./fabricas";

beforeAll(async ()=> {
  await conectar();
});

afterAll(async ()=>{
  await Doador.deleteMany({});
  await Voluntario.deleteMany({});
  await desconectar();
});
    
const doadorValido = criarDoador('doador1@email.com'); 

describe('Criação de doadores ocorre como esperado', () => {
  test('Tentar criar doador com dados inválidos resulta em erro', async () => {
    const response: Response = await supertest(app)
                                .post('/api/cadastrar')
                                .send({})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(400);
  });

  test('Tentar criar um doador com dados válidos resulta em sucesso', async () => {
    const response: Response = await supertest(app)
                                .post('/api/cadastrar')
                                .send({tipo:'doador', dados:doadorValido})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('mensagem', 'Usuário cadastrado com sucesso');
    expect(response.body).toHaveProperty('dados');
    expect(response.body.dados).toHaveProperty('token');
    expect(response.body.dados).toHaveProperty('usuario');
    expect(response.body.dados.usuario).toHaveProperty('tipo', 'doador');
    expect(response.body.dados.usuario).toHaveProperty('id');
    expect(response.body.dados.usuario).toHaveProperty('email', doadorValido.email);
  });

 test('Tentar criar um doador com email já cadastrado resulta em fracasso', async () => {
    const response: Response = await supertest(app)
                                .post('/api/cadastrar')
                                .send({tipo:'doador', dados:doadorValido})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      sucesso: false,
      mensagem: 'Endereço de email já cadastrado',
    });
  });
});

describe('Login de doadores ocorre como esperado', () => {
  test('Tentar entrar com doador não cadastrado resulta em erro', async () => {
    const response: Response = await supertest(app)
                                .post('/api/login')
                                .send({email:'naocadastrado@email.com', senha:'senha123'})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'Endereço de email não cadastrado');
  });

  test('Tentar entrar com senha inválida resulta em erro', async () => {
    const response: Response = await supertest(app)
                                .post('/api/login')
                                .send({email: doadorValido.email, senha:'senhaerrada'})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'Senha incorreta');
  });

  test('Tentar entrar com doador existente resulta em resposta adequada', async () => {
    const response: Response = await supertest(app)
                                .post('/api/login')
                                .send({email: doadorValido.email, senha:doadorValido.senha})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('mensagem', 'Usuário autenticado com sucesso');
    expect(response.body).toHaveProperty('dados');
    expect(response.body.dados).toHaveProperty('token');
  });
});