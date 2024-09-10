import express, { Router } from "express";
import ControladoraDoacao from "../controllers/doacoes";
// Middlewares
import validaNovaDoacao from "../middlewares/validaNovaDoacao";
import autenticar from "../middlewares/autenticar";
import atualizaDoacao from "../middlewares/atualizaDoacao";
import upload from "../config/multerConfig";

const doacoesRouter: Router = express.Router();

doacoesRouter.use(autenticar);

doacoesRouter.route('/')
  .post([validaNovaDoacao, ControladoraDoacao.criar])
  .get(ControladoraDoacao.listar);

doacoesRouter.route('/:idDoacao')
  .get(ControladoraDoacao.acompanhar)
  .patch([atualizaDoacao, upload.array('fotos'), ControladoraDoacao.atualizar]);

export default doacoesRouter;
