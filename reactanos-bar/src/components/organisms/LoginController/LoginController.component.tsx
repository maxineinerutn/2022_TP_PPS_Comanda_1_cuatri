import React, { FC } from 'react'
import InputGroup from '../../molecules/InputGroup/InputGroup.component'
import Input from '../../atoms/Input/Input.component'
import Button from '../../atoms/Button/Button.component'
import { StyledView } from './LoginController.styled'
import { Control, Controller } from 'react-hook-form'

interface LoginControllerProps{
  control: Control<any,any>
  onSubmit: () => void;
}

const LoginController:FC<LoginControllerProps> = ({control, onSubmit}) => {
  return (
    <StyledView>
        <InputGroup>
          <Controller control={control} name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input onChangeText={onChange} onBlur={onBlur} value={value} placeholder="Correo electrónico" />
            )}
          />
          <Controller control={control} name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input onChangeText={onChange} onBlur={onBlur} value={value} placeholder="Contraseña" />
            )}
          />
        </InputGroup>
        <Button onPress={onSubmit}>Iniciar sesión</Button>
    </StyledView>
  )
}

export default LoginController