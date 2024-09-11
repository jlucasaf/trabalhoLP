import { sign } from "jsonwebtoken";
import { segredoToken } from "../config/config";
import { compareSync } from "bcryptjs";
import Doador from "../models/doadorModel";
import Voluntario from "../models/voluntarioModel";

interface IResultado {
  sucesso: boolean;
  mensagem?: string;
  dados?: any;
}

/**
 * Gera um novo token de acesso, com o payload passado pelo parâmetro 
 * @param {any} usuario - objeto com todas as informações de usuário,
 * incluindo email, tipo e id
 * @returns {string} - token assinado para garantir acesso à rotas
 * protegidas
 */
function gerarToken(usuario: any): string {
  const dadosUsuario = {
    tipo: usuario.tipo,
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };

  return sign(dadosUsuario, segredoToken);
}

/**
 * Cadastra usuário ou retorna mensagem de porque não foi cadastrado.
 * @param {'doador' | 'voluntario'} tipo - indica o tipo de usuário
 * que será criado.
 * @param {any} dados - objeto com todos os dados exigidos para a
 * criação de novo usuário especificado pelo tipo, já no validados
 * de acordo com o respectivo formato exigido.
 * @returns {IResultado} - objeto que contém os dados gerados pela
 * criação de usuário, em caso de sucesso, ou apenas uma mensagem
 * explicando o impedimento, em caso de fracasso.
 * @throws {any} - exceção que representa qualquer erro inesperado
 * (erros que resultariam em código 500).
 */
async function cadastrar(tipo: 'doador' | 'voluntario', dados: any): Promise<IResultado> {
  /** Verifica se email já está sendo usado */
  const usuarioConflito = await Doador.findOne({ email: dados.email }) || 
    await Voluntario.findOne({ email: dados.email });

  if (usuarioConflito) {
    return { sucesso: false, mensagem: 'Endereço de email já cadastrado' };
  }

  const modelo = (tipo === 'doador') ? Doador : Voluntario;

  const novoUsuario = new modelo(dados);

  const usuarioCadastrado = await novoUsuario.save();
  
  const resultado: IResultado = {
    sucesso: true,
    dados: {
      tipo: tipo,
      id: usuarioCadastrado.id,
      nome: usuarioCadastrado.nome,
      email: usuarioCadastrado.email,
    },
  };

  return resultado;
}

/**
 * Efetua login de usuário (Doador ou voluntário) e retorna token em caso
 * de sucesso
 * @param {string} email - email do usuário que deseja autenticar
 * @param {string} senha - senha do usuário que deseja autenticar
 * @returns {IResultado} - em caso de sucesso, 'dados' contem o token
 * gerado para a autenticação, e em caso de fracasso, contém mensagem
 * que explica o impedimento (email ou senha inválidos)
 * @throws {any} - exceção que representa qualquer erro inesperado
 * (erros que resultariam em código 500).
 */
async function login(email: string, senha: string): Promise<IResultado> {
  let usuarioEncontrado: any;
  let tipoUsuario: 'doador' | 'voluntario';

  /** Buscando nos dois tipos de usuário */
  const doadorEncontrado = await Doador.findOne({ email });
  const voluntarioEncontrado = await Voluntario.findOne({ email });

  /** Verifica se é um dos dois ou nenhum */
  if (doadorEncontrado) {
    usuarioEncontrado = doadorEncontrado;
    tipoUsuario = 'doador';
  } else if (voluntarioEncontrado) {
    tipoUsuario = 'voluntario';
    usuarioEncontrado = voluntarioEncontrado;
  } else {
    return { sucesso: false, mensagem: 'Endereço de email não cadastrado' };
  }

  const senhaCorreta: boolean = compareSync(senha, usuarioEncontrado.senha);

  if (!senhaCorreta) {
    return { sucesso: false, mensagem: 'Senha incorreta' };
  }
  
  const usuario = {
    id: usuarioEncontrado.id,
    tipo: tipoUsuario,
    nome: usuarioEncontrado.nome,
    email: usuarioEncontrado.email,
  };

  return { sucesso: true, dados: usuario };
}

export default {
  gerarToken,
  cadastrar,
  login,
};
