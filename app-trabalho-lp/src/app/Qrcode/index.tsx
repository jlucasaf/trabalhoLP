import { View, Text } from 'react-native'
import React from 'react'
import VQrcode from '@/views/Qrcode/VQrcode'

export default function index() {
  return (
    <View style={{flex: 1, width: "100%", height:"100%"}}>
      <VQrcode/>
    </View>
  )
}