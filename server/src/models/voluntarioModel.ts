import { hash } from 'bcryptjs';
import mongoose, {Schema, Document} from 'mongoose';

interface IVoluntario extends Document {
    nome: string;
    email: string;
    senha: string;
    CNPJ: string;
    local: string;
    doacoesEntregues: number;
}

const VoluntarioSchema: Schema = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    CNPJ: {type: String, required: true, unique: true},
    local: {type: String}, 
    doacoesEntregues: {type: Number, default: 0}
});

/** Hashing de senha */
VoluntarioSchema.pre('save', async function(next) {
  if (this.isModified('senha')) {
    const senhaHasheada = await hash(this.senha as string, 10);
    this.senha = senhaHasheada;
  }
  next()
});

const Voluntario = mongoose.model<IVoluntario>('Voluntario', VoluntarioSchema);
export default Voluntario;
