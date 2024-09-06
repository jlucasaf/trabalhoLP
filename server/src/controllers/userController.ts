import { Request, Response } from "express";
import userValidation from "../utils/userValidation";
import User from "../models/userModel";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { compareSync } from "bcryptjs";

dotenv.config();

const DUPLICATE_KEY_ERR = 11000; // Código de erro do mongoDb
const access_token_secret = process.env.ACCESS_TOKEN_SECRET || "default";

export async function register(req: Request, res: Response) {
  const userData = req.body;
 
  // Valida o usuario usando o joi
  const {error} = userValidation.validate(userData);

  if (error) {
    return res.status(400).json({
      success: false, 
      message: 'Dados de usuário inválidos', 
      data: error.details
    });
  }

  const newUser = new User(userData)
  
  // Salva usuário se nenhum erro ocorre
  try {
    const savedUser = await newUser.save();
    
    const newUserToken = sign({id: savedUser.id, 
                              email: userData.email}, 
                              access_token_secret);
    
    return res.status(200).json({
      success:true,
      message:'Usuário criado com sucesso.', 
      token:newUserToken,
      user: {
        id: savedUser.id,
        nome: savedUser.nome,
        email: savedUser.email,
      }});

  } catch (error:any) {
    if (error.code === DUPLICATE_KEY_ERR) return res.status(400).json({
      success:false,
      message:'Endereço de email já cadastrado.'
    });
    return res.status(400).json({success: false, message: 'Um erro inesperado aconteceu'});
  } 
}

export async function login(req: Request, res: Response) {
  const {email, senha} = req.body;
  
  const foundUser = await User.findOne({email});

  if (!foundUser) {

    const responseBody = {success: false,
                          message: 'Endereço de email não cadastrado.'
                         };

    return res.status(401)
                .send(responseBody);
  }

  if (!compareSync(senha, foundUser.senha)) {
    const responseBody = {success: false, message: 'Senha incorreta.'};
    return res.status(401).send(responseBody);
  }

  console.log(foundUser.id)

  const accesToken: string = sign({id: foundUser.id, 
                                  email: email}, access_token_secret);

  const responseBody = {
    success: true,
    token: accesToken,
    user: {id: foundUser.id, email: email, nome: foundUser.nome}, 
    message: 'Usuário autenticado com sucesso.'
  }
  return res.status(200).json(responseBody);
}
