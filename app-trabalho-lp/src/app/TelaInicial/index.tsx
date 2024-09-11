import { TelaDeEntrada } from '@/views/telaDeEntrada/TelaInicial'
import React from 'react'
import { View } from 'react-native'

export default function TelaInicial() {
  return (
    <View style={{flex:1, width:"100%", height:"100%"}}>
        <TelaDeEntrada/>
    </View>
  )
}
