import { IApiResponse } from "./IApiResponse";

interface ICampanhaInfo {
    id: string,
    titulo: string,
    descricao: string,
    local: string,
    voluntario: string,
    dataFinal: string,
}

interface IDoacaoInfo {
  id: string,
  local: string,
  data: string,
  campanha: string,
  status: string,
}

export interface IListaCampanhas extends IApiResponse {
    dados: ICampanhaInfo[]
}

export interface IListaDoacoes extends IApiResponse {
    dados: IDoacaoInfo[]
}
