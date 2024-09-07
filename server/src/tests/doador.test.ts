import supertest, { Response } from 'supertest';
import Doador from '../models/doadorModel';
import Campanha from '../models/campanhaModel';
import Voluntario from '../models/voluntarioModel';
import { conectar, desconectar } from '../config/db';
import app from '../app';

let idCampanha: string;
let credenciaisDoador = {email: 'doador@valido.com', senha: 'do@dor123'}; 

const preparar = async () => {
  const doadorValido = new Doador({
    nome: 'Doador Válido',
    email: 'doador@valido.com',
    senha: 'do@dor123',
    CPF: '000.788.610-12',
      local: {
      cidade: 'Cidade Válida',
      endereco: 'Endereço válido',
      CEP: '29046-095'
    }
  });
  
  await doadorValido.save();

  const voluntarioValido = new Voluntario({
    nome: 'Voluntario da Silva',
    email: 'voluntario1@gmail.com',
    senha: 'v123',
    CNPJ: '12.345.678/0001-91',
    local: {
      cidade: 'Brasília',
      endereco: 'quadra 01 conj 02 casa 03 - Algum lugar',
      CEP: '12345678'
    },
    doacoesEntregues: 15
  });

  const voluntarioSalvo = await voluntarioValido.save();

  const campanhaValida = new Campanha({
    titulo: 'Título',
    descricao: 'Descrição',
    local: {
      cidade: 'Cidade',
      endereco: 'Endereço',
      CEP: 'CEP',
    },
    dataFinal: new Date('2030-01-01'),
    id_voluntario: voluntarioSalvo._id,
  });

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
  test('Usuário precisa estar cadastrado para doar', async () => {
    // Deve ser rejeitado pelo middleware de autenticação
    const response: Response = await supertest(app)
                                .post(`/api/doar/${idCampanha}`);
    
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('mensagem', 'Usuário não autorizado');
  });

  test('Doador autenticado não consegue doar para campanha não existente', async () => {
    const doacao = {
      foto: false,
      data: new Date('2022-02-11'),
    }
    
    const login: Response = await supertest(app)
                              .post('/api/login')
                              .send(credenciaisDoador)
                              .set('Accept', 'application/json')


    console.log(login.body)

    const token: string = login.body.dados.token;

    const doar: Response = await supertest(app)
                                  .post('/api/doar/1234')
                                  .send(doacao)
                                  .set('Accept', 'application/json')
                                  .set('Authorization', `Bearer ${token}`);

    console.log(doar.body);
    expect(doar.statusCode).toBe(400);
    expect(doar.body).toHaveProperty('mensagem', 'Campanha não existe ou está inativa');
    
  })
});
