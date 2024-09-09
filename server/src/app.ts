import express, { Express } from 'express';
import contasRouter from './routes/contas';
import doadorRouter from './routes/doador';

const app: Express = express();

app.use(express.json())

app.use('/api', contasRouter);
app.use('/api', doadorRouter);

export default app;
