import express, { Express } from 'express';
import contasRouter from './routes/contas';
import doadorRouter from './routes/doador';
import campanhasRouter from './routes/campanhas';

const app: Express = express();

app.use(express.json())

app.use('/api', contasRouter);

app.use('/api/campanhas', campanhasRouter)

app.use('/api', doadorRouter);

export default app;
