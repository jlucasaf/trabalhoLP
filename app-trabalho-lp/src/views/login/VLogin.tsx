import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import DoaMeInput from '@/components/DoaMeInput'
import DoaMeBotao from '@/components/DoaMeBotao'
import { router } from 'expo-router'


type ILogin = {
    
    email: string,
    senha: string
}

export default function VLogin() {
    const [dadosLogin, setDadosLogin] = useState<ILogin>({
        
        email: "",
        senha:""
    })

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
                     onPress={() => router.navigate("/HomePage")} />
                    <View style={styles.increverContainer}>
                        <Text style={styles.legenda}>Não possui uma conta? </Text>
                        <Text style={styles.legenda} onPress={() => router.navigate("/Cadastro")}>Inscreva-se</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}