import express, { Express } from 'express';
import contasRouter from './routes/contas';
import doacoesRouter from './routes/doacoes';
import campanhasRouter from './routes/campanhas'; 
import { setupSwagger } from './config/swagger';

const app: Express = express();

app.use(express.json());

app.use('/api', contasRouter);

app.use('/api/campanhas', campanhasRouter);

app.use('/api/doacoes', doacoesRouter);

setupSwagger(app);

export default app;

