import mongoose, {Schema, Document} from 'mongoose';

interface IDoador extends Document {
    nome: string;
    email: string;
    senha: string;
    CPF: string;
    local: {
        cidade: string;
        endereco: string;
        CEP: string;
    };
    doacoesFeitas: number;
}

// Esquema de usuario define a estrutura do documento MongoDB
const DoadorSchema: Schema = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    CPF: {type: String, required: true, unique: true},
    local: {
        cidade: {type: String, required: true},
        endereco: {type: String, required: true},
        CEP: {type: String, required: true},
    },
    doacoesFeitas: {type: Number, default: 0}
});


const Doador = mongoose.model<IDoador>('Doador', DoadorSchema);
export default Doador;
