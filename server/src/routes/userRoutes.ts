import express, {Router} from 'express';
import * as userController from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.route('/register').post(userController.create)

export default userRouter;
