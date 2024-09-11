import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { tema } from '@/theme';
import { router } from 'expo-router';
import DoaMeBotao from '@/components/DoaMeBotao';
import DoaMeInput from '@/components/DoaMeInput';
import { formatarDocumento, formatarNome } from '@/utils/formatadores';

type IDadosNovaDoacao = {
  nomeProduto: string;
  cidade: string;
  endereco: string;
  cep: string;
  nomeVoluntario: string;
  fotoObrigatoria: boolean;  // Nova propriedade para checkbox
};

export default function VNovaDoacao() {
  const [dadosNovaDoacao, setDadosNovaDoacao] = useState<IDadosNovaDoacao>({
    nomeProduto: '',
    cidade: '',
    endereco: '',
    cep: '',
    nomeVoluntario: '',
    fotoObrigatoria: false,  // Inicialmente falso
  });

  const toggleCheckbox = () => {
    setDadosNovaDoacao((prevState) => ({
      ...prevState,
      fotoObrigatoria: !prevState.fotoObrigatoria,  // Alterna o estado da checkbox
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.voltarBotaoContainer}>
        <Pressable onPress={() => router.navigate('/HomePage')}>
          <FontAwesome name="chevron-left" size={24} color={tema.cores.rosa[500]} />
        </Pressable>
      </View>

      <View style={styles.tituloContainer}>
        <View></View>
        <Text style={styles.titulo}>Nova doação</Text>
        <View></View>
      </View>

      <View style={styles.dadosUsuarioContainer}>
        <DoaMeInput
          placeholder="Nome do produto"
          inputMode="text"
          onChangeText={(value) => setDadosNovaDoacao({ ...dadosNovaDoacao, nomeProduto: value })}
          value={dadosNovaDoacao.nomeProduto}
          cor="preto"
        />
        <DoaMeInput
          placeholder="Cidade"
          inputMode="text"
          onChangeText={(value) => setDadosNovaDoacao({ ...dadosNovaDoacao, cidade: value })}
          value={dadosNovaDoacao.cidade}
          cor="preto"
        />
        <DoaMeInput
          placeholder="Endereço"
          inputMode="text"
          onChangeText={(value) => setDadosNovaDoacao({ ...dadosNovaDoacao, endereco: value })}
          value={dadosNovaDoacao.endereco}
          cor="preto"
        />
        <DoaMeInput
          placeholder="CEP"
          inputMode="text"
          onChangeText={(value) => setDadosNovaDoacao({ ...dadosNovaDoacao, cep: value })}
          value={dadosNovaDoacao.cep}
          cor="preto"
        />
        <DoaMeInput
          placeholder="Destinatário"
          inputMode="text"
          onChangeText={(value) => setDadosNovaDoacao({ ...dadosNovaDoacao, nomeVoluntario: value })}
          value={dadosNovaDoacao.nomeVoluntario}
          cor="preto"
        />

        {/* Seção com checkbox */}
        <View style={styles.checkboxContainer}>
          <Pressable onPress={toggleCheckbox} style={styles.checkbox}>
            {dadosNovaDoacao.fotoObrigatoria && (
              <FontAwesome name="check" size={16} color={tema.cores.rosa[500]} />
            )}
          </Pressable>
          <Text style={styles.checkboxLabel}>Foto obrigatória?</Text>
        </View>
      </View>

      <View style={styles.botaoRecuperarSenhaContainer}>
        <DoaMeBotao
          tipo="rosa"
          titulo="Concluir"
          onPress={() => router.navigate('/Qrcode')}
        />
      </View>
    </View>
  );
}
