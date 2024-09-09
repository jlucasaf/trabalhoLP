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

  /*
  test('Tentar criar um doador com email já cadastrado resulta em fracasso', async () => {
    const response: Response = await supertest(app)
                                .post('/api/cadastrar')
                                .send({tipo:'doador', dados:voluntarioValido})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      sucesso: false,
      mensagem: 'Endereço de email já cadastrado',
    });
  });

  test('Tentar criar um volunntario com dados inválidos resulta em sucesso', async () => {
    const response: Response = await supertest(app)
                                .post('/api/cadastrar')
                                .send({tipo:'voluntario', dados:voluntarioValido})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('mensagem', 'Usuário cadastrado com sucesso');
    expect(response.body).toHaveProperty('dados');
    expect(response.body.dados).toHaveProperty('token');
    expect(response.body.dados).toHaveProperty('usuario');
    expect(response.body.dados.usuario).toHaveProperty('tipo', 'doador');
    expect(response.body.dados.usuario).toHaveProperty('id');
    expect(response.body.dados.usuario).toHaveProperty('email', voluntarioValido.email);
  });
  */
});

describe('Login de usuários ocorre como esperado', () => {
  /*
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
                                .send({email: voluntarioValido.email, senha:'senhaerrada'})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem', 'Senha incorreta');
  });

  test('Tentar entrar com doador existente resulta em resposta adequada', async () => {
    const response: Response = await supertest(app)
                                .post('/api/login')
                                .send({email: voluntarioValido.email, senha:voluntarioValido.senha})
                                .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('mensagem', 'Usuário autenticado com sucesso');
    expect(response.body).toHaveProperty('dados');
    expect(response.body.dados).toHaveProperty('token');
  });
  */
});
