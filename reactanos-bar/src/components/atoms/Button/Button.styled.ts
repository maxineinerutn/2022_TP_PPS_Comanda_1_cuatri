import styled from "styled-components/native";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";

export const StyledPrimary = styled.TouchableOpacity`
    height:60px;
    width:100%;
    border-radius:15px;
    overflow:hidden;
`

export const StyledText = styled.Text`
    color:white;
    font-size:17px;
`

export const StyleGradient = styled(LinearGradient)<LinearGradientProps>`
    flex:1;
    justify-content:center;
    align-items:center;
`