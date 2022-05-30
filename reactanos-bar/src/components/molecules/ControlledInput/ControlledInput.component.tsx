import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import Input, { InputProps } from '../../atoms/Input/Input.component'

interface ControlledInputProps extends InputProps{
    control:Control<any,any>;
    placeholder:string;
    type?: "default" | "email-address";
    name:string;
}

const ControlledInput:FC<ControlledInputProps> = ({control, placeholder, type="default", name, ...props}) => {
  return (
    <Controller control={control} name={name}
        render={({ field: { onChange, onBlur, value } }) => (
            <Input autoCapitalize='none' keyboardType={type} returnKeyType='next' onChangeText={onChange} onBlur={onBlur} value={value} placeholder={placeholder} {...props} />
        )}
    />
  )
}

export default ControlledInput