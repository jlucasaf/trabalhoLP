import { IRespostaNovaDoacao, IDadosNovaDoacao } from "@/interfaces/IDoacao";
import api from ".";

export const doar = async (data: IDadosNovaDoacao) => {
    try {
        const response = await api.post<IRespostaNovaDoacao>("/doacoes", data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao tentar doar:', error);
        throw error;
    }
}


