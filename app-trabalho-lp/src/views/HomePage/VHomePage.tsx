import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Modal, Pressable, Image, ScrollView, TextInput, Alert, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { tema } from '@/theme';
import { router } from 'expo-router';
import DoaMeBotao from '@/components/DoaMeBotao';
import { campanhas, doacoesDoador } from '@/api/home';

// Tipos dos itens da lista
type Doacao = {
  id: string;
  nomeDoacao: string;
  endereco: string;
  voluntario: string;
  imagem: string;   
  qrCode: string;   
  status: string;   
  dataFinal?: string; 
};

type Campanha = {
  id: string,
  titulo: string,
  descricao: string,
  local: string,
  voluntario: string,
  dataFinal: string,
}

export default function VHomePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoacao, setSelectedDoacao] = useState<Doacao | null>(null);
  const [filter, setFilter] = useState(''); // Estado para o filtro
  const [doacoes, setDoacoes] = useState<Doacao[]>([]); // Atualize o estado para armazenar doações reais
  const [campanhasList, setCampanhasList] = useState<Campanha[]>([]); // Estado para campanhas
  const inputWidth = useRef(new Animated.Value(0)).current; // Valor inicial do campo de filtro
  
  const abrirModal = (doacao: Doacao) => {
    setSelectedDoacao(doacao);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setSelectedDoacao(null);
  };

  const renderItemDoacao = ({ item }: { item: Doacao }) => (
    <Pressable onPress={() => abrirModal(item)} style={styles.itemContainer}>
      <Text style={styles.itemNome}>{item.nomeDoacao}</Text>
      <Text style={styles.itemEndereco}>{item.endereco}</Text>
      <Text style={styles.itemVoluntario}>{item.voluntario}</Text>
    </Pressable>
  );

  const renderItemCampanha = ({ item }: { item: Campanha }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemNome}>{item.titulo}</Text>
      <Text style={styles.itemDescricao}>{item.descricao}</Text>
      <Text style={styles.itemCampanhaEndereco}>{item.local}</Text>
      <Text style={styles.itemVoluntario}>{item.voluntario}</Text>
      <Text style={styles.itemData}>Data final: {item.dataFinal}</Text>
      
      {/* Botão de Doar associado à campanha */}
      <DoaMeBotao
        tipo="rosa"
        titulo="Doar"
        onPress={() => router.push({ pathname: "/NovaDoacao/Index", params: { idCampanha: item.id } })}
      />
    </View>
  );

  const filtradas = doacoes.filter(doacao => 
    doacao.nomeDoacao.toLowerCase().includes(filter.toLowerCase()) ||
    doacao.voluntario.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAcessar = async () => {
    try {
      const resultadoCampanhas = await campanhas();
      const resultadoDoacoes = await doacoesDoador();
      console.log("Campanhas:", resultadoCampanhas);
      console.log("Doacoes:", resultadoDoacoes);
      setDoacoes(resultadoDoacoes);
      setCampanhasList(resultadoCampanhas); // Atualiza o estado das campanhas
    } catch (error) {
      Alert.alert("Erro ao tentar entrar na página inicial.");
    }
  };

  useEffect(() => {
    handleAcessar();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tituloContainer}>
        <Text style={styles.titulo}>DoaMe</Text>
      </View>
      
      {/* Campo de filtro */}
      <TextInput
        style={styles.filterInput}
        placeholder="Filtrar doações..."
        value={filter}
        onChangeText={setFilter}
      />

      {/* Título da lista de doações */}
      <Text style={styles.sectionTitle}>Doações Recentes</Text>
      <FlatList
        data={filtradas}
        renderItem={renderItemDoacao}
        keyExtractor={(item) => item.id}
      />

      {/* Título da lista de campanhas */}
      <Text style={styles.sectionTitle}>Campanhas</Text>
      <FlatList
        data={campanhasList}
        renderItem={renderItemCampanha}
        keyExtractor={(item) => item.id}
      />

      {/* Modal de exibição das doações */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedDoacao && (
              <>
                <Text style={styles.modalTitulo}>Informações da Doação</Text>
                <Text style={styles.modalItem}><Text style={styles.modalLabel}>Nome:</Text> {selectedDoacao.nomeDoacao}</Text>
                <Text style={styles.modalItem}><Text style={styles.modalLabel}>Endereço:</Text> {selectedDoacao.endereco}</Text>
                <Text style={styles.modalItem}><Text style={styles.modalLabel}>Voluntário:</Text> {selectedDoacao.voluntario}</Text>
                <Text style={styles.modalItem}><Text style={styles.modalLabel}>Status:</Text> {selectedDoacao.status}</Text>
                
                {selectedDoacao.status === 'Entregue' && (
                  <Text style={styles.modalItem}><Text style={styles.modalLabel}>Data de Entrega:</Text> {selectedDoacao.dataFinal}</Text>
                )}

                <ScrollView horizontal pagingEnabled style={styles.scrollView}>
                  {selectedDoacao.status === 'Entregue' && (
                    <Image source={{ uri: selectedDoacao.imagem }} style={styles.itemImage} />
                  )}
                  <Image source={{ uri: selectedDoacao.qrCode }} style={styles.qrCodeImage} />
                </ScrollView>
              </>
            )}
            <Pressable onPress={fecharModal} style={styles.modalCloseButton}>
              <FontAwesome name='times' size={24} color={tema.cores.rosa[500]} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

