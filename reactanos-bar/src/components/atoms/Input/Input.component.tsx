import React, { FC } from 'react'
import { TextInputProps } from 'react-native';
import { StyledInput } from './Input.styled';


const Input:FC<TextInputProps> = ({...props}) => {
  return (
    <StyledInput {...props} />
  )
}

export default Input