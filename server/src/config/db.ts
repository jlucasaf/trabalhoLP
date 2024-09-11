import mongoose from 'mongoose';

const MONGO_LOCAL_URI = "mongodb://localhost:27017/trabalhodb";
const MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI

export const conectar = async () => {
  try {
    await mongoose.connect(MONGO_LOCAL_URI);
  } catch (err: any) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1); 
  }
}

export const conectarAtlas = async () => {
  try {
    await mongoose.connect(MONGO_ATLAS_URI as string);
    console.log('Conectado ao MongoDB Atlas');
  } catch (err: any) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);  
  }
}

export const desconectar = async () => {
  try {
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB');
  } catch (err: any) {
    console.error('Erro ao desconectar do MongoDB:', err.message);
  }
}
