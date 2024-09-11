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
    marginBottom: 30,
    alignSelf: 'flex-start', 
    
  },
  tituloContainer: {
    flexDirection:"row",
    width: "100%",
    alignItems: 'center', 
    justifyContent: 'space-around', 
    marginBottom: 10,
  },
  titulo: {
    fontSize: 32,
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
  botaoRecuperarSenhaContainer:{
    marginTop: 40,
    width: "100%",
    
    
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: tema.cores.rosa[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: 'black'
  }
  
});
