import mongoose, {Schema, Document} from 'mongoose';

interface IDoacao extends Document {
    foto: boolean;
    titulo: string;
    data: Date;
    id_doador: mongoose.Schema.Types.ObjectId;
    id_voluntario: mongoose.Schema.Types.ObjectId;
    id_campanha: mongoose.Schema.Types.ObjectId; // Usar pra pegar a localização
    local_atual: string;
    status: 'não iniciado' | 'em andamento' | 'concluído' | 'falha';
}

const DoacaoSchema: Schema = new Schema({
    foto: {type: Boolean, required: true, default: false},
    titulo: {type: String, default: 'Nova doação'},
    data: {type: Date, required: true},
    id_doador: {type: mongoose.Schema.Types.ObjectId, ref: 'Doador', required: true},
    id_voluntario: {type: mongoose.Schema.Types.ObjectId, ref: 'Voluntario', required: true},
    id_campanha: {type: mongoose.Schema.Types.ObjectId, ref: 'Campanha', required: true},
    local_atual: {type: String, required: false},
    status: {type: String, enum: ['pendente', 'em andamento', 'concluído', 'falha'], default: 'pendente'}
});

const Doacao = mongoose.model<IDoacao>('Doacao', DoacaoSchema);
export default Doacao;
