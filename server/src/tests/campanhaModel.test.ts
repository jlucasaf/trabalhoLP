import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import Campanha from '../models/campanhaModel';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

describe('Campanha', () => {
    it('salva os dados não únicos', async () => {
        const campanha1 = new Campanha({
            titulo: 'Campanha de doação',
            descricao: '',
            local: {
                cidade: 'Brasília',
                endereco: 'quadra 01 conj 02 casa 03 - Algum lugar',
                CEP: '12345678'
            },
            dataFinal: new Date('2024-09-10T23:59:59Z'),
            // id_voluntario:
        });
        await campanha1.save();

        expect(campanha1.titulo).toBe('Campanha de doação');
        expect(campanha1.descricao).toBe('');
        expect(campanha1.local.cidade).toBe('Brasília');
        expect(campanha1.local.endereco).toBe('quadra 01 conj 02 casa 03 - Algum lugar');
        expect(campanha1.local.CEP).toBe('12345678');
        //expect(campanha1.dataFinal).toBe();
    });

});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
