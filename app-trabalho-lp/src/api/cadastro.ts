import { ICadastroResponse, ICadastroUsuario } from '../interfaces/ICadastroUsuario';
import axios from 'axios';

export const cadastrar = async (data: ICadastroUsuario) => {
    try {
        const response = await axios.post<ICadastroResponse>("http://localhost:3000/api/cadastrar", data);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        throw error;
    }
}
