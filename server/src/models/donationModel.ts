import mongoose, {Schema, Document} from 'mongoose';

// Extende interface de Documento padrão do mongoose, herdando atributos e metodos uteis
interface IDonation extends Document {
    tipo: 'valor' | 'pacote';
    valor?: number;
    m_pagamento?: string;
    local?: string; // Pegar da campanha
    data: Date;
    id_doador: mongoose.Schema.Types.ObjectId;
    id_recebedor: mongoose.Schema.Types.ObjectId;
    id_campaign: mongoose.Schema.Types.ObjectId; // Usar pra pegar a localização
    status: 'não iniciado' | 'em andamento' | 'concluído' | 'falha';
}

// Define a estrutura do documento MongoDB
const DonationSchema: Schema = new Schema({
    tipo: {type: String, enum: ['valor', 'pacote'], required: true},
    valor: {type: Number}, // Se for valor
    m_pagamento: {type: String},
    local: {type: String}, // Se for pacote
    data: {type: Date, required: true},
    id_doador: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    id_recebedor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    id_campaign: {type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true},
    status: {type: String, enum: ['não iniciado', 'em andamento', 'concluído', 'falha'], default: 'não iniciado'}
});


// QR code?

const Donation = mongoose.model<IDonation>('Donation', DonationSchema);
export default Donation;
