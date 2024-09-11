import { ILoginResponse, ILoginUsuario } from "@/interfaces/ILoginUsuario";
import api from ".";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (data: ILoginUsuario) => {
    try {
        const response = await axios.post<ILoginResponse>("http://localhost:3000/api/login", data);
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
