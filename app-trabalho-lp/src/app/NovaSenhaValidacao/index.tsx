import { View, Text } from 'react-native'
import React from 'react'
import VNovaSenhaValidacao from '@/views/NovaSenhaValidacao/VNovaSenhaValidacao'

export default function index() {
  return (
    <View style={{flex: 1, width: "100%", height:"100%"}}>
      <VNovaSenhaValidacao/>
    </View>
  )
}