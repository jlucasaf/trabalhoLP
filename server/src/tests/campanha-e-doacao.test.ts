import app from "../app";
// Importando funções
import supertest, {Response} from "supertest";
import { conectar, desconectar } from "../config/db";
import { criarVoluntario, dadosCampanhaValida, criarDoador } from "./fabricas";
// Models
import Doador from "../models/doadorModel";
import Voluntario from "../models/voluntarioModel";
import Campanha from "../models/campanhaModel";

let tokenVoluntario: string;
let tokenDoador: string;
let idCampanha: string;
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
        voluntario: voluntarioValido.nome,
        dataFinal: campanhaValida.dataFinal.toISOString(),
      }
    ];

    expect(response.body).toHaveProperty('dados', listaEsperada);
  });
});
