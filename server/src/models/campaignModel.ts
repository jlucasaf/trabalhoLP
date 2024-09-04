import mongoose, {Schema, Document} from 'mongoose';

// Extende interface de Documento padrão do mongoose, herdando atributos e metodos uteis
interface ICampaign extends Document {
    titulo: string;
    descricao: string;
    local: string; // Precisa de mais detalhes
    endDate: Date;
    id_recebedor: mongoose.Schema.Types.ObjectId;
    // Informação privada
    infoConta: {
        numeroConta: string;
        agencia: string;
        nomeBanco: string;
        tipoConta: 'Corrente' | 'Poupança';
    }
}

// Esquema: define a estrutura do documento MongoDB
const CampaignSchema: Schema = new Schema({
    titulo: {type: String, required: true, unique: true},
    descricao: {type: String, required: true},
    local: {type: String,},
    endDate: {type: Date,},
    id_recebedor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    infoConta: {
        numeroConta: {type: String, required: true},
        agencia: {type: String, required: true},
        nomeBanco: {type: String, required: true},
        tipoConta: {type: String, enum: ['Corrente', 'Poupança'], required: true}
    }
});


const Campaign = mongoose.model<ICampaign>('Campaign', CampaignSchema);
export default Campaign;
