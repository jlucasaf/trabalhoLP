import express, { Router } from "express";
import validaDoador from "../utils/validaDoador";
import ControladoraContas from "../controllers/contas";
import Doador from "../models/doadorModel";
import Voluntario from "../models/voluntarioModel";

const contasRouter: Router = express.Router();

const contrContasDoador = new ControladoraContas(Doador, "Doador");
const contrContasVoluntario = new ControladoraContas(Voluntario, "Voluntário");

contasRouter.route('/cadastrarDoador')
  .post([validaDoador, contrContasDoador.cadastrar.bind(contrContasDoador)]);



export default contasRouter;
