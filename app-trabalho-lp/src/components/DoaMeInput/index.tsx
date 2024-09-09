import { View, Text, TextInputProps, TextInput } from 'react-native'
import React, { useState } from 'react'
import { DoaMeInputProps } from './DoaMeInput'
import { styles } from './styles'

export default function DoaMeInput({ iconeVisibilidade, cor, ...rest }: DoaMeInputProps & TextInputProps) {
    const [visibilidadeInput, setVisibilidadeInput] = useState<boolean>(false);
    return (
        <View style={styles.container}>
            <View style={styles.borda}>

                <TextInput 
                    style={styles.input}
                    {...rest}
                    secureTextEntry={visibilidadeInput} />
            </View>
        </View>
    )
}