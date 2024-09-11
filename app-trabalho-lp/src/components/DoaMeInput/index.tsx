import { View, Text, TextInputProps, TextInput } from 'react-native'
import React, { useState } from 'react'
import { DoaMeInputProps } from './DoaMeInput'
import { styles } from './styles'
import { retornarTokenDeCorPeloTipo } from './utils';

export default function DoaMeInput({ iconeVisibilidade, cor, ...rest }: DoaMeInputProps & TextInputProps) {
    const [visibilidadeInput, setVisibilidadeInput] = useState<boolean>(false);

    const styled = styles(cor);
    return (
        <View style={styled.container}>
            <View style={styled.borda}>

                <TextInput 
                    placeholderTextColor={retornarTokenDeCorPeloTipo(cor)}
                    style={styled.input}
                    secureTextEntry={visibilidadeInput} 
                    {...rest}
                    
                    />
            </View>
        </View>
    )
}