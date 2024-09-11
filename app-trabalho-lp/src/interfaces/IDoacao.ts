import { IApiResponse } from "./IApiResponse";

export interface IDadosNovaDoacao {
  titulo: string,
  foto: boolean,
  id_campanha: string, 
}

export interface IRespostaNovaDoacao extends IApiResponse {
  dados?: {
    id: string;
  }
}


