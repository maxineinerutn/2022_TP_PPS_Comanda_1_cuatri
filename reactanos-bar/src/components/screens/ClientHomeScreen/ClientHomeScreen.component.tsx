import React from 'react'
import { StyledView, MarginVertical } from './ClientHomeScreen.styled';
import CardButton from '../../molecules/CardButton/CardButton.component';
import Paragraph from '../../atoms/Heading/Heading.component';
import Heading from '../../atoms/Heading/Heading.component';
import { Screens } from '../../../navigation/Screens';

const ClientHomeScreen = ({navigation}:any) => {

    const handleSignToRestaurant = () => {
        navigation.navigate(Screens.QR_SCANNER)
    }

  return (
    <StyledView colors={["#6190E8", "#A7BFE8"]}>
        <Heading bold level='L' color='white'>¡Bienvenido a nuestro local!</Heading>
        <MarginVertical>
            <Paragraph level='M' color='white'>Esperamos que nuestro servicio cumpla con sus expectativas</Paragraph>
        </MarginVertical>
        <MarginVertical>
            <Paragraph level='M' color='white'>Estamos a su disposición ante cualquier consulta</Paragraph>
        </MarginVertical>
        <MarginVertical>
            <CardButton>Ver encuestas antigüas</CardButton>
        </MarginVertical>
        <MarginVertical>
            <CardButton onPress={handleSignToRestaurant}>Ingresar al local</CardButton>
        </MarginVertical>
    </StyledView>
  )
}

export default ClientHomeScreen