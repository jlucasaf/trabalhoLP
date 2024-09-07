declare namespace Express {
  export interface Request {
    usuario?: {
      tipo: "doador" | "voluntario";
      id: string;
      nome: string;
      email: string;
    };
  }
}

