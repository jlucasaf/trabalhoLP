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

const ControladoraDoacoes = {
  criar,
}

export default ControladoraDoacoes;
