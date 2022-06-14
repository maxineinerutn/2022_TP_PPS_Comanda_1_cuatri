import React, {  } from "react";
import {
    StyledLinearGradient,
    StyledMargin,
    StyledView,
} from "./GraphicScreen.styled";
import { useDispatch, useSelector } from "react-redux";
import { AuthTypes } from "../../../redux/authReducer";
import { IStore } from "../../../redux/store";
import { StyledParagraph } from "../../atoms/Paragraph/Paragraph.styled";

const GraphicScreen = ({ navigation }: any) => { 

    const data: AuthTypes = useSelector<IStore, any>(store => store.auth);
    const dispatch = useDispatch();
    const fill = 'rgb(134, 65, 244)'



    return (
        <StyledLinearGradient colors={["#6190E8", "#A7BFE8"]}>
            <StyledView contentContainerStyle={{ alignItems: 'center' }}>
                <StyledMargin>
                <StyledParagraph
                            level="L"
                            color="white"
                            bold={true}
                            textAlign="left"
                        >
                            •  ¿Que crees que deberiamos mejorar?
                        </StyledParagraph>
                </StyledMargin>

            </StyledView>
        </StyledLinearGradient>
    );
};
export default GraphicScreen;
