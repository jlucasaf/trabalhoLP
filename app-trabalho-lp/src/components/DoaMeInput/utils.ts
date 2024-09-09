import { tema } from "@/theme";
import { DoaMeInputProps } from "./DoaMeInput"

export const retornarTokenDeCorPeloTipo = ( tipo: DoaMeInputProps["cor"]): string =>{
    let cor = ""
    switch(tipo) {
        case "branco":
            cor = tema.cores.white
            break;
        case "preto":
            cor = tema.cores.cinza[500];
            break;
        case "rosa":
            cor = tema.cores.rosa[150]
            break;
    }
    return cor
}

