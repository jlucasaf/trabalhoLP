import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import Doador from '../models/doadorModel';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
}, 20000);

describe('Doador', () => {
    it('salva os dados não únicos', async () => {
        const doador1 = new Doador({
            nome: 'Doador da Silva',
            email: 'doador1@gmail.com',
            senha: 'd123',
            CPF: '123.456.789-12',
            local: {
                cidade: 'Brasília',
                endereco: 'quadra 01 conj 02 casa 03 - Algum lugar',
                CEP: '12345678'
            },
            doacoesFeitas: 4
        });
        await doador1.save();

        expect(doador1.nome).toBe('Doador da Silva');
        expect(doador1.senha).toBe('d123');
        expect(doador1.local.cidade).toBe('Brasília');
        expect(doador1.local.endereco).toBe('quadra 01 conj 02 casa 03 - Algum lugar');
        expect(doador1.local.CEP).toBe('12345678');
        expect(doador1.doacoesFeitas).toBe(4);
    });

});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
