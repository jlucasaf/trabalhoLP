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

export default function VQrcode() {
    const [dadosSenhaValidacao, setDadosSenhaValidacao] = useState<IDadosSenhaValidacao>({
      cpfOuCnpj: "",
      email: "",
      endereco: ""
    });
  
    return (
      <View style={styles.container}>
        <View style={styles.voltarBotaoContainer}>
          <Pressable onPress={() => router.navigate('/NovaDoacao/Index')}>
            <FontAwesome name="chevron-left" size={24} color={tema.cores.rosa[500]} />
          </Pressable>
        </View>
      </View>
    );
  }
  
