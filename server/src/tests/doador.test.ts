import supertest, { Response } from 'supertest';
import Doador from '../models/doadorModel';
import Campanha from '../models/campanhaModel';
import Voluntario from '../models/voluntarioModel';
import { conectar, desconectar } from '../config/db';
import app from '../app';
import mongoose from 'mongoose';
import { criarCampanha, criarDoador, criarVoluntario } from './fabricas';

let idCampanha: string;
let credenciaisDoador = {email: 'doador0@email.com', senha: 'do@dor123'}; 
let token: string;

const preparar = async () => {
  const doadorValido = new Doador(criarDoador('doador0@email.com')); 
  await doadorValido.save();

  const voluntarioValido = new Voluntario(criarVoluntario('volunt@rio@email.com'));
  const voluntarioSalvo = await voluntarioValido.save();

  const campanhaValida = new Campanha(criarCampanha(voluntarioSalvo._id));
  const campanhaSalva = await campanhaValida.save();
  idCampanha = campanhaSalva.id;
}

beforeAll(async () => {
  await conectar();
  await preparar();
});

afterAll(async () => {
  await Doador.deleteMany({});
  await Campanha.deleteMany({});
  await Voluntario.deleteMany({});
  await desconectar();
})


describe('Doador consegue doar como esperado', () => {
  const doacao = {
    foto: false,
    // Preencher com dados de doação quando forem definidos
  }


  test('Usuário precisa estar cadastrado para doar', async () => {
    // Deve ser rejeitado pelo middleware de autenticação
    const response: Response = await supertest(app)
                                .post(`/api/doar/${idCampanha}`);
    
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('mensagem', 'Usuário não autorizado');
  });

  test('Doador autenticado não consegue doar para campanha não existente', async () => {
    // Fazendo login 
    const login: Response = await supertest(app)
                              .post('/api/login')
                              .send(credenciaisDoador)
                              .set('Accept', 'application/json')

    token = login.body.dados.token;

    const idUnicoInexistente = new mongoose.Types.ObjectId

    const doar: Response = await supertest(app)
                                  .post(`/api/doar/${idUnicoInexistente.toString()}`)
                                  .send(doacao)
                                  .set('Accept', 'application/json')
                                  .set('Authorization', `Bearer ${token}`);

    expect(doar.statusCode).toBe(404);
    expect(doar.body).toHaveProperty('mensagem', 'Campanha inexistente ou encerrada');   
  });

  test('Doador autenticado consegue doar para campanha existente e recebe mensagem adequada', async () => {
    const doar: Response = await supertest(app)
                                  .post(`/api/doar/${idCampanha}`) // id válido
                                  .send(doacao)
                                  .set('Accept', 'application/json')
                                  .set('Authorization', `Bearer ${token}`);

    expect(doar.statusCode).toBe(201); // Recurso criado
    expect(doar.body).toHaveProperty('mensagem', 'Doação iniciada com sucesso');
    expect(doar.body).toHaveProperty('dados');
    expect(doar.body.dados).toHaveProperty('id'); // Usado para gerar qrcode no frontend 
  });
});

describe('Tela de início de doador', () => {
  test('Doador não autenticado não tem acesso à rota', async () => {
    const verRecentes: Response = await supertest(app)  
                                         .get('/api/home')
                                         .set('Accept', 'application/json')

    expect(verRecentes.statusCode).toBe(401);
  });

  test('Doador autenticado tem acesso ao seu histórico de doações recentes', async () => {
    const home: Response = await supertest(app)
                                         .get('/api/home')
                                         .set('Accept', 'application/json')
                                         .set('Authorization', `Bearer ${token}`);

    expect(home.statusCode).toBe(200);
    expect(home.body).toHaveProperty('dados');
    expect(home.body.dados).toHaveProperty('recentes');
  });
});
