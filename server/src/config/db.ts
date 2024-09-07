import mongoose from 'mongoose';

const dbPath = "mongodb://localhost:27017/trabalhodb";

export const conectar = async () => {
  try {
    await mongoose.connect(dbPath);
    console.log('Conectado ao MongoDB');
  } catch (err: any) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1); // Opcional: encerra o processo se a conexão falhar
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

