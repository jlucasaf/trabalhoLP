import app from "../app";
// Importando funções
import supertest, {Response} from "supertest";
import { conectar, desconectar } from "../config/db";
import { criarVoluntario, dadosCampanhaValida, criarDoador, dadosDoacaoValida } from "./fabricas";
// Models
import Doador from "../models/doadorModel";
import Voluntario from "../models/voluntarioModel";
import Campanha from "../models/campanhaModel";
// import Doacao from "../models/doacaoModel";

let tokenVoluntario: string;
let tokenDoador: string;
let idCampanha: string;
let idDoacao: string;
const campanhaValida = dadosCampanhaValida();
const voluntarioValido = criarVoluntario('voluntario1@email.com'); 
const doadorValido = criarDoador('doador1@email.com'); 

beforeAll(async ()=> {
  await conectar();
  const response: Response = await supertest(app)
                              .post('/api/cadastrar')
                              .send({tipo:'voluntario', dados:voluntarioValido})
                              .set('Accept', 'application/json');
  tokenVoluntario = response.body.dados.token;

  const response2: Response = await supertest(app)
                              .post('/api/cadastrar')
                              .send({tipo:'doador', dados:doadorValido})
                              .set('Accept', 'application/json');
  tokenDoador = response2.body.dados.token;
});

afterAll(async ()=>{
  await Doador.deleteMany({});
  await Voluntario.deleteMany({});
  await Campanha.deleteMany({});
  await desconectar();
});
    
describe('Criação de campanha por Voluntário funciona corretamente [POST api/campanhas]', () => {

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
                                      .set('authorization', `Bearer ${tokenVoluntario}`);

    expect(response.statusCode).toBe(400); // Bad request
  });

  test('Tentar criar campanha com dados válidos resulta em sucesso', async () => {
    const response: Response = await supertest(app)
                                      .post('/api/campanhas')
                                      .send(campanhaValida)
                                      .set('Accept', 'application/json')
                                      .set('authorization', `Bearer ${tokenVoluntario}`);
    
    expect(response.statusCode).toBe(201); // Resource created
    idCampanha = response.body.dados.id;
  });
});

describe('Leitura de campanha funciona corretamente [GET api/campanhas]', () => {
  test('Doador consegue ver lista de campanhas criadas recentemente', async () => {
    const response: Response = await supertest(app)
                                      .get('/api/campanhas')
                                      .set('authorization', `Bearer ${tokenDoador}`)
                                      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    const listaEsperada = [
      {
        id: idCampanha,
        titulo: campanhaValida.titulo,
        local: campanhaValida.local,
        descricao: campanhaValida.descricao,
        voluntario: voluntarioValido.nome,
        dataFinal: campanhaValida.dataFinal.toISOString(),
      }
    ];

    expect(response.body).toHaveProperty('dados', listaEsperada);
  });

  test('Voluntário consegue ver lista de campanhas criadas por ele', async () => {
    const response: Response = await supertest(app)
                                      .get('/api/campanhas')
                                      .set('authorization', `Bearer ${tokenVoluntario}`)
                                      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    const listaEsperada = [
      {
        id: idCampanha,
        titulo: campanhaValida.titulo,
        descricao: campanhaValida.descricao,
        local: campanhaValida.local,
        dataFinal: campanhaValida.dataFinal.toISOString(),
      }
    ];

    expect(response.body).toHaveProperty('dados', listaEsperada);
  });
});

describe('Criação de doação funciona como esperado', () => {
  test('Usuário precisa estar autenticado para criar uma doação', async () => {
    const response: Response = await supertest(app)
                                      .post('/api/doacoes')
    expect(response.statusCode).toBe(401); // Não autorizado
  });

  test('Tentar criar doação com dados inválidos resulta em fracasso', async () => {
    const response: Response = await supertest(app)
                                      .post('/api/doacoes')
                                      .send({})
                                      .set('Accept', 'application/json')
                                      .set('authorization', `Bearer ${tokenDoador}`);

    expect(response.statusCode).toBe(400); // Bad request
  });

  test('Tentar criar doação com dados válidos resulta em sucesso', async () => {
    const response: Response = await supertest(app)
                                      .post('/api/doacoes')
                                      .send(dadosDoacaoValida(idCampanha, false))
                                      .set('Accept', 'application/json')
                                      .set('authorization', `Bearer ${tokenDoador}`);

    expect(response.statusCode).toBe(201); // Resource created
    expect(response.body).toHaveProperty('dados');
    idDoacao = response.body.dados;
  });
});

describe('Acompanhamento de doação funciona corretamente', () => {
  test('Voluntário consegue acompanhar doações a caminho de suas campanhas', async () => {
    const response: Response = await supertest(app)
                                      .get(`/api/campanhas/${idCampanha}`)
                                      .set('Accept', 'application/json')
                                      .set('authorization', `Bearer ${tokenVoluntario}`);

    expect(response.statusCode).toBe(200); // OK
    expect(response.body).toHaveProperty('dados');
    expect(response.body.dados).toHaveProperty('doacoesACaminho');
  });

  test('Doador não consegue acompanhar doação inexistente', async () => {
    const idNaoDoacao = idCampanha;
    const response: Response = await supertest(app)
                                      .get(`/api/doacoes/${idNaoDoacao}`)
                                      .set('Accept', 'application/json')
                                      .set('authorization', `Bearer ${tokenDoador}`);

    expect(response.statusCode).toBe(404); // Not found
  });

  test('Doador consegue acompanhar suas doações recentes', async () => {
    const response: Response = await supertest(app)
                                      .get(`/api/doacoes`)
                                      .set('Accept', 'application/json')
                                      .set('authorization', `Bearer ${tokenDoador}`);

    expect(response.statusCode).toBe(200); // OK
    expect(response.body).toHaveProperty('dados');
  });

});


describe('Confirmação de doação funciona corretamente', () => {
  test('Voluntário consegue confirmar doação que não exige foto', async () => {
    const response: Response = await supertest(app)
                                      .patch(`/api/doacoes/${idDoacao}`)
                                      .send({status: 'concluído'})
                                      .set('Accept', 'application/json')
                                      .set('authorization', `Bearer ${tokenVoluntario}`);

    expect(response.statusCode).toBe(200); // OK
    expect(response.body).toHaveProperty('mensagem', 'Recebimento da doação confirmado com sucesso');
  });
});

