import { ILoginResponse, ILoginUsuario } from "@/interfaces/ILoginUsuario";
import api from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICadastroResponse, IDadosCadastroPassageiro } from "@/interfaces/ICadastroUsuario";

export const login = async (data: ILoginUsuario) => {
    try {
        const response = await api.post<ILoginResponse>("/login", data);
        console.log(response.data);
        const { sucesso, mensagem, dados } = response.data;
        if (sucesso) {
          await AsyncStorage.setItem('token', dados!.token);
        }
        return {sucesso, mensagem, dados};
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}

export const cadastro = async (data: IDadosCadastroPassageiro) => {
    try {
        const response = await api.post<ICadastroResponse>("/cadastrar", data);
        console.log(response.data);
        const { sucesso, mensagem, dados } = response.data;
        if (sucesso) {
          await AsyncStorage.setItem('token', dados!.token);
        }
        return {sucesso, mensagem, dados};
    } catch (error) {
        console.error('Erro ao fazer cadastro:', error);
        throw error;
    }
}

