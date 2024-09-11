import { ILoginResponse, ILoginUsuario } from "@/interfaces/ILoginUsuario";
import api from ".";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IListaCampanhas, IListaDoacoes } from "@/interfaces/IDadosHomePage";

export const campanhas = async () => {
  try {
    // Usa a instância da API configurada com o interceptor
    const response = await api.get<IListaCampanhas>("/campanhas");
    const { sucesso, dados } = response.data;

    if (!sucesso) {
      return [];
    }

    return dados;
  } catch (error) {
    console.error('Erro ao obter campanhas:', error);
    throw error;
  }
};


export const doacoesDoador = async () => {
  try {
    // Usa a instância da API configurada com o interceptor
    const response = await api.get<IListaDoacoes>("/doacoes");
    const { sucesso, dados } = response.data;

    if (!sucesso) {
      return [];
    }

    return dados;
  } catch (error) {
    console.error('Erro ao obter campanhas:', error);
    throw error;
  }
};
