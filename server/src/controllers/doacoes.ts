import {Request, Response} from 'express'
import ServicoDoacoes from '../services/doacoes';

/**
  * Implementação da rota de criação de doação
  * @param {Request} req - request do express, contém req.body
  * que é equivalente aos dados necessários para criar a doação
  * já validados em seus respectivos formatos exigidos.
  * req.usuario deve ser do tipo 'doador'
  * @param {Response} res - chamado após o resultado da operação.
  * deve retornar no body o id da doação 
  * (que será usado para gerar o qrcode) em caso de sucesso.
  * Em caso de fracasso, retorna código e mensagem explicativa
  */
async function criar(req: Request, res: Response) {
  const idDoador = req.usuario!.id;
  try {
    const resultadoOperacao = await ServicoDoacoes.criar(req.body, idDoador);

    const corpoResposta = {
      sucesso: true,
      mensagem: 'Doação iniciada com sucesso',
      dados: {
        id: resultadoOperacao.dados.id
      },
    };

    return res.status(201).json(corpoResposta);

  } catch (error) {
    console.log(error);
    return res.status(500).json({sucesso: false, 
      mensagem: 'Um erro inesperado aconteceu ao tentar iniciar a doação'});
  }
}

/**
 * Função que lida com a confirmação da doação por parte do Voluntário
 * @param {Request} req - objeto de requisição do express
 * > req.usuario é um voluntario
 * > req.body.status contém o novo status que deve ser atribuído à 
 * doação
 * > req.param.idDoacao é uma doação que deve ser existente e 
 *   relacionada a uma campanha criada pelo Voluntario
 * > ... 
 * @param {Response} res - objeto de resposta do Express que deverá
 * ser chamado após o término do processamento da requisição.
 * > cód. 200 caso o status tenha sido atualizado
 * > cód. 304 em caso de não modificação por motivo conhecido
 * > cód. 500 por erro desconhecido
 */
async function atualizar(req: Request, res: Response) {
  //...
}

/**
  * Listagem de doações 
  * @param {Request} req - request do express, contém req.body,
  * e req.usuario
  * @param {Response} res - chamado após o resultado da operação.
  * deve retornar no body, dados que consistem numa lista de suas
  * doacoes recentes.
  */
async function listar(req: Request, res: Response) {
  if (req.usuario!.tipo != 'doador') {
    return res.status(401).json({sucesso: false, mensagem: 'Não autorizado'});
  }

  const idDoador = req.usuario!.id;

  try {
    const resultadoBusca = await ServicoDoacoes.listarPorDoador(idDoador);

    const corpoResposta = {
      sucesso: true,
      mensagem:  `Listando doações: ${resultadoBusca.dados.length}`,
      dados: resultadoBusca.dados,
    }
    return res.status(200).json(corpoResposta);
  } catch (error) {
    return res.status(200).json({sucesso: false,
      mensagem: 'Um erro inesperado aconteceu ao tentear listar as doações recentes'});
  }
}

const ControladoraDoacoes = {
  criar,
  listar,
  atualizar
}

export default ControladoraDoacoes;
