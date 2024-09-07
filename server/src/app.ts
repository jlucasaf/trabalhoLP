import express, { Express } from 'express';
import doadorRouter from './routes/doador';

const app: Express = express();

app.use(express.json())

app.use('/api/doador', doadorRouter);

export default app;
