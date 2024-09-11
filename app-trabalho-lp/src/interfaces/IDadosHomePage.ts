import { IApiResponse } from "./IApiResponse";

interface ICampanhInfo {
    id: string,
    titulo: string,
    descricao: string,
    local: string,
    voluntario: string,
    dataFinal: string,
}

export interface IListaCampanhas extends IApiResponse {
    dados: ICampanhInfo[]
}
