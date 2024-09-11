export interface ILoginResponse {
    sucesso: boolean;
    mensagem: string;
    dados?: {
      token: string;
    }
}

export interface ILoginUsuario {
    email: string;
    senha: string;
}
