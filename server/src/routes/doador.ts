import express, { Router } from "express";
import validaDoador from "../utils/validaDoador";

const doadorRouter: Router = express.Router();

doadorRouter.route('/cadastro').post([validaDoador])

export default doadorRouter;
