import { Request, Response } from "express";
import Campanha from "../models/campanhaModel";
import mongoose from "mongoose";

/**
 * ControladoraDoacoes é responsável por implementar os serviços relacionados
 * a doações, como criar doação, consultar doação, atualizar doação
 * @class
 */
export default class ControladoraDoacao {
  /**
  * Método para criar uma nova doação
  * @param {Request} req - Objeto de requisição do express. O corpo
  * da requisição contém os atributos necessários para a criação de 
  * uma nova doação, já validados e no formato. O req também terá como 
  * atributo 'usuario', do qual podem ser extraídos id, tipo, nome e email
  * @param {Response} res - Objeto de resposta do Express, chamado
  * após a conclusão da operação, pode ter campos {sucesso, mensagem, dados?}
  * @return {Promise<void>} promise que representa a conclusão ou não da 
  * criação da nova doação.
  * > Em caso de campanha inexistente ou encerrada, mensagem será 
  * 'Campanha inexistente ou encerrada'
  * > Caso exista a campanha, criará a doação adequadamente no banco de dados
  *   e irá obter o id
  * > Caso sucesso, mensagem será 'Doação iniciada com sucesso'
  *   e deverá ser retornado o id da doação no corpo de resposta (em dados)
  */
  static async doar(req: Request, res: Response): Promise<void> {
    const idCampanha: string = req.params.idCampanha

    if (!mongoose.Types.ObjectId.isValid(idCampanha)) {
      res.status(400).json({sucesso: false, mensagem: 'Campanha inexistente'})
    }

    const campanhaBuscada = await Campanha.findById(idCampanha);
  
    if (!campanhaBuscada) {
      res.status(404).json({sucesso: false, mensagem: 'Campanha inexistente ou encerrada'});
      return;
    }

    res.end(); 
  }
}
