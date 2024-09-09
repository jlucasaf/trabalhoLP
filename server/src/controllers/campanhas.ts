import {Request, Response} from 'express'
import ServicoCampanha from '../services/campanha'

/**
 * ControladoraContas é uma classe responsável por gerenciar as requisições
 * feitas por um usuário autenticado como Voluntario, tais como acesso a
 * servicos de criação de campanhas e confirmação de doações
 * @class
 */
export default class ControladoraCampanha {
  /**
  * Método para criar uma nova campanha
  * @param {Request} req - objeto de requisição do express.
  * Possui um atributo 'usuario' preenchido, cujo tipo deve
  * ser 'voluntario'
  * O corpo contém os dados necessários para criar a campanha,
  * tais como titulo, descricao, local e data
  * @param {Response} res - resposta do express.
  * É chamada quando da conclusão da operação, o corpo
  * deve conter um objeto qeu possui as propriedades 
  * {sucesso:boolean, mensagem?:string, dados?:objet}
  *//*
  * > req possui dados necessarios para se criar uma campanha, já validados
  * em seu respectivo formato
  * > req é passada com um parametro 'usuario' preenchido (usuário está cadastrado)
  * > deve-se rejeitar o processo caso o usuário não seja um Voluntario
  * > deve-se passar dados da campanha para res
  */
  static async criar(req: Request, res: Response) {
    // ** 
  }

  /**
  * Método para listar as campanhas, no caso do voluntário,
  * a lista é das campanhas iniciadas por ele, e no caso 
  * do doador, de campanhas disponíveis para doação
  * @param {Request} req - objeto de requisição do express.
  * req.body não é utilizado
  * req.user deve conter usuário preenchido
  * @param {Response} res - resposta do express.
  * É chamada quando da conclusão da operação, o corpo
  * deve conter um objeto qeu possui as propriedades 
  * {sucesso:boolean, mensagem?:string, dados?:objet}
  *//*
  * > req.user está presente
  * > para res.body.dados, deverá ser passado
  *   > caso voluntario: apenas as campanhas por ele iniciadas,
  *   com numero de doações a caminho e doações recebidas
  *   > caso doador: campanhas para qual ele pode doar, separadas
  *   de campanhas para qual ele doou recentemente
  */
  static async listar(req: Request, res: Response) {
    // ** 
  }

  /**
  * Método para acompanhar uma campanha específica
  * @param {Request} req - objeto de requisição do express.
  * req.user deve estar presente
  * req.params.idCampanha está presente
  * @param {Response} res - resposta do express.
  * É chamada quando da conclusão da operação, o corpo
  * deve conter um objeto qeu possui as propriedades 
  * {sucesso:boolean, mensagem?:string, dados?:objet}
  *//*
  * > req.user está presente, req.params.idCampanha também
  * > para res.body.dados, deverá ser passado
  *   > caso voluntário: todos os dados da campanha, mais
  *     detalhes de doações a caminho
  *   > caso doador: todos os dados da campanha
  */
  static async acompanhar(req: Request, res: Response) {
    // ** 
  }
}


