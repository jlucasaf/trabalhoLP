import { NextFunction, Request, Response } from 'express';
import ServicoDoacoes from '../services/doacoes';


/**
 * Middleware que checa se os dados de atualização de uma
 * Doação (atualizar local ou confirmar entrega) estão
 * corretamente preenchidos. E antes disso, se o usuário
 * tem autorização para prosseguir com a ação.
 * @param {Request} req - requisição, com 'usuario' válido, 
 * e deve conter 'body' com informações para atualização
 * da doação
 * @param {Response} res - chamada em caso de não prosseguimento
 * à operação de atualização de doação. 
 * @param {NextFunction} next - chamada caso haja prosseguimento
 *//*
 * > req.usuario é garantido
 * > req.usuario precisa ser o Voluntario associado à
 *   campanha em questão
 * > req.body deve conter informações para confirmação,
 * > req.files não pode estar vazio caso a doação exija foto 
 * > next não pode ser chamado caso essas restrições não
 *  sejam respeitadas
 */
const atualizaDoacao = async function (req: Request, res: Response, next: NextFunction) {
  const usuario = req.usuario!

  if (usuario.tipo != 'voluntario') {
    return res.status(401).json({sucesso: false, 
      mensagem: 'Não autorizado'});
  }

  if (!req.body.status) {
    return res.status(400).json({sucesso: false, 
      mensagem: 'Não autorizado'});
  }
  
  try {
    const buscaDoacao = await ServicoDoacoes.ler(req.params.idDoacao);

    if (!buscaDoacao.sucesso) {
      return res.status(buscaDoacao.codHttp || 400).json({
        sucesso: false,
        mensagem: buscaDoacao.mensagem,
      })
    }

    const dadosDoacao = buscaDoacao.dados;

    if (dadosDoacao.id_voluntario != usuario.id) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Não autorizado'
      }); 
    }
   
    if (!req.files && dadosDoacao.foto) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Foto é exigida'
      })
    }


    next();

  } catch (error) {
    return res.status(500).json({sucesso: false, 
      mensagem: 'Um erro inesperado aconteceu'});
  }
}
export default atualizaDoacao;
