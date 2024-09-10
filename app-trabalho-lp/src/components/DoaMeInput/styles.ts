import { tema } from "@/theme";
import { StyleSheet } from "react-native";
import { retornarTokenDeCorPeloTipo } from "./utils";
import { DoaMeInputProps } from "./DoaMeInput";

export const styles = (tipo: DoaMeInputProps["cor"]) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      width: "100%",
    },
    borda: {
      width: "100%",
      alignItems: "center",
      alignContent: "space-between",
      flexDirection: "row",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 16,
      borderColor: retornarTokenDeCorPeloTipo(tipo),
      minHeight: 40,
      maxHeight: 45,
      paddingHorizontal: 16,
      paddingVertical: 4,
      gap: 8,
    },
    input: {
      fontSize: 16,
      lineHeight: 18,
      letterSpacing: 0.1,
      color: tema.cores.black[500],
      textAlign: "left",
      width: "100%",
    },
  });
};
