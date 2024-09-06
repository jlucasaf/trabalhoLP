import app from './app';
import { connectDB, disconnectDB } from './config/db';

const PORT = 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor escutando na porta ${PORT}...`);
    });

    process.on('SIGINT', async () => {
      await disconnectDB();
      console.log('Desconectado do banco de dados pelo término de execução');
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await disconnectDB();
      console.log('Desconectado do banco de dados pelo término de execução');
      process.exit(0);
    });

  } catch (err: any) {
    console.error('Erro ao iniciar o servidor:', err.message);
    process.exit(1);  
  }
};

startServer();

