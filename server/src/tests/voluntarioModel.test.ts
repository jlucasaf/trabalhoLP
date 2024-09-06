import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import Voluntario from '../models/voluntarioModel';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

describe('Modelo do voluntário', () => {
   
    test('nome não fornecido', async () => {
        const voluntario1 = new Voluntario({
            email: 'voluntario1@gmail.com',
            senha: 'v123',
            CNPJ: '12.345.678/0001-91,',
            local: {
                cidade: 'Brasília',
                endereco: 'quadra 01 conj 02 casa 03 - Algum lugar',
                CEP: '12345678'
            }
        });
        expect(voluntario1.save()).rejects.toThrow(/Voluntario validation failed: nome: Path `nome` is required./);
    });

});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
