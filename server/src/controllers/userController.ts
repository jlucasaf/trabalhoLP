import { Request, Response } from "express";
import userValidation from "../utils/userValidation";
// import User from "../models/userModel";
// import * as jwt from "jsonwebtoken"

export async function register(req: Request, res: Response) {
  const user = req.body;
  
  const {error} = userValidation.validate(user);

  if (error) {
    return res.status(400).json({success:false, 
      message:'Dados de usuário inválidos', 
      data:error.details});
  }

  return res.status(200).json({success:true, 
    message:'Usuário criado com sucesso.'});
}

export async function login(_req: Request, res: Response) {
  res.end();
}
