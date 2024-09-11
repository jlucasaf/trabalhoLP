import React from 'react';
import { styles } from './styles';
import { Image, Text, View } from 'react-native';

import { router } from 'expo-router';
import Logo from "@/assets/logo/Logo"
import DoaMeBotao from '@/components/DoaMeBotao';
import DoaMeInput from '@/components/DoaMeInput';

export function TelaDeEntrada() {
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.logo}>
          <Image
          source={require("@/assets/logo/logo_png.png")}/>
        </View>
        <View style={styles.textoInicialContainer}>
          <Text style={styles.textoInicial}>Acompanhe o impacto da sua doação em tempo real!</Text>
        </View>
      </View>

      <View style={styles.rodape}>
        <View style={styles.cadastrarTextoContainer}>
          <Text style={styles.cadastrarTexto}>Novo por aqui? </Text>
          <Text onPress={()=> router.navigate("/Cadastro")} style={styles.cadastrarTexto}>Cadastre-se!</Text>
        </View>
        <View style={{width:"85%" }}>
          <DoaMeBotao onPress={() => router.navigate("/Login")} style={{width:"100%"}} tipo='branco' titulo='Acessar' />
        </View>

      </View>

    </View>
  );
}