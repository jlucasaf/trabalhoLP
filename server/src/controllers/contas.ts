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
   * da requisição conterá as propriedades 'tipo' e 'dados', sendo que tipo
   * deve especificar se o usuario é um 'doador' ou 'voluntario', e dados contém
   * todos os dados exigidos para criar um novo usuário, já validados em questão de formato
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
    const dadosUsuario = req.body.dados;
    const tipoUsuario = req.body.tipo;

    let novoUsuario: any; 

    if (tipoUsuario === 'doador') {
      novoUsuario = new Doador(dadosUsuario);
    } else if (tipoUsuario === 'voluntario') {
      novoUsuario = new Voluntario(dadosUsuario)
    } else {
      res.status(400).json({sucesso: false, mensagem:'Tipo de usuário inválido'});
      return;
    }

    let corpoResposta: object;

    const emailExistente = await Doador.findOne({ email: dadosUsuario.email }) || 
      await Voluntario.findOne({ email: dadosUsuario.email });

    if (emailExistente) {
      res.status(400).json({
        sucesso: false,
        mensagem: 'Endereço de email já cadastrado',
      });
      return;
    }

    try {
      const usuarioSalvo = await novoUsuario.save()

      corpoResposta = {
        sucesso: true,
        mensagem: 'Doador cadastrado com sucesso',
        dados: {
          token: ControladoraContas.novoToken(usuarioSalvo, tipoUsuario),
          usuario: {
            id: usuarioSalvo.id,
            tipo: tipoUsuario, 
            email: usuarioSalvo.email,
          }
        },
      };

      res.status(200).json(corpoResposta);
      return;
    } catch (error) {
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

    const processarLogin = (usuario: any, tipo: string) => {
      const senhaCorreta: boolean = compareSync(dadosLogin.senha, usuario.senha);

      if (!senhaCorreta) {
        res.status(400).json({sucesso: false, mensagem: 'Senha incorreta'});
        return;
      }

      const corpoResposta = {
        sucesso: true,
        mensagem: `${tipo} autenticado com sucesso`,
        dados: {
          token: ControladoraContas.novoToken(doadorEncontrado, 'Doador'),
          usuario: {
            id: usuario.id,
            tipo: tipo, 
            email: usuario.email,
          }
        },
      };

      res.status(200).json(corpoResposta);
      return;
    }

    const doadorEncontrado = await Doador.findOne({email:dadosLogin.email});
    if (doadorEncontrado) return processarLogin(doadorEncontrado, 'doador');

    const voluntarioEncontrado = await Voluntario.findOne(dadosLogin);
    if (voluntarioEncontrado) return processarLogin(voluntarioEncontrado, 'voluntario');

    res.status(400).json({sucesso: false, mensagem:'Endereço de email não cadastrado'});
    return;
  }
}
