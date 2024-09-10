/** services/doacao.ts */

interface IResultado {
  sucesso: boolean,
  mensagem?: string,
  dados?: object,
}

/**
 * ServicoDoacao implementa a lógica de negócios relacionada
 * às doaçẽos. É uma classe que deve ser usada pelas controladoras
 * @class
*/
export default class ServicoDoacao {
  /**
  * Método para criar uma nova doação.
  * @param {object} conteudo - objeto que contém todas as informações
  * necessárias para criar uma nova Doacao, já nos seus respectivos
  * formatos validados.
  * @param {string} idCampanha - identificador da campanha para qual 
  * vai a doação.
  * @param {string} idUsuario - identificador do usuário que está
  * iniciando a Doacao. 
  * @returns {IResultado} - objeto com as informações sobre o resultado
  * do processamento da doação
  * @throws erro - erro em caso de exceção inesperada (erro interno do servidor)
  */
  static criar(conteudo: object, idCampanha: string, 
                idUsuario: string): IResultado {
    return {sucesso: false};
  }
}
