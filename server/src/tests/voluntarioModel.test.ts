import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import Voluntario from '../models/voluntarioModel';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
}, 20000);

describe('Voluntário', () => {
    it('salva os dados não únicos', async () => {
        const voluntario1 = new Voluntario({
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
        await voluntario1.save();

        expect(voluntario1.nome).toBe('Voluntario da Silva');
        expect(voluntario1.senha).toBe('v123');
        expect(voluntario1.local.cidade).toBe('Brasília');
        expect(voluntario1.local.endereco).toBe('quadra 01 conj 02 casa 03 - Algum lugar');
        expect(voluntario1.local.CEP).toBe('12345678');
        expect(voluntario1.doacoesEntregues).toBe(15);
    });

});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
