import { tema } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "90%",
  },
  borda:{
    width: "100%",
    alignItems: "center",
    alignContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 16 ,
    borderColor: tema.cores.rosa[500],
    minHeight: (40),
    maxHeight: (45),
    paddingHorizontal: (16),
    paddingVertical: (4),
    gap: 8,
  },
  input: {
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.1,
    color: tema.cores.rosa[500],
    textAlign: "left",
    width: "100%",
  },
});
