// Modelos
import mongoose from "mongoose";
import Doacao from "../models/doacaoModel";
import Campanha from "../models/campanhaModel";
import Doador from "../models/doadorModel";

interface IResultado {
  sucesso: boolean,
  mensagem?: string,
  dados?: any,
}

/**
* Função para criar uma nova doação.
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

/** Função para listar doações criadas pelo Doador
 * @param {string} idDoador - uma string que é um id mongodb válido
 * @returns {Promise<IResultado>} - em dados, contém uma 
 * lista de campanhas criadas pelo usuário, ordenadas 
 * decrescentemente por id.
 * As informações de cada item da lista são id, titulo, descricao,
 * local, data
 * @throws erro - erro em caso de exceção inesperada (erro interno do servidor)
 *//*
 * > idDoador é um id válido mongodb, e certamente pertence à um Voluntario
 */
async function listarPorDoador(idDoador: string): Promise<IResultado> {
  const doacoesPorDoador = 
    await Doacao.find({id_doador: new mongoose.Types.ObjectId(idDoador)})
                                               .sort({_id: -1});
    
  const dados = doacoesPorDoador.map((doacao) => ({
    id: doacao.id,
    local: doacao.local,
    data: doacao.data.toISOString(),
  }));

  return { sucesso: true, dados }; 
}

/** Função para listar doações a caminho de uma campanha
 * @param {string} idCampanha - uma string que é um id mongodb válido
 * @returns {Promise<IResultado>} - em dados, contém uma 
 * lista de campanhas criadas pelo usuário, ordenadas 
 * decrescentemente por id.
 * As informações de cada item da lista são id, titulo, descricao,
 * local, data
 * @throws erro - erro em caso de exceção inesperada (erro interno do servidor)
 *//*
 * > idDoador é um id válido mongodb, e certamente pertence à um Voluntario
 */
async function listarPorCampanha(idCampanha: string): Promise<IResultado> {
  const doacoesPorCampanha = 
    await Doacao.find({ id_campanha: new mongoose.Types.ObjectId(idCampanha) })
                .sort({ _id: -1 });

  const dados = await Promise.all(doacoesPorCampanha.map(async (doacao) => {
    const doador = await Doador.findById(doacao.id_doador);
    return {
      nomeDoador: doador?.nome || 'Doador não encontrado',
      data: doacao.data.toISOString(),
    };
  }));
  return { sucesso: true, dados }; 
}


const ServicoDoacoes = {
  criar,
  listarPorDoador,
  listarPorCampanha
};

export default ServicoDoacoes;
