import { View, Text, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { tema } from '@/theme';
import { router, useLocalSearchParams } from 'expo-router';
import DoaMeBotao from '@/components/DoaMeBotao';
import DoaMeInput from '@/components/DoaMeInput';
import { doar } from '@/api/doacoes';

type IDadosNovaDoacao = {
  nomeProduto: string;
  fotoObrigatoria: boolean;
};

export default function VNovaDoacao() {
  const { idCampanha, nomeCampanha, nomeLocal, nomeVoluntario } = useLocalSearchParams();

  // Verifica se o valor é string[] e trata adequadamente
  const campanhaNome = Array.isArray(nomeCampanha) ? nomeCampanha[0] : nomeCampanha;
  const localNome = Array.isArray(nomeLocal) ? nomeLocal[0] : nomeLocal;
  const voluntarioNome = Array.isArray(nomeVoluntario) ? nomeVoluntario[0] : nomeVoluntario;

  const [dadosNovaDoacao, setDadosNovaDoacao] = useState<IDadosNovaDoacao>({
    nomeProduto: '',
    fotoObrigatoria: false,
  });

  const toggleCheckbox = () => {
    setDadosNovaDoacao((prevState) => ({
      ...prevState,
      fotoObrigatoria: !prevState.fotoObrigatoria,
    }));
  };

  const handleDoar = async () => {
    try {
      const resultadoDoacao = await doar({
        foto: dadosNovaDoacao.fotoObrigatoria,
        titulo: dadosNovaDoacao.nomeProduto,
        id_campanha: idCampanha as string,
      });
      const mensagem: string = resultadoDoacao.mensagem;
      Alert.alert(mensagem);
      if (resultadoDoacao.sucesso) {
        router.push({
          pathname: "/Qrcode",
          params: {
            idDoacao: resultadoDoacao.dados?.id,
            titulo: dadosNovaDoacao.nomeProduto,
            campanha: campanhaNome,
            voluntario: voluntarioNome,
          },
        });
      }
    } catch (error) {
      Alert.alert("Erro ao tentar doar.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.voltarBotaoContainer}>
        <Pressable onPress={() => router.navigate('/HomePage')}>
          <FontAwesome name="chevron-left" size={24} color={tema.cores.rosa[500]} />
        </Pressable>
      </View>

      <View style={styles.tituloContainer}>
        <Text style={styles.titulo}>Nova doação</Text>
      </View>

      <View style={styles.dadosUsuarioContainer}>
        <DoaMeInput
          placeholder="Nome do Produto"
          inputMode="text"
          onChangeText={(value) => setDadosNovaDoacao({ ...dadosNovaDoacao, nomeProduto: value })}
          value={dadosNovaDoacao.nomeProduto}
          cor="preto"
        />
        <DoaMeInput
          placeholder={campanhaNome}
          inputMode="text"
          value={campanhaNome}
          editable={false}
          cor="preto"
        />
        <DoaMeInput
          placeholder={localNome}
          inputMode="text"
          value={localNome}
          editable={false}
          cor="preto"
        />
        <DoaMeInput
          placeholder={voluntarioNome}
          inputMode="text"
          value={voluntarioNome}
          editable={false}
          cor="preto"
        />

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
        <DoaMeBotao tipo="rosa" titulo="Concluir" onPress={handleDoar} />
      </View>
    </View>
  );
}

