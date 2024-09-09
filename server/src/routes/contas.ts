import express, { Router } from "express";
import validaNovoUsuario from "../middlewares/validaNovoUsuario";
import ControladoraContas from "../controllers/contas";

const contasRouter: Router = express.Router();

contasRouter.route('/cadastrar')
  .post([validaNovoUsuario, ControladoraContas.cadastrar]);

contasRouter.route('/login')
  .post(ControladoraContas.login)

export default contasRouter;
