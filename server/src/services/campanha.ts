/** services/doacao.ts */

import mongoose from "mongoose";
import Campanha from "../models/campanhaModel";

interface IResultado {
  sucesso: boolean,
  mensagem?: string,
  dados?: any,
}


/**
 * Função para criar uma nova campanha.
 * @param {any} dadosCriacao - objeto que contém informações
 * necessárias para criar uma nova Campanha, já nos seus respectivos
 * formatos validados. (titulo, descrição, local, datafinal)
 * @param {string} idUsuario - identificador do usuário que está
 * iniciando a Doacao. É um id válido do mongoose.
 * @returns {IResultado} - objeto com as informações sobre o resultado
 * do processamento da doação
 * @throws erro - erro em caso de exceção inesperada (erro interno do servidor)
 */
async function criar(dadosCriacao: any, idUsuario: string): Promise<IResultado> {
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

/**
 * Função para listar campanhas recentes para o Doador
 * @returns {Promise<IResultado>} - lista com campanhas recentes 
 * para o usuário poder ver detalhes e escolher ou não doar
 * @throws erro - erro em caso de exceção inesperada (erro interno do servidor)
 */
async function listarRecentes(): Promise<IResultado> {
  const campanhasRecentes = await Campanha.find()
                                          .sort({ _id: -1 })
                                          .limit(10)
                                          .populate('id_voluntario', 'nome');

  const dados = campanhasRecentes.map((campanha) => ({
    id: campanha.id,
    titulo: campanha.titulo,
    local: campanha.local,
    voluntario: (campanha.id_voluntario as any).nome,
    dataFinal: campanha.dataFinal.toISOString(),
  }));

  return { sucesso: true, dados }; 
}

const ServicoCampanha = {
  criar,
  listarRecentes,
}

export default ServicoCampanha
