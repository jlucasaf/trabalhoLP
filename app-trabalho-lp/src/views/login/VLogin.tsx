import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import DoaMeInput from '@/components/DoaMeInput'
import DoaMeBotao from '@/components/DoaMeBotao'
import { router } from 'expo-router'
import { login } from '@/api/usuario'
import { ILoginUsuario } from '@/interfaces/ILoginUsuario'

export default function VLogin() {
    const [dadosLogin, setDadosLogin] = useState<ILoginUsuario>({
        
        email: "",
        senha:""
    })

   const handleAcessar = async () => {
    try {
        const token = await login(dadosLogin);
        Alert.alert('Login bem-sucedido!', `Token recebido: ${token}`);
        
    } catch (error) {
        Alert.alert("Erro ao tentar logar.");
    }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imagemTituloContainer}>
                <View style={styles.imagem}>
                    <Image source={require("@/assets/logo/logo_png.png")} />
                </View>
                <View style={styles.tituloContainer}>
                    <Text style={styles.titulo}>Bem vindo(a)!</Text>
                </View>
            </View>
            <View style={styles.areaLoginContainer}>
                <View style={styles.usuarioInputContainer}>

                    <DoaMeInput
                        cor='branco'
                        placeholder='Email'
                        inputMode='email'
                        onChangeText={(value) => setDadosLogin({...dadosLogin, email: value})}
                        value={dadosLogin.email}
                    />
                    <DoaMeInput
                        cor='branco'
                        placeholder='Senha'
                        inputMode='text'
                        secureTextEntry={true}
                        onChangeText={(value) => setDadosLogin({...dadosLogin, senha: value})}
                        value={dadosLogin.senha}
                    />
                    <Text style={styles.legenda} onPress={() => router.navigate("/NovaSenhaValidacao")}>Esqueceu sua senha?</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <DoaMeBotao tipo='branco' titulo='Acessar'
                     onPress={handleAcessar} />
                    <View style={styles.increverContainer}>
                        <Text style={styles.legenda}>Não possui uma conta? </Text>
                        <Text style={styles.legenda} onPress={() => router.navigate("/Cadastro/Index")}>Inscreva-se</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}