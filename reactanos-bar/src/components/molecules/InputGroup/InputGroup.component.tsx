import React, { FC} from 'react'
import { StyledView } from './InputGroup.styled'

interface InputGroupProps{
    children:any[]
}

const InputGroup:FC<InputGroupProps> = ({children}) => {
  return (
      <StyledView>
          {children && children.map(item => item)}
      </StyledView>
  )
}

export default InputGroup