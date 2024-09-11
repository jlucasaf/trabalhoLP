import path from 'path'
//
import express, { Router } from "express";
import ControladoraDoacao from "../controllers/doacoes";
// Middlewares
import validaNovaDoacao from "../middlewares/validaNovaDoacao";
import autenticar from "../middlewares/autenticar";
import atualizaDoacao from "../middlewares/atualizaDoacao";
import upload from "../config/multerConfig";

const doacoesRouter: Router = express.Router();

doacoesRouter.use(autenticar);

doacoesRouter.use('/midia', express.static(path.join(__dirname, '../../uploads')))

doacoesRouter.route('/')
  .post([validaNovaDoacao, ControladoraDoacao.criar])
  .get(ControladoraDoacao.listar);

doacoesRouter.route('/:idDoacao')
  .get(ControladoraDoacao.acompanhar)
  .patch([upload.array('foto'), atualizaDoacao, ControladoraDoacao.atualizar]);

export default doacoesRouter;
