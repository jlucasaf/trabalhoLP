import { Request, Response } from "express";
import userValidation from "../utils/userValidation";


export async function create(req: Request, res: Response) {
  const user = req.body;
  
  const {error, value} = userValidation.validate(user);

  if (error) {
    return res.status(400).json({success:false, 
      message:'Dados de usuário inválidos', 
      data:error.details});
  }
}