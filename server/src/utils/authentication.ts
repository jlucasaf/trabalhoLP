import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

const access_token_secret = process.env.ACCESS_TOKEN_SECRET || "default";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader && authHeader.split(' ')[1] // Pula o 'Bearer'

  // Request veio sem token nenhum
  if (!token) return res.status(401).json({message:'Usuário não autorizado'});

  verify(token, access_token_secret, (error) => {
    if (error) return res.status(401).json({message:'Token inválido'});
    next();
  });
}
