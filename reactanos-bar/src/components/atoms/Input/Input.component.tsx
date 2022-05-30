import React, { FC } from 'react'
import { TextInputProps } from 'react-native';
import { StyledInput } from './Input.styled';

export interface InputProps extends TextInputProps{
  rounded?:boolean;
  variant?: 'outline' | 'unstyled' | 'rounded'
}

const Input:FC<InputProps> = ({variant, rounded,...props}) => {
  return (
    <StyledInput variant={variant} rounded={rounded} {...props} />
  )
}

export default Input