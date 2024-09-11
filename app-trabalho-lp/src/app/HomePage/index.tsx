import { View, Text } from 'react-native'
import React from 'react'
import VHomePage from '@/views/HomePage/VHomePage'

export default function HomePage() {
  return (
    <View style={{flex: 1, width:"100%", height:"100%"}}>
      <VHomePage/>
    </View>
  )
}