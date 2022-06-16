import React, { useCallback, useState } from "react";
import {
    StyledLinearGradient,
    StyledMargin,
} from "./GuessTheNumberScreen.styled";
import { useDispatch, useSelector } from "react-redux";
import { AuthTypes } from "../../../redux/authReducer";
import { IStore } from "../../../redux/store";
import { fetchLoadingFinish, fetchLoadingStart } from "../../../redux/loaderReducer";
import { sleep } from "../../../utils/utils";
import { successHandler } from "../../../utils/SuccessHandler";
import { errorHandler } from "../../../utils/ErrorsHandler";
import { StyledParagraph } from "../../atoms/Paragraph/Paragraph.styled";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../../atoms/Button/Button.component";
import { Input, View } from "native-base";
import Heading from "../../atoms/Heading/Heading.component";

const GuessTheNumberScreen = ({ navigation }: any) => {
    const data: AuthTypes = useSelector<IStore, any>(store => store.auth);
    const dispatch = useDispatch();
    const [secretNumber, setSecretNumber] = useState(0);
    const [guess, setGuess] = useState('');

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchLoadingStart());
            setSecretNumberHandler();
            dispatch(fetchLoadingFinish());
        }, [])
    );

    const setSecretNumberHandler = async () => {
        await sleep(500);
        setSecretNumber(Math.floor(Math.random() * 20));
    }

    const checkGuessHandler = async () => {
        try {
            dispatch(fetchLoadingStart());
            await sleep(500);
            if (guess === "" || guess === undefined) {
                throw { code: "empty-fields" };
            }
            if (guess === secretNumber.toString()) {
                successHandler("guessed-number");
                setGuess('');
                setSecretNumberHandler();

            } else {
                errorHandler("havent-guessed");
                setGuess('');
                await sleep(500);
            }
        } catch (error: any) {
            errorHandler(error.code);
        } finally {
            dispatch(fetchLoadingFinish());
        }
    }

    const onChangeHandler = (text: string) => {
        setGuess(text);
    }

    return (
        <StyledLinearGradient colors={["#6190E8", "#A7BFE8"]}>
            
            <StyledMargin>
                <Heading
                    level="XL"
                    textAlign="center"
                    color="white"
                    bold={true}
                >
                    Adivina el número {secretNumber}
                </Heading>
            </StyledMargin>

            <StyledMargin>
                <StyledParagraph
                    level="L"
                    color="white"
                    bold={true}
                    textAlign="center"
                >
                    Puede variar entre 1 y 20
                </StyledParagraph>
            </StyledMargin>

            <StyledMargin>
                <View
                    style={{
                        width: "10%",
                        alignSelf: "center",
                    }}
                >
                    <Input
                        style={{
                            alignSelf: "center",
                            borderColor: "white",
                            borderWidth: 1,
                            color: "white",
                        }}
                        keyboardType="numeric"
                        onChangeText={onChangeHandler}
                        value={guess.toString()}
                    />
                </View>
            </StyledMargin>

            <Button onPress={checkGuessHandler} > Enviar </Button>
        </StyledLinearGradient>
    );
};
export default GuessTheNumberScreen;



