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
  dataEntrega?: string; 
};

const doacoes: Doacao[] = [
  {
    id: '1',
    nomeDoacao: 'Item 1',
    endereco: 'Rua A',
    voluntario: 'Instituição A',
    imagem: 'https://via.placeholder.com/150',
    qrCode: 'https://via.placeholder.com/150',
    status: 'Entregue',
    dataEntrega: '10/09/2024'
  },
  {
    id: '2',
    nomeDoacao: 'Item 2',
    endereco: 'Rua B',
    voluntario: 'Instituição B',
    imagem: 'https://via.placeholder.com/150',
    qrCode: 'https://via.placeholder.com/150',
    status: 'Em transporte'
  },
  {
    id: '3',
    nomeDoacao: 'Camiseta',
    endereco: 'Rua B',
    voluntario: 'Instituição B',
    imagem: 'https://via.placeholder.com/150',
    qrCode: 'https://via.placeholder.com/150',
    status: 'Em transporte'
  },
  {
    id: '4',
    nomeDoacao: 'Camiseta',
    endereco: 'Rua C',
    voluntario: 'Instituição C',
    imagem: 'https://via.placeholder.com/150',
    qrCode: 'https://via.placeholder.com/150',
    status: 'Em transporte'
  }
 
];

export default function VHomePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoacao, setSelectedDoacao] = useState<Doacao | null>(null);
  const [filter, setFilter] = useState(''); // Estado para o filtro
  const [searchVisible, setSearchVisible] = useState(false);
  const inputWidth = useRef(new Animated.Value(0)).current; // Valor inicial do campo de filtro
  inputWidth  
  // Variável para identificar se é a tela de doador ou voluntário (por exemplo, pode vir de uma prop ou estado global)
  const [isVoluntario, setIsVoluntario] = useState(true); // Alterar para false se for a tela de doador
  const abrirModal = (doacao: Doacao) => {
    setSelectedDoacao(doacao);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setSelectedDoacao(null);
  };

  const renderItem = ({ item }: { item: Doacao }) => (
    <Pressable onPress={() => abrirModal(item)} style={styles.itemContainer}>
      <Text style={styles.itemNome}>{item.nomeDoacao}</Text>
      <Text style={styles.itemEndereco}>{item.endereco}</Text>
      <Text style={styles.itemVoluntario}>{item.voluntario}</Text>
    </Pressable>
  );

  // Função para filtrar as doações com base no valor do filtro
  const filtradas = doacoes.filter(doacao => 
    doacao.nomeDoacao.toLowerCase().includes(filter.toLowerCase()) ||
    doacao.endereco.toLowerCase().includes(filter.toLowerCase()) ||
    doacao.voluntario.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAcessar = async () => {
      try {
          const resultadoCampanhas = await campanhas();
          const resultadoDoacoes = await doacoesDoador();
          console.log("Campanhas:", resultadoCampanhas);
          console.log("Doacoes:", resultadoDoacoes);
        } catch (error) {
            Alert.alert("Erro ao tentar entrar na página inicial.");
        }
    }

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
      {/* Lista de itens filtrada */}
      <FlatList
        data={filtradas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Modal de exibição */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedDoacao && (
              <>
                {/* Informações detalhadas */}
                <Text style={styles.modalTitulo}>Informações da Doação</Text>
                <Text style={styles.modalItem}><Text style={styles.modalLabel}>Nome:</Text> {selectedDoacao.nomeDoacao}</Text>
                <Text style={styles.modalItem}><Text style={styles.modalLabel}>Endereço:</Text> {selectedDoacao.endereco}</Text>
                <Text style={styles.modalItem}><Text style={styles.modalLabel}>Voluntário:</Text> {selectedDoacao.voluntario}</Text>
                <Text style={styles.modalItem}><Text style={styles.modalLabel}>Status:</Text> {selectedDoacao.status}</Text>
                
                {/* Mostrar data de entrega se o status for "Entregue" */}
                {selectedDoacao.status === 'Entregue' && (
                  <Text style={styles.modalItem}><Text style={styles.modalLabel}>Data de Entrega:</Text> {selectedDoacao.dataEntrega}</Text>
                )}

                {/* Exibição de imagens com base no status */}
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

      {/* Botão de nova doação */}
      <View style={styles.botaoContainer}>
        <DoaMeBotao
          tipo="rosa"
          titulo="Doe aqui!"
          onPress={() => router.navigate("/NovaDoacao/Index")}
        />
      </View>
    </View>
  );
}
