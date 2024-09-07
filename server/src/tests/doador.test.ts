import supertest, { Response } from 'supertest';
import Doador from '../models/doadorModel';
import Campanha from '../models/campanhaModel';
import Voluntario from '../models/voluntarioModel';
import { conectar, desconectar } from '../config/db';
import app from '../app';

let idCampanha: string;

const preparar = async () => {
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
    expect(response.body).toHaveProperty('mensagem', 'Credenciais ausentes');
  });
});
