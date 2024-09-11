import { View, Text, Image, Pressable, Share, Clipboard } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import QRCode from 'react-native-qrcode-svg'; // Importa o componente QRCode
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importa ícones
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { tema } from '@/theme';

type ILogin = {
    nomeDoacao: string;
};

export default function QrCode() {
    const [nomeDoacao, setNomeDoacao] = useState<string>('Nome da Doação Exemplo');

    const handleShare = async () => {
        try {
            await Share.share({
                message: 'Confira seu QR Code para a doação!',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleCopy = async () => {
        await Clipboard.setString('URL do QR Code ou dados relevantes');
    };

    return (


        <View style={styles.container}>
            <View style={styles.imagemTituloContainer}>
                <Image
                    source={require("@/assets/logo/logo_png.png")}
                    style={styles.imagem}
                />
                <Text style={styles.titulo}>DoaMe</Text>
            </View>


            {/* Área do QR Code */}
            <View style={styles.areaQrcodeContainer}>
                <Text style={styles.qrText}>Seu pacote está pronto para ser doado!</Text>
                <Text style={styles.produtoNome}>{nomeDoacao}</Text>
                <QRCode
                    value="Dados da nova doação" 
                    size={200}
                    color="black"
                    backgroundColor="white"
                />
                <View style={styles.iconsContainer}>
                    <Pressable style={styles.iconButton}>
                        <Icon name="print" size={30} color="black" />
                        <Text>Imprimir</Text>
                    </Pressable>
                    <Pressable style={styles.iconButton} onPress={handleShare}>
                        <Icon name="share" size={30} color="black" />
                        <Text>Compartilhar</Text>
                    </Pressable>
                    <Pressable style={styles.iconButton} onPress={handleCopy}>
                        <Icon name="content-copy" size={30} color="black" />
                        <Text>Copiar</Text>
                    </Pressable>
                    <Pressable style={styles.iconButton}>
                        <Icon name="email" size={30} color="black" />
                        <Text>E-mail</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
