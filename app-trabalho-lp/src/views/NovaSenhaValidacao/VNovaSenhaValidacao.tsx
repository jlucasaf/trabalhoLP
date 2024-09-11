import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { tema } from '@/theme';
import { router } from 'expo-router';
import DoaMeBotao from '@/components/DoaMeBotao';
import DoaMeInput from '@/components/DoaMeInput';
import { formatarDocumento, formatarNome } from '@/utils/formatadores';

type IDadosSenhaValidacao = {
    cpfOuCnpj: string,
    endereco: string,
    email: string
}

export default function VNovaSenhaValidacao() {
    const [dadosSenhaValidacao, setDadosSenhaValidacao] = useState<IDadosSenhaValidacao>({
        cpfOuCnpj: "",
        email: "",
        endereco: ""
    });
    return (
        <View style={styles.container}>
            <View style={styles.voltarBotaoContainer}>
                <Pressable onPress={() => router.navigate('/Login')}>
                    <FontAwesome name='chevron-left' size={24} color={tema.cores.rosa[500]} />
                </Pressable>
            </View>
            <View style={styles.tituloContainer}>
                <View></View>
                <Text style={styles.titulo}>Recuperação de senha</Text>
                <View></View>
            </View>
            <View style={styles.dadosUsuarioContainer}>
                <DoaMeInput
                    placeholder="Email"
                    inputMode="email"
                    onChangeText={(value) => setDadosSenhaValidacao({ ...dadosSenhaValidacao, email: value })}
                    value={dadosSenhaValidacao.email}
                    cor="preto" />
                <DoaMeInput
                    placeholder="Endereço"
                    inputMode="text"
                    onChangeText={(value) => setDadosSenhaValidacao({ ...dadosSenhaValidacao, endereco: value })}
                    value={dadosSenhaValidacao.endereco}
                    cor="preto" />
                <DoaMeInput
                    placeholder="CPF/CNPJ"
                    inputMode="text"
                    onChangeText={(value) => setDadosSenhaValidacao({ ...dadosSenhaValidacao, cpfOuCnpj: formatarDocumento(value) })}
                    value={dadosSenhaValidacao.cpfOuCnpj}
                    cor="preto" />

            </View>

            <View style={styles.botaoRecuperarSenhaContainer}>
                <DoaMeBotao
                    tipo="rosa"
                    titulo='Recuperar senha'
                    onPress={() => router.navigate("/NovaSenha/Index")}
                />
            </View>
        </View>
    );
}
