import express, {Router} from "express";

const donationRouter: Router = express.Router();

// Faz uma nova doação 
donationRouter.route('/donate');
// Lê os detalhes da doação, confirma ou atualiza a localização (quando o usuario não é quem criou)
donationRouter.route('/:donationID');
// Mostra o histórico de doações do usuário
donationRouter.route('/donations');

export default donationRouter;
