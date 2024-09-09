import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { tema } from '@/theme';
import { router } from 'expo-router';

export default function VCadastro() {
    return (
        <View style={styles.container}>
            <View style={styles.voltarBotaoContainer}>
                <Pressable onPress={() => router.back()}>
                    <FontAwesome name='chevron-left' size={24} color={tema.cores.rosa[500]} />
                </Pressable>
            </View>
            <View style={styles.tituloContainer}>
                <View></View>
                <Text style={styles.titulo}>Cadastre-se</Text>
                <View></View>
            </View>
        </View>
    );
}
