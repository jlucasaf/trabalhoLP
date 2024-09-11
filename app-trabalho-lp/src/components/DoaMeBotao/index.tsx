import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'
import { DoaMeBotaoProps } from './DoaMeBotao'
import { styles } from './styles';


export default function DoaMeBotao({icone, tipo, titulo, ...rest}: DoaMeBotaoProps & PressableProps ){
    const styled = styles({ cor: tipo });
  return (
    <Pressable {...rest} style={styled.container}  >
        <Text style={styled.titulo}>{titulo}</Text>
    </Pressable>
  )
}