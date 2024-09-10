import mongoose, {Schema, Document} from 'mongoose';

interface ICampanha extends Document {
    titulo: string;
    descricao: string;
    local: {
        cidade: string;
        endereco: string;
        CEP: string;
    };
    dataFinal: Date;
    id_voluntario: mongoose.Schema.Types.ObjectId;
}

const CampanhaSchema: Schema = new Schema({
    titulo: {type: String, required: true, unique: true},
    descricao: {type: String, required: true},
    local: {
        cidade: {type: String, required: true},
        endereco: {type: String, required: true},
        CEP: {type: String, required: true},
    },
    dataFinal: {type: Date,},
    id_voluntario: {type: mongoose.Schema.Types.ObjectId, ref: 'Voluntario', required: true},
    
});

const Campanha = mongoose.model<ICampanha>('Campanha', CampanhaSchema);
export default Campanha;
