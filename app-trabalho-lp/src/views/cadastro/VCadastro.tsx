import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { tema } from '@/theme';
import { router } from 'expo-router';
import DoaMeBotao from '@/components/DoaMeBotao';
import DoaMeInput from '@/components/DoaMeInput';
import { formatarDocumento, formatarNome } from '@/utils/formatadores';

type IDadosCadastroPassageiro = {
    cpfOuCnpj: string,
    endereco: string,
    nome: string,
    tipoUsuario: string,
    email: string,
    senha: string
}

export default function VCadastro() {
    const [dadosCadastro, setDadosCadastro] = useState<IDadosCadastroPassageiro>({
        cpfOuCnpj: "",
        nome: "",
        email: "",
        endereco: "",
        tipoUsuario: "",
        senha:"",
        
    });
    return (
        <View style={styles.container}>
            <View style={styles.voltarBotaoContainer}>
                <Pressable onPress={() => router.back()}>
                    <FontAwesome name='chevron-left' size={24} color={tema.cores.rosa[500]} />
                </Pressable>
            </View>
            <View style={styles.tituloContainer}>
                <View></View>
                <Text style={styles.titulo}>Cadastre-se</Text>
                <View></View>
            </View>
            <View style={styles.dadosUsuarioContainer}>
                <DoaMeInput
                    placeholder="Nome completo"
                    inputMode="text"
                    onChangeText={(value) => setDadosCadastro({ ...dadosCadastro, nome: formatarNome(value) })}
                    cor="preto"
                    value={dadosCadastro.nome}
                />
                <DoaMeInput
                    placeholder="Email"
                    inputMode="email"
                    onChangeText={(value) => setDadosCadastro({ ...dadosCadastro, email: value })}
                    value={dadosCadastro.email}
                    cor="preto" />
                <DoaMeInput
                    placeholder="Senha"
                    inputMode="text"
                    onChangeText={(value) => setDadosCadastro({ ...dadosCadastro, senha: value })}
                    value={dadosCadastro.senha}
                    cor="preto" />
                <DoaMeInput
                    placeholder="Endereço"
                    inputMode="text"
                    onChangeText={(value) => setDadosCadastro({ ...dadosCadastro, endereco: value })}
                    value={dadosCadastro.endereco}
                    cor="preto" />
                <DoaMeInput
                    placeholder="Tipo de usuário"
                    inputMode="text"
                    onChangeText={(value) => setDadosCadastro({ ...dadosCadastro, tipoUsuario: formatarNome(value) })}
                    value={dadosCadastro.tipoUsuario}
                    cor="preto" />
                <DoaMeInput
                    placeholder="CPF/CNPJ"
                    inputMode="text"
                    onChangeText={(value) => setDadosCadastro({ ...dadosCadastro, cpfOuCnpj: formatarDocumento(value) })}
                    value={dadosCadastro.cpfOuCnpj}
                    cor="preto" />

            </View>

            <View style={styles.botaoCadastrarContainer}>
                <DoaMeBotao
                    tipo="rosa"
                    titulo='Cadastre-se'
                    onPress={() => router.navigate("/HomePage")}
                />
            </View>
        </View>
    );
}
