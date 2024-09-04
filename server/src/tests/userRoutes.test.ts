import request, { Response } from "supertest";
import app from "../app";
import { connectDB, disconnectDB } from "../config/db";
import User from "../models/userModel";

const validUser = {
  nome:'Username',
  email: 'newuser@gmail.com',
  senha: 'senha123',
  dataNascimento: '2000-01-01'
};

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  // Assegura que operações feitas nesses teste
  // não interfiram nas execuções posteriores
  await User.deleteMany({});
  await disconnectDB();
});

describe('Criação de usuário funciona como esperado', () => { 
  test('Usuário no formato inválido é rejeitado pelo servidor.', async () => {
    // Tenta criar um usuário enviando um objeto vazio
    const response: Response = await request(app)
                                      .post('/register')
                                      .send({})
                                      .set('Accept', 'application/json');

    expect(response.status).toBe(400); // Bad request
    expect(response.body).toHaveProperty('message', 'Dados de usuário inválidos');
  });


  test('Usuário com formato válido não é rejeitado pelo servidor.', async () => {
    // Tenta criar um usuário enviando um objeto com propriedades esperadas
    const response: Response = await request(app)
                                      .post('/register')
                                      .send(validUser)
                                      .set('Accept', 'application/json');

    expect(response.status).toBe(200); // Sucesso
    expect(response.body).toHaveProperty('message', 'Usuário criado com sucesso.'); // Mensagem legível
    expect(response.body).toHaveProperty('token'); // Token para garantir autenticação logo após criação de conta

    // Verificando se o usuário foi salvo corretamente (exceto senha, que está hasheada)
    const savedUser = await User.findOne({ email: validUser.email });
    expect(savedUser).toBeTruthy();
    expect(savedUser?.email).toBe(validUser.email);
    expect(savedUser?.nome).toBe(validUser.nome);
  });

  test('Usuário com email já cadastrado resulta em mensagem de erro esperada.', async () => {
    // Tentando criar um usuário com o mesmo email do usuário criado no caso de teste anterior
    const response: Response = await request(app)
                                      .post('/register')
                                      .send(validUser)
                                      .set('Accept','application/json');

    expect(response.status).toBe(400); // Bad request
    expect(response.body).toHaveProperty('message', 'Endereço de email já cadastrado.'); // Mensagem explicativa
  });
});

describe('Login de usuário funciona como esperado', () => {
  test('Login rejeita usuário não cadastrado', async () => {
    const response: Response = await request(app)
                                      .post('/login')
                                      .send({email:'inexistant@gmail.com', senha:'senha123'})
                                      .set('Accept', 'application/json');
    
    expect(response.status).toBe(401); // Unauthorized
    expect(response.body).toHaveProperty('message', 'Endereço de email não cadastrado.');
  });

 test('Login rejeita usuário com senha errada', async () => {
    // Enviando usuario valido, mas com senha errada
    const response: Response = await request(app)
                                      .post('/login')
                                      .send({email:validUser.email, senha:'senhaerrada'})
                                      .set('Accept', 'application/json');
    
    expect(response.status).toBe(401); // Unauthorized
    expect(response.body).toHaveProperty('message', 'Senha incorreta.');
  });

 test('Login aceita usuário com senha correta, e retorna token', async () => {
    // Enviando usuario valido, mas com senha errada
    const response: Response = await request(app)
                                      .post('/login')
                                      .send({email:validUser.email, senha:validUser.senha})
                                      .set('Accept', 'application/json');
    
    expect(response.status).toBe(401); // Unauthorized
    expect(response.body).toHaveProperty('message', 'Usuário autenticado com sucesso.');
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('nome', validUser.nome);
    expect(response.body.user).toHaveProperty('email', validUser.email);
  });


});
