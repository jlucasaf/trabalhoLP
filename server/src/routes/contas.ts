import express, { Router } from "express";
import validaDoador from "../middlewares/validaDoador";
import ControladoraContas from "../controllers/contas";

const contasRouter: Router = express.Router();

contasRouter.route('/cadastrarDoador')
  .post([validaDoador, ControladoraContas.cadastrar]);

contasRouter.route('/login')
  .post(ControladoraContas.login)

export default contasRouter;
