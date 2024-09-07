import { Request, Response } from "express";

/**
 * ControladoraDoacoes é responsável por implementar os serviços relacionados
 * a doações, como criar doação, consultar doação, atualizar doação
 * @class
 */
export default class ControladoraDoacao { 
  static async doar(req: Request, res: Response) {
    res.end(); 
  }
}
