import { Request, Response } from 'express';
import ServicoCampanha from '../services/campanha';

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
 * @param {Response} res - resposta do express.
 * O corpo deve conter um objeto que possui as propriedades 
 * {sucesso:boolean, mensagem?:string, dados?:object}
 */
async function listar(req: Request, res: Response) {
  const user = req.usuario!;
  
  try {
    if (user.tipo === 'doador') {
      const resultadoBusca = await ServicoCampanha.listarRecentes();
      const corpoResposta = {
        sucesso: true,
        mensagem: `Listando doações recentes: ${resultadoBusca.dados.lenght}`,
        dados: resultadoBusca.dados, 
      }
      return res.status(200).json(corpoResposta);
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({sucesso: false,
                                  mensagem: 'Um erro inesperado aconteceu'});
  } 
}

/**
 * Função para acompanhar uma campanha específica
 * @param {Request} req - objeto de requisição do express.
 * req.user deve estar presente, req.params.idCampanha está presente
 * @param {Response} res - resposta do express.
 * O corpo deve conter um objeto que possui as propriedades 
 * {sucesso:boolean, mensagem?:string, dados?:object}
 */
async function acompanhar(req: Request, res: Response) {
  // Implementação necessária
}

const ControladoraCampanha = {
  criar,
  listar,
  acompanhar,
};

export default ControladoraCampanha;

