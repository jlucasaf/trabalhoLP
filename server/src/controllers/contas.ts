import {Request, Response} from 'express'
import { sign } from 'jsonwebtoken';
import { segredoToken } from '../config/config';
import Doador from '../models/doadorModel';
import Voluntario from '../models/voluntarioModel';
import { compareSync } from 'bcryptjs';

/**
 * ControladoraContas é uma classe responsável por gerenciar as operações de contas,
 * como cadastro, login, etc. Trabalha com Doador ou Voluntario dependendo de qual
 * modelo foi passado como parâmetro no construtor
 * @class
 */
export default class ControladoraContas {
  private modelo: any;
  private nomeModelo: string;
  private DUPLICATE_KEY_ERR = 11000;

  /**
   * Cria uma nova instância da controladora de contas.
   * 
   * @constructor
   * @param {any} modelo - O modelo de dados para a controladora (Doador ou Voluntario)
   * @param {string} nomeModelo - O nome do modelo para a controladora. Para ser impresso
   * nas mensagens customizadas
   */  
  constructor(modelo: any, nomeModelo: string) {
    this.modelo = modelo;
    this.nomeModelo = nomeModelo;
  }
  

  static novoToken(usuario: any, tipo: string) {
    const dadosUsuario = {
      tipo: tipo,
      id: usuario.id,
      email: usuario.email,
    }
    return sign(dadosUsuario, segredoToken);
  }

  /**
   * Método para cadastrar uma nova conta (Usuário ou Doador)
   * @param {Request} req - Objeto de requisição do express. O corpo
   * da requisição conterá um objeto correspondente aos atributos do 
   * novo usuário, os quais preenchidos e validados
   * @param {Response} res = Objeto de resposta do Express. Chamado após a conclusão
   * da operação, pode ter campos {sucesso: bool, mensagem: string, dados?:}, além 
   * @returns {Promise<void>} promise que representa a conclusão ou não do cadastro
   * > Em caso de email já cadastrado, 'mensagem' é 'Endereço de email já cadastrado'
   * > Em caso de erros diversos (ex: bd), mensagem é 'Um erro inesperado aconteceu'
   * > Em caso de sucesso, 'mensagem' é '<Tipo Usuário> cadastrado com sucesso', e o
   * 'dados' deve conter 'token' e 'usuario' ({com 'tipo', 'id' e 'email'})
   * > Status da resposta deve ser 200 mesmo em caso de cadastro não completo
   */
  async cadastrar(req: Request, res: Response): Promise<void> {
    // ...
    const dadosUsuario = req.body;

    const novoUsuario = new this.modelo(dadosUsuario);

    let corpoResposta: object;

    try {
      const usuarioSalvo = await novoUsuario.save()

      corpoResposta = {
        sucesso: true,
        mensagem: 'Doador cadastrado com sucesso',
        dados: {
          token: ControladoraContas.novoToken(usuarioSalvo, this.nomeModelo),
          usuario: {
            id: usuarioSalvo.id,
            tipo: this.nomeModelo, 
            email: usuarioSalvo.email,
          }
        },
      };

      res.status(200).json(corpoResposta);
      return;
    } catch (error: any) {
      if (error.code === this.DUPLICATE_KEY_ERR) {

        corpoResposta = {
          sucesso: false,
          mensagem: 'Endereço de email já cadastrado',
        };

        res.status(200).json(corpoResposta);
        return;
      }

      corpoResposta = {sucesso: false, mensagem:'Um erro inesperado ocorreu'};
      
      res.status(500).json(corpoResposta);
    }
    return;
  }

  /**
   * Método para logar em uma conta
   * @param {Request} req - Objeto de requisição do express. O corpo
   * da requisição conterá um objeto contendo o email e a senha do usuario
   * @param {Response} res = Objeto de resposta do Express. Chamado após a conclusão
   * da operação, pode ter campos {sucesso: bool, mensagem: string, dados?:}, além 
   * @returns {Promise<void>} promise que representa a conclusão ou não do login
   * > Em caso de email incorreto, 'mensagem' será 'Endereço de email não cadastrado'
   * > Em caso de senha incorreta, 'mensagem' será 'Senha incorreta'
   * > Em caso de erros diversos (ex: bd), mensagem é 'Um erro inesperado aconteceu'
   * > Em caso de sucesso, 'mensagem' é '<Tipo Usuário> autenticado com sucesso', e o
   * 'dados' deve conter 'token' e 'usuario' ({com 'tipo', 'id' e 'email'})
   * > Status da resposta deve ser 200 mesmo em caso de login não completo
   */
  static async login(req: Request, res: Response): Promise<void> {
    const dadosLogin = req.body;

    const doadorEncontrado = await Doador.findOne({email:dadosLogin.email});
    const voluntarioEncontrado = await Voluntario.findOne(dadosLogin);

    let token: string;
    let corpoResposta: object;

    if (doadorEncontrado) {

      const senhaCorreta: boolean = compareSync(dadosLogin.senha, doadorEncontrado.senha);
      
      if (!senhaCorreta) {
        res.status(400).json({sucesso:false, mensagem:'Senha incorreta'});
        return;
      }

    } else if (voluntarioEncontrado) {

      // ...

      token = ControladoraContas.novoToken(voluntarioEncontrado, 'Voluntario')
    } 
    
    corpoResposta = {
      sucesso: false,
      mensagem: 'Endereço de email não cadastrado'
    }

    res.status(400).json(corpoResposta);
    return;
  }
}
