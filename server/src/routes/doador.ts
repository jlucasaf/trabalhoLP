import express, { Router } from "express";
import ControladoraDoacao from "../controllers/doacao";
import { autenticar } from "../middlewares/autenticar";

const doadorRouter: Router = express.Router();

doadorRouter.route('/doar/:idCampanha').post([autenticar, ControladoraDoacao.doar]);

export default doadorRouter;
