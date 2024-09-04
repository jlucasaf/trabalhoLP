import mongoose, {Schema, Document} from 'mongoose';

// Extende interface de Documento padrão do mongoose, herdando atributos e metodos uteis
interface IUser extends Document {
    nome: string;
    email: string;
    senha: string;
    local: string;
    doacoesFeitas: number;
    doacoesRecebidas: number;
}

// Esquema de usuario define a estrutura do documento MongoDB
const UserSchema: Schema = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    local: {type: String},
    doacoesFeitas: {type: Number, default: 0},
    doacoesRecebidas: {type: Number, default: 0}
});


const User = mongoose.model<IUser>('User', UserSchema);
export default User;
