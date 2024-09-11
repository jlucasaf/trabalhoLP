import { NextFunction, Request, Response } from 'express';
import { esquemaDoador, esquemaVoluntario } from '../utils/esquemasJoi';

const validaNovoUsuario = function (req: Request, res: Response, next: NextFunction) {

  const tipoUsuario = req.body.tipo;
  const novoUsuario = req.body.dados;

  if (!novoUsuario || (tipoUsuario != 'doador') && (tipoUsuario != 'voluntario')) {
    return res.status(400).json({sucesso: false, mensagem: 'Dados ausentes'});
  }

  const esquemaUsuario = tipoUsuario === 'doador' ? 
    esquemaDoador : esquemaVoluntario; 

  const { error } = esquemaUsuario.validate(novoUsuario, { abortEarly: false });

  if (error) {
    const corpoResposta = {
      sucesso: false,
      mensagem: `Dados inválidos para novo ${tipoUsuario}`,
      detalhes: error.details.map(detalhe => detalhe.message),
    };
    return res.status(400).json(corpoResposta);
  }

  next();
};

export default validaNovoUsuario;
