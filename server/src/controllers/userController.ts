import { Request, Response } from "express";
import userValidation from "../utils/userValidation";
import User from "../models/userModel";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// const DUPLICATE_KEY_ERR = 11000; // Código de erro do mongoDb
const access_token_secret = process.env.ACCESS_TOKEN_SECRET || "default";

export async function register(req: Request, res: Response) {
  const userData = req.body;
  
  const {error} = userValidation.validate(userData);

  if (error) {
    return res.status(400).json({
      success:false, 
      message:'Dados de usuário inválidos', 
      data:error.details
    });
  }

  const newUser = new User(userData)
  
  const savedUser = await newUser.save();

  const newUserToken = sign({id:savedUser.id, email:userData.email}, access_token_secret);
  
  return res.status(200).json({
    success:true,
    message:'Usuário criado com sucesso.', 
    token:newUserToken});
}

export async function login(_req: Request, res: Response) {
  res.end();
}
