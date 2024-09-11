import { IApiResponse } from "./IApiResponse";

export interface ILoginResponse extends IApiResponse {
    dados?: {
      token: string;
    }
}

export interface ILoginUsuario {
    email: string;
    senha: string;
}
