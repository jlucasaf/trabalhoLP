import express, { Express } from 'express';
import userRouter from './routes/userRoutes';

const app: Express = express();

app.use(express.json())
app.use('/', userRouter);

export default app;
