import { View, Text } from 'react-native'
import React from 'react'
import VCadastro from '@/views/cadastro/VCadastro'

export default function Cadastro() {
  return (
    <View style={{flex: 1, width:"100%", height:"100%"}}>
      <VCadastro/>
    </View>
  )
}