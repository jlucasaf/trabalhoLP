import express, { Router } from "express";
import validaDoador from "../utils/validaDoador";
import ControladoraContas from "../controllers/contas";

const contasRouter: Router = express.Router();

const contrContasDoador = new ControladoraContas
const contrContasVoluntario = new ControladoraContas

contasRouter.route('/cadastrarDoador')
  .post([validaDoador, contrContasDoador.cadastrar.bind(contrContasDoador)]);

contasRouter.route('/cadastrarVoluntario')
  .post([contrContasVoluntario.cadastrar.bind(contrContasVoluntario)]);

contasRouter.route('/login')
  .post(ControladoraContas.login)

export default contasRouter;
