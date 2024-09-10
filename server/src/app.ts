import express, { Express } from 'express';
import contasRouter from './routes/contas';
import doacoesRouter from './routes/doacoes';
import campanhasRouter from './routes/campanhas'; 

const app: Express = express();

app.use(express.json());

app.use('/api', contasRouter);

app.use('/api/campanhas', campanhasRouter);

app.use('/api/doacoes', doacoesRouter);

export default app;
