import { View, Text } from 'react-native'
import React from 'react'
import VNovaSenha from '@/views/NovaSenha/NovaSenha'

export default function index() {
  return (
    <View style={{flex: 1, width: "100%", height:"100%"}}>
      <VNovaSenha/>
    </View>
  )
}