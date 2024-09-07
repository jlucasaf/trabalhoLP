import { hash } from 'bcryptjs';
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

<<<<<<< HEAD
// middleware
=======
// hashing de senha
DoadorSchema.pre('save', async function(next) {
  if (this.isModified('senha')) {
    const senhaHasheada = await hash(this.senha as string, 10);
    this.senha = senhaHasheada;
  }
  next()
});
>>>>>>> 146aaf9a25d535ea9db42e5f435b37c5869b6699

const Doador = mongoose.model<IDoador>('Doador', DoadorSchema);

export default Doador;
