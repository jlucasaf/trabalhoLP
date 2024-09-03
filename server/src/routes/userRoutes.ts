import express, {Router} from 'express';

const userRouter: Router = express.Router();

userRouter.route('/register');

export default userRouter;
