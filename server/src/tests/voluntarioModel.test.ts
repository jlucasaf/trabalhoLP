import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import Voluntario from '../models/voluntarioModel';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

describe('Voluntário', () => {
    it('salva os dados não únicos', async () => {
        const voluntario2 = new Voluntario({
            nome: 'Voluntario da Silva',
            email: 'voluntario2@gmail.com',
            senha: 'v123',
            CNPJ: '12.345.678/0001-92,',
            local: {
                cidade: 'Brasília',
                endereco: 'quadra 01 conj 02 casa 03 - Algum lugar',
                CEP: '12345678'
            }
        });
        await voluntario2.save();

        expect(voluntario2.nome).toBe('Voluntario da Silva');
        expect(voluntario2.senha).toBe('v123');
        expect(voluntario2.local.cidade).toBe('Brasília');
        expect(voluntario2.local.endereco).toBe('quadra 01 conj 02 casa 03 - Algum lugar');
        expect(voluntario2.local.CEP).toBe('12345678');
    });

});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
