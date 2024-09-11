import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { tema } from '@/theme';
import { router } from 'expo-router';
import DoaMeBotao from '@/components/DoaMeBotao';
import DoaMeInput from '@/components/DoaMeInput';
import { formatarDocumento, formatarNome } from '@/utils/formatadores';

type IDadosNovaSenha = {
    senha: string
}

export default function VNovaSenha() {
    const [dadosNovaSenha, setDadosNovaSenha] = useState<IDadosNovaSenha>({
        senha:""
    });
    return (
        <View style={styles.container}>
            <View style={styles.voltarBotaoContainer}>
                <Pressable onPress={() => router.navigate('/NovaSenhaValidacao')}>
                    <FontAwesome name='chevron-left' size={24} color={tema.cores.rosa[500]} />
                </Pressable>
            </View>
            <View style={styles.tituloContainer}>
                <View></View>
                <Text style={styles.titulo}>Nova senha</Text>
                <View></View>
            </View>
            <View style={styles.dadosUsuarioContainer}>
            <DoaMeInput
                    placeholder="Nova senha"
                    inputMode="text"
                    onChangeText={(value) => setDadosNovaSenha({ ...dadosNovaSenha, senha: value })}
                    value={dadosNovaSenha.senha}
                    cor="preto" />
                    <DoaMeInput
                    placeholder="Insira novamente"
                    inputMode="text"
                    onChangeText={(value) => setDadosNovaSenha({ ...dadosNovaSenha, senha: value })}
                    value={dadosNovaSenha.senha}
                    cor="preto" />

            </View>

            <View style={styles.botaoRecuperarSenhaContainer}>
                <DoaMeBotao
                    tipo="rosa"
                    titulo='Alterar senha'
                    onPress={() => router.navigate("/HomePage")}
                />
            </View>
        </View>
    );
}
