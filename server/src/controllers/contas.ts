import { Request, Response } from 'express';
import ServicoContas from '../services/contas';

/**
 * Função para cadastrar uma nova conta (Usuário ou Doador)
 * @param {Request} req - Objeto de requisição do express. O corpo
 * da requisição conterá as propriedades 'tipo' e 'dados', sendo que tipo
 * deve especificar se o usuário é um 'doador' ou 'voluntario', e dados contém
 * todos os dados exigidos para criar um novo usuário, já validados em questão de formato
 * @param {Response} res - Objeto de resposta do Express. Chamado após a conclusão
 * da operação, pode ter campos {sucesso: bool, mensagem: string, dados?:}, além 
 * > Em caso de email já cadastrado, 'mensagem' é 'Endereço de email já cadastrado'
 * > Em caso de erros diversos (ex: bd), mensagem é 'Um erro inesperado aconteceu'
 * > Em caso de sucesso, 'mensagem' é '<Tipo Usuário> cadastrado com sucesso', e o
 * 'dados' deve conter 'token' e 'usuario' ({com 'tipo', 'id' e 'email'})
 * > Status da resposta deve ser 200 mesmo em caso de cadastro não completo
 */
async function cadastrar(req: Request, res: Response) {
  const dadosUsuario = req.body.dados;
  const tipoUsuario = req.body.tipo;
  let corpoResposta: any = {};

  try {
    if (dadosUsuario === undefined) {
      console.log("req.body.dados é indefinido, como?");
    }
    const cadastro = await ServicoContas.cadastrar(tipoUsuario, dadosUsuario);
    corpoResposta.sucesso = cadastro.sucesso;

    if (!cadastro.sucesso) {
      corpoResposta.mensagem = cadastro.mensagem;
      return res.status(200).json(corpoResposta);
    }

    corpoResposta.mensagem = 'Usuário cadastrado com sucesso';

    const tokenAcesso = ServicoContas.gerarToken(cadastro.dados);

    corpoResposta.dados = { token: tokenAcesso, usuario: cadastro.dados };
  } catch (error) {
    return res.status(500).json({ sucesso: false, mensagem: 'Um erro inesperado aconteceu' });
  }

  return res.status(201).json(corpoResposta);
};

/**
 * Função para logar em uma conta
 * @param {Request} req - Objeto de requisição do express. O corpo
 * da requisição conterá um objeto contendo o email e a senha do usuário
 * @param {Response} res - Objeto de resposta do Express. Chamado após a conclusão
 * da operação, pode ter campos {sucesso: bool, mensagem: string, dados?:}, além 
 * > Em caso de email incorreto, 'mensagem' será 'Endereço de email não cadastrado'
 * > Em caso de senha incorreta, 'mensagem' será 'Senha incorreta'
 * > Em caso de erros diversos (ex: bd), mensagem é 'Um erro inesperado aconteceu'
 * > Em caso de sucesso, 'mensagem' é '<Tipo Usuário> autenticado com sucesso', e o
 * 'dados' deve conter 'token'
 * > Status da resposta deve ser 200 mesmo em caso de login não completo
 */
async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  let corpoResposta: object;

  if (!email || !senha) {
    corpoResposta = {
      sucesso: false,
      mensagem: 'Endereço de email e senha são necessários para o login',
    };
    return res.status(400).json(corpoResposta);
  }

  const resultadoLogin = await ServicoContas.login(email, senha);

  if (!resultadoLogin.sucesso) {
    corpoResposta = {
      sucesso: false,
      mensagem: resultadoLogin.mensagem,
    };
    return res.status(400).json(corpoResposta);
  }

  const token: string = ServicoContas.gerarToken(resultadoLogin.dados);

  corpoResposta = {
    sucesso: true,
    mensagem: 'Usuário autenticado com sucesso',
    dados: {
      token,
    },
  };

  return res.status(200).json(corpoResposta);
};

const ControladoraContas = {
  cadastrar,
  login,
}

export default ControladoraContas;
