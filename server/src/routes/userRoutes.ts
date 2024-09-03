import express, {Router} from 'express';
import * as userController from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.route('/register').post(userController.register);
userRouter.route('/login').post(userController.login);

export default userRouter;
