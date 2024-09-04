import mongoose, { Schema, Document } from 'mongoose';
import { hash } from 'bcryptjs';

// Extende a interface de Documento padrão do mongoose, herdando atributos e métodos úteis
interface IUser extends Document {
  nome: string;
  email: string;
  senha: string;
  local: string;
  dataNascimento: Date;
  doacoesFeitas: number;
  doacoesRecebidas: number;
}

// Esquema de usuário define a estrutura do documento MongoDB
const UserSchema: Schema<IUser> = new Schema({
  nome: {type: String},
  email: {type: String, unique: true},
  senha: {type: String},
  dataNascimento: {type: Date}, 
  local: {type: String },
  doacoesFeitas: {type: Number, default: 0 },
  doacoesRecebidas: {type: Number, default: 0 }
});

UserSchema.pre<IUser>('save', async function(next) {
  // Re-hasheia a senha se ela foi modificada
  if (this.isModified('senha')) {
    const hashedPassword = await hash(this.senha, 10);
    this.senha = hashedPassword;
  }

  next();
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;

