import { StyleSheet } from "react-native";
import { DoaMeBotaoProps } from "./DoaMeBotao";
import { tema } from "@/theme";

type BotaoPadraoStylesProps = {
  cor?: DoaMeBotaoProps["tipo"];
};

export const styles = (props: BotaoPadraoStylesProps) => {
  const corBotao = props.cor === "branco" ? tema.cores.white : tema.cores.rosa[500];
  const corBorda = corBotao === tema.cores.white ? tema.cores.rosa[500] : tema.cores.white;
  const corTexto = corBotao === tema.cores.white? tema.cores.rosa[500] : tema.cores.white;

  return StyleSheet.create({
    container: {
      height: (38),
      backgroundColor: corBotao,
      borderRadius: 999,
      borderColor: corBorda,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderStyle: "solid",
      alignSelf: "stretch",
      flexDirection: "row",
      gap: 8,
    },
    icone: {
      
      color: corTexto,
      fontSize: 18,
    },
    titulo: {
      fontSize: 16,
      letterSpacing: 0.1,
      lineHeight: 18,
      textTransform: "uppercase",
      fontWeight: "bold",
      color: corTexto,
    },
  });
};
