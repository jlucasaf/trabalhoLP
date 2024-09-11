import { tema } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingVertical: 80,
    padding: 24,
    alignItems: 'center', 
  },
  voltarBotaoContainer: {
    marginBottom: 24,
    alignSelf: 'flex-start', 
  },
  tituloContainer: {
    flexDirection:"row",
    width: "100%",
    alignItems: 'center', 
    justifyContent: 'space-around', 
    marginBottom: 40,
  },
  titulo: {
    fontSize: 38,
    color: tema.cores.rosa[500],
    fontWeight: "bold",
  },
  dadosUsuarioContainer:{
    marginTop: 40,
    alignContent: "flex-start",
    justifyContent: "center",
    gap: (32),
    marginBottom: 40,
  },
  botaoCadastrarContainer:{
    marginTop: 40,
    width: "100%",
    
    
  }
});
