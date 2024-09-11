// src/interfaces/ICadastroUsuario.ts
export interface ICadastroUsuario {
    nome: string;
    email: string;
    senha: string;
}

export interface ICadastroResponse {
    success: boolean;
    message: string;
}
