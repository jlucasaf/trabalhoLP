// services/doacao.ts 

import mongoose from "mongoose";
import Campanha from "../models/campanhaModel";

interface IResultado {
  sucesso: boolean,
  mensagem?: string,
  dados?: object,
}

/**
 * ServicoCampanha implementa a lógica de negócios relacionada
 * às campanhas. É uma classe que deve ser usada pelas controladoras
 * @class
*/
export default class ServicoCampanha {
  /**
  * Método para criar uma nova campanha.
  * @param {any} dadosCriacao - objeto que contém informações
  * necessárias para criar uma nova Campanha, já nos seus respectivos
  * formatos validados. (titulo, descrição, local, datafinal)
  * @param {string} idUsuario - identificador do usuário que está
  * iniciando a Doacao. É um id válido do mongoose.
  * @returns {IResultado} - objeto com as informações sobre o resultado
  * do processamento da doação
  * @throws erro - erro em caso de exceção inesperada (erro interno do servidor)
  */
  static async criar(dadosCriacao: any, idUsuario: string): Promise<IResultado> {
    const novaCampanha = new Campanha({
      ...dadosCriacao,
      id_voluntario: new mongoose.Types.ObjectId(idUsuario),
    })
    
    const campanhaRegistrada = await novaCampanha.save();

    return {
      sucesso: true,
      dados: {
        id: campanhaRegistrada.id,
      },
    };
  }
};
