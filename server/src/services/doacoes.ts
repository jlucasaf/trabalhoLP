// Modelos
import mongoose from "mongoose";
import Doacao from "../models/doacaoModel";
import Campanha from "../models/campanhaModel";

interface IResultado {
  sucesso: boolean,
  mensagem?: string,
  dados?: any,
}

/**
* Método para criar uma nova doação.
* @param {any} conteudo - objeto que contém todas as informações
* necessárias para criar uma nova Doacao, já nos seus respectivos
* formatos validados.
* @param {string} idDoador - identificador do Doador que está iniciando
* a doação, é um id válido do mongodb em string
* @returns {IResultado} - objeto com as informações sobre o resultado
* do processamento da doação
* @throws erro - erro em caso de exceção inesperada (erro interno do servidor)
*/
async function criar(conteudo: any, idDoador: string): Promise<IResultado> {
  const {foto, id_campanha} = conteudo; // garantido

  const campanha = await Campanha.findById(id_campanha);

  const novaDoacao = new Doacao({
    foto,
    local: campanha?.local,
    data: Date.now(),
    id_doador: new mongoose.Types.ObjectId(idDoador),
    id_voluntario: campanha?.id_voluntario,
    id_campanha: campanha?._id,
    status: 'em andamento',
  });

  const doacaoSalva = await novaDoacao.save();

  return {
    sucesso: true,
    dados: {
      id: doacaoSalva.id,
    }
  }
}

const ServicoDoacoes = {
  criar,
};

export default ServicoDoacoes;
