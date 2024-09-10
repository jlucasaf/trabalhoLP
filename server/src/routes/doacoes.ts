import express, { Router } from "express";
import ControladoraDoacao from "../controllers/doacoes";
import validaNovaDoacao from "../middlewares/validaNovaDoacao";
import { autenticar } from "../middlewares/autenticar";

const doacoesRouter: Router = express.Router();

doacoesRouter.use(autenticar);
doacoesRouter.route('/').post([validaNovaDoacao, ControladoraDoacao.criar]);

export default doacoesRouter;
