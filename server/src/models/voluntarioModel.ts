import mongoose, {Schema, Document} from 'mongoose';

interface IVoluntario extends Document {
    nome: string;
    email: string;
    senha: string;
    CNPJ: string;
    local: {
        cidade: string;
        endereco: string;
        CEP: string;
    };
    doacoesEntregues: number;
}

const VoluntarioSchema: Schema = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    CNPJ: {type: String, required: true, unique: true},
    local: {
        cidade: {type: String, required: true},
        endereco: {type: String, required: true},
        CEP: {type: String, required: true},
    },
    doacoesEntregues: {type: Number, default: 0}
});


const Voluntario = mongoose.model<IVoluntario>('Voluntario', VoluntarioSchema);
export default Voluntario;
