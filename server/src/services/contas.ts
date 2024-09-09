// services/contas.ts 

interface IResultado {
  sucesso: boolean,
  mensagem?: string,
  dados?: object,
}

/**
 * Classe responsável por implementar a lógica de negócios de serviços
 * relacionados à contas (Doador e Voluntario), é chamada pelas classes
 * controladoras. Interage com os models necessários.
 * @class
 */
export default class ServicoContas {

  /**
  * Gera um novo token de acesso, com o payload passado pelo parâmetro 
  * @param {any} _usuario - objeto com todas as informações de usuário,
  * incluindo email, tipo e id
  * @returns {string} - token assinado para garantir acesso à rotas
  * protegidas
  */
  static gerarToken(_usuario: any): string {
    return '';
  }

  /**
  * Cadastra Doador ou retorna mensagem de porque não foi cadastrado
  * @param {any} _dados - objeto com todos os dados exigidos para a
  * criação de novo Doador, já no validados de acordo com o respectivo
  * formato exigido.
  * @returns {IResultado} - objeto que contém os dados gerados pela
  * criação de usuário, em caso de sucesso, ou apenas uma mensagem
  * explicando o impedimento, em caso de fracasso.
  * @throws {any} - exceção que representa qualquer erro inesperado
  * (erros que resultariam em código 500).
  */
  private static cadastrarDoador(_dados: any): IResultado {
    return {sucesso: false}; 
  }

  /**
  * Cadastra Voluntario ou retorna mensagem de porque não foi cadastrado
  * @param {any} _dados - objeto com todos os dados exigidos para a
  * criação de novo Voluntario, já no validados de acordo com o respectivo
  * formato exigido.
  * @returns {IResultado} - objeto que contém os dados gerados pela
  * criação de usuário, em caso de sucesso, ou apenas uma mensagem
  * explicando o impedimento, em caso de fracasso.
  * @throws {any} - exceção que representa qualquer erro inesperado
  * (erros que resultariam em código 500).
  */
  private static cadastrarVoluntario(_dados: any): IResultado {
    return {sucesso: false}; 
  }

  /**
  * Cadastra usuário ou retorna mensagem de porque não foi cadastrado.
  * @param {'doador' | 'voluntario'} _tipo - indica o tipo de usuário
  * que será criado.
  * @param {any} _dados - objeto com todos os dados exigidos para a
  * criação de novo usuário especificado pelo tipo, já no validados
  * de acordo com o respectivo formato exigido.
  * @returns {IResultado} - objeto que contém os dados gerados pela
  * criação de usuário, em caso de sucesso, ou apenas uma mensagem
  * explicando o impedimento, em caso de fracasso.
  * @throws {any} - exceção que representa qualquer erro inesperado
  * (erros que resultariam em código 500).
  */
  static cadastrar(_tipo: 'doador' | 'voluntario', _dados: any): IResultado {
    return {sucesso: false} 
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
  static login(email: string, senha: string): IResultado {
    return {sucesso: false}
  }
}
