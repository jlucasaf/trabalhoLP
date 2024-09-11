import { tema } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: tema.cores.rosa[500],
  },
  voltarBotaoContainer: {
    marginBottom: 90,
    alignSelf: 'flex-start', 
  },
  imagemTituloContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingRight: 50,
  },
  imagem: {
    width: 200,
    height: 200,
    marginRight: -20,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 40,
    color: tema.cores.white,
    textAlign: "center",
  },
  areaQrcodeContainer: {
    backgroundColor: tema.cores.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flex: 1,
    width: "100%",
    padding: 24,
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: -10,
  },
  qrText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  produtoNome: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', 
    marginTop: 20,
  },
  iconButton: {
    alignItems: 'center',
  },
  
});
