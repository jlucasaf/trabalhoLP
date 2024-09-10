import { NextFunction, Request, Response } from 'express';
import { esquemaNovaDoacao } from '../utils/esquemasJoi';


const validaNovaDoacao = function (req: Request, res: Response, next: NextFunction) {

  const {tipo} = req.usuario!
  if (tipo != 'doador') {
    return res.status(401).json({sucesso: false, mensagem: 'Recurso não autorizado'});
  }

  const dadosNovaDoacao = req.body;


  if (!dadosNovaDoacao) {
    return res.status(400).json({sucesso: false, mensagem: 'Dados ausentes'});
  }


  const { error } = esquemaNovaDoacao.validate(dadosNovaDoacao, { abortEarly: false });

  if (error) {
    const corpoResposta = {
      sucesso: false,
      mensagem: `Dados inválidos para nova doação`,
      detalhes: error.details.map(detalhe => detalhe.message),
    };
    return res.status(400).json(corpoResposta);
  }

  next();
};

export default validaNovaDoacao;
