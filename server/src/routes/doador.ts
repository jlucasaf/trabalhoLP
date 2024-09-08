import express, { Router } from "express";
import ControladoraDoacao from "../controllers/doacao";
import { authenticate } from "../middlewares/authentication";

const doadorRouter: Router = express.Router();

doadorRouter.route('/doar/:idCampanha').post([authenticate, ControladoraDoacao.doar]);

export default doadorRouter;
