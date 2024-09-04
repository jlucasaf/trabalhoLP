import { NextFunction, Request, Response } from "express"

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader && authHeader.split(' ')[1] // Pula o 'Bearer'

  // Request veio sem token nenhum
  if (!token) return res.status(401).json({message:'Usuário não autorizado'});

}
