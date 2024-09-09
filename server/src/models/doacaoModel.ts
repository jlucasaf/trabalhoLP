import mongoose, {Schema, Document} from 'mongoose';

interface IDoacao extends Document {
    foto: boolean;
    local: {
        cidade: string;
        endereco: string;
        CEP: string;
    };
    data: Date;
    id_doador: mongoose.Schema.Types.ObjectId;
    id_voluntario: mongoose.Schema.Types.ObjectId;
    id_campanha: mongoose.Schema.Types.ObjectId; // Usar pra pegar a localização
    status: 'não iniciado' | 'em andamento' | 'concluído' | 'falha';
}

const DoacaoSchema: Schema = new Schema({
    foto: {type: Boolean, required: true, default: false},
    local: {
        cidade: {type: String, required: true},
        endereco: {type: String, required: true},
        CEP: {type: String, required: true},
    },
    data: {type: Date, required: true},
    id_doador: {type: mongoose.Schema.Types.ObjectId, ref: 'Doador', required: true},
    id_voluntario: {type: mongoose.Schema.Types.ObjectId, ref: 'Voluntario', required: true},
    id_campanha: {type: mongoose.Schema.Types.ObjectId, ref: 'Campanha', required: true},
    status: {type: String, enum: ['pendente', 'em andamento', 'concluído', 'falha'], default: 'pendente'}
});

// middleware

const Doacao = mongoose.model<IDoacao>('Doacao', DoacaoSchema);
export default Doacao;
