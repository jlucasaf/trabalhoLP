import {Request, Response} from 'express'
import { sign } from 'jsonwebtoken';
import { segredoToken } from '../config/config';

/**
 * ControladoraContas é uma classe responsável por gerenciar as operações de contas,
 * como cadastro, login, etc. Trabalha com Doador ou Voluntario dependendo de qual
 * modelo foi passado como parâmetro no construtor
 * @class
 */
export default class ControladoraContas {
  private modelo: any;
  private nomeModelo: string;

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
  

  private novoToken(usuario: any) {
    const dadosUsuario = {
      tipo: this.nomeModelo,
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

    const usuarioSalvo = await novoUsuario.save()

    const corpoResposta = {
      sucesso: true,
      mensagem: 'Doador cadastrado com sucesso',
      dados: {
        token: this.novoToken(usuarioSalvo),
        usuario: {
          id: usuarioSalvo.id,
          tipo: usuarioSalvo.tipo, 
          email: usuarioSalvo.email,
        }
      },
    };

    res.status(200).json(corpoResposta);
    return;
    
    // tenta: salvar novo usuario
    // se erro: se for 110000 (chave duplicada) retornar fracasso
    //          se for diverso, logar, retornar fracasso
    // se sucesso: retornar como descrito
  }

  /**
   * Método para logar em uma conta
   * @param {Request} req - Objeto de requisição do express. O corpo
   * da requisição conterá um objeto contendo o email e a senha do usuario
   * @param {Response} res = Objeto de resposta do Express. Chamado após a conclusão
   * da operação, pode ter campos {sucesso: bool, mensagem: string, dados?:}, além 
   * @returns {Promise<void>} promise que representa a conclusão ou não do login
   * > Em caso de email ou senha incorretos, 'mensagem' é 'Credenciais inválidas'
   * > Em caso de erros diversos (ex: bd), mensagem é 'Um erro inesperado aconteceu'
   * > Em caso de sucesso, 'mensagem' é '<Tipo Usuário> autenticado com sucesso', e o
   * 'dados' deve conter 'token' e 'usuario' ({com 'tipo', 'id' e 'email'})
   * > Status da resposta deve ser 200 mesmo em caso de login não completo
   */
  async login(req: Request, res: Response): Promise<void> {
    // ...
  }
}
