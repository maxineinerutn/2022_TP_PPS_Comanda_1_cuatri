import { Text } from 'native-base'
import React, { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { StyledPrimary, StyledText, StyleGradient } from './Button.styled'

interface ButtonProps{
    onPress: () => void;
}

const Button:FC<ButtonProps> = ({children, onPress}) => {

    return (
        <StyledPrimary onPress={onPress}>
            <StyleGradient colors={["#1c1e3d", "#858cc4"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} >
                <StyledText>
                    {children}
                </StyledText>
            </StyleGradient>
        </StyledPrimary>
    )
}

export default Button