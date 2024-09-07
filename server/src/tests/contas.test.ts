import app from "../app";
import supertest, {Response} from "supertest";
import { conectar, desconectar } from "../config/db";
import Doador from "../models/doadorModel";
import Voluntario from "../models/voluntarioModel";

beforeAll(async ()=> {
  await conectar();
});

afterAll(async ()=>{
  await Doador.deleteMany({});
  await Voluntario.deleteMany({});
  await desconectar();
});
    
const doadorValido = {
  nome: 'Doador Válido',
  email: 'doador@valido.com',
  senha: 'do@dor123',
  CPF: '000.788.610-12',
    local: {
    cidade: 'Cidade Válida',
    endereco: 'Endereço válido',
    CEP: '29046-095'
  }
}

describe('Criação de usuários ocorre como esperado', () => {
  test('Tentar criar doador com dados inválidos resulta em erro', async () => {
    const response: Response = await supertest(app)
                                .post('/api/cadastrarDoador')
                                .send({})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(400);
  });

  test('Tentar criar um doador com dados válidos resulta em sucesso', async () => {
    const response: Response = await supertest(app)
                                .post('/api/cadastrarDoador')
                                .send(doadorValido)
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('mensagem', 'Doador cadastrado com sucesso');
    expect(response.body).toHaveProperty('dados');
    expect(response.body.dados).toHaveProperty('token');
    expect(response.body.dados).toHaveProperty('usuario');
    expect(response.body.dados.usuario).toHaveProperty('tipo', 'Doador');
    expect(response.body.dados.usuario).toHaveProperty('id');
    expect(response.body.dados.usuario).toHaveProperty('email', doadorValido.email);
  });

 test('Tentar criar um doador com email já cadastrado resulta em fracasso', async () => {
    const response: Response = await supertest(app)
                                .post('/api/cadastrardoador')
                                .send(doadorValido)
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      sucesso: false,
      mensagem: 'Endereço de email já cadastrado',
    });
  });
});

describe('Login de usuários ocorre como esperado', () => {
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
});
