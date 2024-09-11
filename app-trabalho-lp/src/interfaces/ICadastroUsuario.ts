import { IApiResponse } from "./IApiResponse";

export interface ICadastroResponse extends IApiResponse {
    dados?: {
      token: string;
      usuario?: any;
    }
}

export interface IDadosCadastroPassageiro {
    tipo: string,
    dados: {
      nome: string;
      email: string;
      senha: string;
      CPF?: string;
      CNPJ?: string;
      local: string;
  }
}
