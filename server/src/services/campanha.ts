// services/doacao.ts 

interface IResultado {
  sucesso: boolean,
  mensagem?: string,
  dados?: object,
}

/**
 * ServicoCampanha implementa a lógica de negócios relacionada
 * às campanhas. É uma classe que deve ser usada pelas controladoras
 * @class
*/
export default class ServicoCampanha {
  /**
  * Método para criar uma nova campanha.
  * @param {any} conteudo - objeto que contém todas as informações
  * necessárias para criar uma nova Campanha, já nos seus respectivos
  * formatos validados.
  * @param {string} idUsuario - identificador do usuário que está
  * iniciando a Doacao. 
  * @returns {IResultado} - objeto com as informações sobre o resultado
  * do processamento da doação
  * @throws erro - erro em caso de exceção inesperada (erro interno do servidor)
  */
  static criar(conteudo: any, idUsuario: string): IResultado {
    return {sucesso: false};
  }
}
