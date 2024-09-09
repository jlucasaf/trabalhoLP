import { NextFunction, Request, Response } from 'express';
import { esquemaNovaCampanha } from '../utils/esquemasJoi';


const validaNovaCampanha = function (req: Request, res: Response, next: NextFunction) {
  const {tipo} = req.usuario!

  if (tipo != 'voluntario') {
    return res.status(401).json({sucesso: false, mensagem: 'Recurso não autorizado'});
  }

  const novaCampanha = req.body

  if (!novaCampanha) {
    return res.status(400).json({sucesso: false, mensagem: 'Dados ausentes'});
  }


  const { error } = esquemaNovaCampanha.validate(novaCampanha, { abortEarly: false });

  if (error) {
    const corpoResposta = {
      sucesso: false,
      mensagem: `Dados inválidos para nova campanha`,
      detalhes: error.details.map(detalhe => detalhe.message),
    };
    return res.status(400).json(corpoResposta);
  }

  next();
};

export default validaNovaCampanha;
