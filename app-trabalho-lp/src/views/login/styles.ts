import { tema } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height:"100%"
  },
  imagemTituloContainer:{
    width: "100%",
    alignContent: "center",
    justifyContent:"center",
    paddingBottom: 60
  },
  imagem:{
  },
  tituloContainer:{
    width:"100%",
    justifyContent:"center",
    alignContent:"center",
  },
  titulo:{
    fontWeight:"bold",
    fontSize: 42,
    color:tema.cores.rosa[500],
    textAlign:"center"
  },
  areaLoginContainer:{
    backgroundColor: tema.cores.rosa[500],
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flex:1,
    width:"100%",
    alignContent: "center",
    padding:24,
    justifyContent:"space-between",
  },
  usuarioInputContainer:{
    width:"100%",
    gap: 12,
    alignContent:"center",
  },
  bottomContainer:{
    width:"100%",
    alignContent:"center",
    gap:12,
  },
  increverContainer:{
    justifyContent:"center",
    flexDirection: "row",
  },
  legenda:{
    textAlign:"center",
    fontSize:15,
    color:tema.cores.cinza[500]
  }
  
});

