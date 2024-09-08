import express, { Router } from "express";
import validaDoador from "../middlewares/validaDoador";
import ControladoraContas from "../controllers/contas";
import { authenticate } from "../middlewares/authentication";

const contasRouter: Router = express.Router();

contasRouter.route('/cadastrarDoador')
  .post([validaDoador, ControladoraContas.cadastrar]);

contasRouter.route('/login')
  .post(ControladoraContas.login)

contasRouter.route('/home').get([authenticate, ControladoraContas.home])

export default contasRouter;
