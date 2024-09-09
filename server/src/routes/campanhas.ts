import express, { Router } from "express";
import { autenticar } from "../middlewares/autenticar";
import ControladoraCampanha from "../controllers/campanhas";
import validaNovaCampanha from "../middlewares/validaNovaCampanha";
const campanhasRouter: Router = express.Router();

campanhasRouter.use(autenticar);

campanhasRouter.route('/')
  .post([validaNovaCampanha, ControladoraCampanha.criar])
  .get(ControladoraCampanha.listar);

campanhasRouter.route('/:idCampanha')
  .post(ControladoraCampanha.acompanhar);

export default campanhasRouter;
