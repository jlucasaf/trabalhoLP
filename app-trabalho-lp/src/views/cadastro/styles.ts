import { tema } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingVertical: 80,
    marginHorizontal: 24,
    alignItems: 'center', // Centraliza horizontalmente
  },
  voltarBotaoContainer: {
    marginBottom: 24,
    alignSelf: 'flex-start', // Mantém o botão de voltar no canto superior esquerdo
  },
  tituloContainer: {
    flexDirection:"row",

    width: "100%",
    alignItems: 'center', // Centraliza o texto horizontalmente
    justifyContent: 'space-around', // Centraliza o texto verticalmente
  },
  titulo: {
    fontSize: 38,
    color: tema.cores.rosa[500],
    fontWeight: "bold",
  },
});
