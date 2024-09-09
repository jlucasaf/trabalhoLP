import {Request, Response} from 'express'
import { sign } from 'jsonwebtoken';
import { segredoToken } from '../config/config';
import Doador from '../models/doadorModel';
import Voluntario from '../models/voluntarioModel';
import Doacao from '../models/doacaoModel';
import { compareSync } from 'bcryptjs';
import mongoose from 'mongoose';
import ServicoContas from '../services/contas';

/**
 * ControladoraContas é uma classe responsável por gerenciar as operações de contas,
 * como cadastro, login, etc. Trabalha com Doador ou Voluntario dependendo de qual
 * modelo foi passado como parâmetro no construtor
 * @class
 */
export default class ControladoraContas {
  /**
   * Método para gerar o token de acesso do usuário
   * @param {any} usuario - é o usuário que está acessando,
   * o objeto terá todos os atributos de um Doador ou Voluntario
   * @param {string} tipo - é o tipo do usuário (doador | voluntario)
   * @returns {string} token - é o json web token de acesso do usuário
   * > Deve conter as informações de tipo, id, nome e email
   */
  static novoToken(usuario: any, tipo: "doador" | "voluntario"): string {
    const dadosUsuario = {
      tipo: tipo,
      id: usuario.id,
      nome: usuario.nome,
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
   * > Em caso de email já cadastrado, 'mensagem' é 'Endereço de email já cadastrado'
   * > Em caso de erros diversos (ex: bd), mensagem é 'Um erro inesperado aconteceu'
   * > Em caso de sucesso, 'mensagem' é '<Tipo Usuário> cadastrado com sucesso', e o
   * 'dados' deve conter 'token' e 'usuario' ({com 'tipo', 'id' e 'email'})
   * > Status da resposta deve ser 200 mesmo em caso de cadastro não completo
   */
  static async cadastrar(req: Request, res: Response) {
    const dadosUsuario = req.body.dados;
    const tipoUsuario = req.body.tipo;
    let corpoResposta: any = {};

    try {
      if (dadosUsuario === undefined) console.log("req.body.dados é indefinido, como?");
      const cadastro = await ServicoContas.cadastrar(tipoUsuario, dadosUsuario); 
      corpoResposta.sucesso = cadastro.sucesso;
    
      if (!cadastro.sucesso) {
        corpoResposta.mensagem = cadastro.mensagem;
        return res.status(200).json(corpoResposta)
      }

      corpoResposta.mensagem = 'Usuário cadastrado com sucesso';

      const tokenAcesso = ServicoContas.gerarToken(cadastro.dados);

      corpoResposta.dados = {token:tokenAcesso, usuario: cadastro.dados};
    } catch (error) {
      return res.status(500).json({sucesso: false, mensagem: 'Um erro inesperado aconteceu'});
    }

    return res.status(201).json(corpoResposta);
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
          token: ControladoraContas.novoToken(doadorEncontrado, 'doador'),
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

  /**
   * Método para obter dados que serão exibidos na tela inicial de um usuario doador
   * @param {Request} req - Objeto de requisição do express. O objeto terá um um parâmetro
   * 'usuario', fornecido pelo middleware de autenticação
   * @param {Response} res = Objeto de resposta do Express. Chamado após a conclusão
   * da operação, pode ter campos {sucesso: bool, mensagem: string, dados?:}
   */
  /* > Deve exibir as doações recentes do usuário
   * > ...
  */
  static async home(req: Request, res: Response) {
    const usuario = req.usuario;
    let corpoResposta: object;

    if (usuario?.tipo == 'doador') {
      const doacoesRecentes = await Doacao.find({
        id_doador: new mongoose.Types.ObjectId(usuario.id)
      }).sort({data: -1});

      const recentes = doacoesRecentes.map(doacao => ({
        id: doacao._id,
        local: doacao.local
      }))

      corpoResposta = {
        sucesso: true,
        dados: {
          recentes: recentes
        }
      }

      return res.status(200).json(corpoResposta);
    }
    res.end();
  }
}
