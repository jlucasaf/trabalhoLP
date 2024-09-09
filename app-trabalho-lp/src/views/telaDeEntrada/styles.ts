import { tema } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tema.cores.rosa[500],
    padding: 24,
    justifyContent:"space-between"
  },
  cabecalho: {

  },
  logo: {
    alignItems: "center",
    justifyContent:"center",
  },
  textoInicialContainer: {},
  textoInicial: {
    fontWeight: "bold",
    fontSize: 24,
    color: tema.cores.white
  },
  rodape: {
    marginBottom: 85,
    alignItems:"center",
    gap: 32
  },
  cadastrarTextoContainer: {
    
    alignItems: "center",
    justifyContent:"center",
    width:"100%",
    flexDirection: "row"
  },
  cadastrarTexto: {
    fontSize: 15,
    color:tema.cores.rosa[300]
  },
});
