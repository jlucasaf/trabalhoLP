import { Request, Response } from 'express';
import ServicoCampanha from '../services/campanha';
import ServicoDoacoes from '../services/doacoes';

/**
 * Função para criar uma nova campanha
 * @param {Request} req - objeto de requisição do express.
 * Possui um atributo 'usuario' preenchido, cujo tipo deve
 * ser 'voluntario'. O corpo contém os dados necessários
 * para criar a campanha, tais como titulo, descricao, local e data
 * @param {Response} res - resposta do express.
 * É chamada quando da conclusão da operação, o corpo
 * deve conter um objeto que possui as propriedades 
 * {sucesso:boolean, mensagem?:string, dados?:object}
 */
async function criar(req: Request, res: Response) {
  const idUsuario = req.usuario!.id;
  const dadosCampanha = req.body;

  try {
    const campanhaCriada = await ServicoCampanha.criar(dadosCampanha, idUsuario);

    if (!campanhaCriada.sucesso) {
      return res.status(200).json({
        sucesso: false,
        mensagem: campanhaCriada.mensagem,
      });
    }

    const corpoResposta = {
      sucesso: true,
      mensagem: 'Campanha iniciada com sucesso',
      dados: campanhaCriada.dados,
    };

    return res.status(201).json(corpoResposta);
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Um erro inesperado aconteceu',
    });
  }
}

/**
 * Função para listar as campanhas
 * @param {Request} req - objeto de requisição do express.
 * req.body não é utilizado, req.user deve conter usuário preenchido
 * req.usuario está preenchido com usuário Doador ou Voluntario
 * @param {Response} res - resposta do express.
 * O corpo deve conter um objeto que possui as propriedades 
 * {sucesso:boolean, mensagem?:string, dados?:object}
 *//*
 * > req.usuario é Doador ou Voluntario válido
 * > corpo de resposta deve:
 *  > para Doador: listar qualquer campanha recente
 *  > para Voluntario: listar as proprias campanhas
 */
async function listar(req: Request, res: Response) {
  const usuario = req.usuario!;
  
  try {
    const resultadoBusca =
      usuario.tipo == 'doador' ?
        await ServicoCampanha.listarRecentes() :
        await ServicoCampanha.listarPorVoluntario(usuario.id)

    const corpoResposta = {
      sucesso: true,
      mensagem: `Listando campanhas: ${resultadoBusca.dados.lenght}`,
      dados: resultadoBusca.dados, 
    }
    return res.status(200).json(corpoResposta);
  } catch (error) {
    return res.status(500).json({sucesso: false,
                                  mensagem: 'Um erro inesperado aconteceu'});
  } 
}

/**
 * Função para acompanhar uma campanha específica
 * @param {Request} req - objeto de requisição do express.
 * req.user deve estar presente, req.params.idCampanha está presente
 * req.params.idCampanha também está presente
 * @param {Response} res - resposta do express.
 * O corpo deve conter um objeto que possui as propriedades 
 * {sucesso:boolean, mensagem?:string, dados?:object}
 * Caso o usuário seja voluntário, deve retornar também uma lista de 
 * doações a caminho
 */
async function acompanhar(req: Request, res: Response) {
  const usuario = req.usuario!
  const idCampanha = req.params.idCampanha;

  try {
    const lerCampanha = await ServicoCampanha.ler(idCampanha);
    
    if (!lerCampanha.sucesso) {
      return res.status(404).json({sucesso: false,
                                   mensagem: lerCampanha.mensagem});
    }

    const dadosCampanha = lerCampanha.dados;
    const doacoesACaminho = (await ServicoDoacoes.listarPorCampanha(idCampanha)).dados;
    const usuarioCriouCampanha: boolean = dadosCampanha.id_voluntario === usuario.id;
    const dados = usuarioCriouCampanha ?
      {campanha: dadosCampanha, doacoesACaminho} :
      {campanha: dadosCampanha};


    return res.status(200).json({sucesso: true, 
                                 mensagem: 'Campanha lida com sucesso', dados});
  } catch (error) {
    return res.status(500).json({sucesso: false,
                                  mensagem: 'Um erro inesperado aconteceu'});
  }
}

const ControladoraCampanha = {
  criar,
  listar,
  acompanhar,
};

export default ControladoraCampanha;
