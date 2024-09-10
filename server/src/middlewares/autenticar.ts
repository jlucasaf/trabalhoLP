import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { segredoToken } from "../config/config";

interface TokenPayload {
  tipo: "doador" | "voluntario";
  id: string;
  nome: string;
  email: string;
}

/** Middleware de autenticação */
export const autenticar = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader && authHeader.split(' ')[1]; // Pula o 'Bearer'

  if (!token) return res.status(401).json({ sucesso: false, mensagem: 'Usuário não autorizado' });

  verify(token, segredoToken, (erro, decodificado) => {
    if (erro || !decodificado) {
      return res.status(401).json({ sucesso: false, mensagem: 'Token inválido' });
    }

    const usuario = decodificado as TokenPayload;

    req.usuario = {
      tipo: usuario.tipo,
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    };

    next();
  });
};
