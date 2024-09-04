import express, {Router} from 'express';
import * as userController from '../controllers/userController';
import donationRouter from './donationRoutes';

const userRouter: Router = express.Router();

// Criação de conta
userRouter.route('/register').post(userController.register);
// Login
userRouter.route('/login').post(userController.login);
// Página inicial após o login
userRouter.route('/:userId');
// Opções de conta -> exibir infomraçoes de usuário / atualizar conta / excluir conta  
userRouter.route('/:userId/account');
// Exibe as estatísticas do usuário
userRouter.route('/:userId/stats');
// Usa as rotas de doação
userRouter.use('/:userId/', donationRouter);

export default userRouter;
