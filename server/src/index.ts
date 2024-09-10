import dotenv from 'dotenv'
dotenv.config();

import app from './app';
import { conectarAtlas, desconectar } from './config/db';

const PORT = 3000;

const startServer = async () => {
  try {
    await conectarAtlas();

    app.listen(PORT, () => {
      console.log(`Servidor escutando na porta ${PORT}...`);
    });

    process.on('SIGINT', async () => {
      await desconectar();
      console.log('Desconectado do banco de dados pelo término de execução');
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await desconectar();
      console.log('Desconectado do banco de dados pelo término de execução');
      process.exit(0);
    });

  } catch (err: any) {
    console.error('Erro ao iniciar o servidor:', err.message);
    process.exit(1);  
  }
};

startServer();

