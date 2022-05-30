import { View } from "react-native";
import React, { FC } from "react";
import { StyledMargin, StyledView } from "./AddProductsController.styled";
import Input from "../../atoms/Input/Input.component";
import Button from "../../atoms/Button/Button.component";
import ControlledInput from "../../molecules/ControlledInput/ControlledInput.component";
import { Control } from "react-hook-form";

interface AddProductsControllerProps{
  control: Control<any,any>
  onPress:()=>void;
}

const AddProductsController:FC<AddProductsControllerProps> = ({onPress, control}) => {
    return (
        <StyledView>
            <StyledMargin>
                <ControlledInput placeholder="Nombre" variant="rounded" control={control} name="name" />
            </StyledMargin>
            <StyledMargin>
                <ControlledInput placeholder="Descripción" variant="rounded" control={control} name="description" />
            </StyledMargin>
            <StyledMargin>
                <ControlledInput placeholder="Tiempo de elaboración" variant="rounded" control={control} name="elaborationTime" />
            </StyledMargin>
            <StyledMargin>
                <ControlledInput placeholder="Precio" variant="rounded" control={control} name="price" />
            </StyledMargin>
            <StyledMargin>
                <Button onPress={onPress}>Agregar</Button>
            </StyledMargin>
        </StyledView>
    );
};

export default AddProductsController;
