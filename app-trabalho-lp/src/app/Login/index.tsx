import { View, Text } from 'react-native'
import React from 'react'
import VLogin from '@/views/login/VLogin'

export default function index() {
  return (
    <View style={{flex: 1, width: "100%", height:"100%"}}>
      <VLogin/>
    </View>
  )
}