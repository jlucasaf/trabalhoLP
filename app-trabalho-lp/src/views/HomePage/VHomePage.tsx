import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { tema } from '@/theme';
import { router } from 'expo-router';
import DoaMeBotao from '@/components/DoaMeBotao';
import DoaMeInput from '@/components/DoaMeInput';
import { formatarDocumento, formatarNome } from '@/utils/formatadores';


export default function VHomePage() {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
        </div>
    );
}
