import express, { Router } from "express";
import { autenticar } from "../middlewares/autenticar";
import ControladoraCampanha from "../controllers/campanhas";
const campanhasRouter: Router = express.Router();

campanhasRouter.use(autenticar);

campanhasRouter.route('/')
  .post(ControladoraCampanha.criar)
  .get(ControladoraCampanha.listar);

campanhasRouter.route('/:idCampanha')
  .post(ControladoraCampanha.acompanhar);

export default campanhasRouter;
