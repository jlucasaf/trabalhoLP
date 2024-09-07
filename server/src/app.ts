import express, { Express } from 'express';
import contasRouter from './routes/contas';

const app: Express = express();

app.use(express.json())

app.use('/api', contasRouter);

export default app;
