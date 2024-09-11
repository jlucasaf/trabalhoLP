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
    position: 'relative',
    top: 60,
    left: 10,
    zIndex: 10
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
    
  },
  qrText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    height: 50,
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
    marginTop: 50,
  },
  iconButton: {
    alignItems: 'center',
  },
  
});
