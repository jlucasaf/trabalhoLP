import { promises as fs } from 'fs';
import path from 'path';
// Modelos
import mongoose from "mongoose";
import Doacao from "../models/doacaoModel";
import Campanha from "../models/campanhaModel";
import Doador from "../models/doadorModel";

interface IResultado {
  sucesso: boolean,
  mensagem?: string,
  codHttp?: number,
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


/**
 * Obtém os nomes dos arquivos que correspondem ao ID da doação.
 *
 * @param idDoacao - O ID da doação para filtrar os arquivos.
 * @returns Uma lista de nomes de arquivos que correspondem ao ID da doação.
 */
async function obterMidiaConfirmacao(idDoacao: string): Promise<string[]> {
    const diretorioUploads = path.join(__dirname, '../../uploads');

    try {
        const arquivos = await fs.readdir(diretorioUploads);

        const arquivosFiltrados = arquivos.filter(arquivo => arquivo.startsWith(idDoacao));

        return arquivosFiltrados;
    } catch (erro) {
        console.error('Erro ao ler o diretório:', erro);
        return [];
    }
}

/** Função para ler os dados de uma Doação
 * @param {string} idDoacao - uma string que representa o id da doação
 * @returns {Promise<IResultado>} - caso o id não seja válido, ou 
 * a doação não existir, irá retornar sucesso: false, caso contrário
 * 'dados' conterá todos os dados pertinentes para a doação:
 * foto, local, nomeCampanha, nomeDoador, idCampanha
 * @throws erro - erro em caso de exceção inesperada (erro interno do servidor)
 *//*
 * > não é garantido que idDoador seja um id mondogb válido
 */
async function ler(idDoacao: string): Promise<IResultado> {
  // verificando se é id válido
  if (!mongoose.Types.ObjectId.isValid(idDoacao)) {
    console.log(idDoacao);
    return {sucesso: false, mensagem: 'Id inválido', codHttp: 400}
  }

  const doacao = await Doacao.findById(idDoacao)
    .populate('id_campanha', 'titulo')
    .populate('id_doador', 'nome')
    .exec();

  if (!doacao) return {sucesso: false, 
    mensagem: 'Doação não encontrada', 
    codHttp: 404}

  const dados = {
    foto: doacao.foto,
    titulo: doacao.titulo,
    localizacao: doacao.local_atual || "Desconhecido",
    campanha: (doacao.id_campanha as any).titulo,
    id_campanha: (doacao.id_campanha as any)._id.toString(),
    nome_doador: (doacao.id_doador as any).nome,
    id_doador: (doacao.id_doador as any)._id.toString(),
    id_voluntario: doacao.id_voluntario.toString(),
    status: doacao.status,
    midia_confirmacao: await obterMidiaConfirmacao(idDoacao),
  }
  return {sucesso: true, dados}
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
    await Doacao.find({ id_doador: new mongoose.Types.ObjectId(idDoador) })
                .sort({ _id: -1 })
                .populate('id_campanha', 'titulo');

  const dados = doacoesPorDoador.map((doacao) => ({
    id: doacao.id,
    titulo: doacao.titulo,
    data: doacao.data.toISOString(),
    campanha: (doacao.id_campanha as any).titulo,
    status: doacao.status,
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

/**
 * Atualiza doação
 */
async function atualizar(idDoacao: string, dados: any): Promise<boolean> {
  const doacao = await Doacao.findByIdAndUpdate(idDoacao, dados, {new: true});
  return doacao?.status === dados.status;
}

const ServicoDoacoes = {
  criar,
  ler,
  listarPorDoador,
  listarPorCampanha,
  atualizar
};

export default ServicoDoacoes;
