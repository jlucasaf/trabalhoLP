import mongoose, {Schema, Document} from 'mongoose';

interface ICampanha extends Document {
    titulo: string;
    descricao: string;
    local: string;
    dataFinal: Date;
    id_voluntario: mongoose.Schema.Types.ObjectId;
}

const CampanhaSchema: Schema = new Schema({
    titulo: {type: String, required: true, unique: true},
    descricao: {type: String, required: true},
    local: {type: String}, 
    dataFinal: {type: Date,},
    id_voluntario: {type: mongoose.Schema.Types.ObjectId, ref: 'Voluntario', required: true},
    
});

const Campanha = mongoose.model<ICampanha>('Campanha', CampanhaSchema);
export default Campanha;
