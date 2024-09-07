import express, { Router } from "express";
import validaDoador from "../utils/validaDoador";
import ControladoraContas from "../controllers/contas";
import Doador from "../models/doadorModel";

const doadorRouter: Router = express.Router();

const contrContasDoador = new ControladoraContas(Doador, "Doador");

doadorRouter.route('/cadastro')
  .post([validaDoador, contrContasDoador.cadastrar.bind(contrContasDoador)]);

export default doadorRouter;
