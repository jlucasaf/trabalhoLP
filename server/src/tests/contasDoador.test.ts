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

describe('Criação de Doadores funciona corretamente', () => {
  test('Tentar cadastrar Doador com dados inválidos resulta em fracasso', async () => {
    const response: Response = await supertest(app)
                                .post('/api/cadastrar')
                                .send({})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(400);
  });

  test('Tentar cadastrar Doador com dados válidos resulta em sucesso', async () => {
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

 test('Tentar cadastrar Doador com email já cadastrado resulta em fracasso', async () => {
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

describe('Login de Doadores funciona corretamente', () => {
  test('Login com doador não cadastrado resulta em fracasso', async () => {
    const response: Response = await supertest(app)
                                .post('/api/login')
                                .send({email:'naocadastrado@email.com', senha:'senha123'})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'Endereço de email não cadastrado');
  });

  test('Login com senha incorreta resulta em fracasso', async () => {
    const response: Response = await supertest(app)
                                .post('/api/login')
                                .send({email: doadorValido.email, senha:'senhaerrada'})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'Senha incorreta');
  });

  test('Login com dados corretos resulta em sucesso', async () => {
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
