import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import {
    StyledLinearGradient,
    StyledMargin,
    StyledView,
} from "./AddPollScreen.styled";
import ImageButton from "../../atoms/ImageButton/ImageButton.component";
import * as ImagePicker from "expo-image-picker";
import Modal from "../../atoms/Modal/Modal.component";
import Carousel from "../../molecules/Carousel/Carousel.component";
import { useForm } from "react-hook-form";
import { uploadImages, validateInputs } from '../../../utils/utils';
import { errorHandler } from "../../../utils/ErrorsHandler";
import { db } from "../../../InitApp";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { AuthTypes } from "../../../redux/authReducer";
import { IStore } from "../../../redux/store";
import { fetchLoadingFinish, fetchLoadingStart } from '../../../redux/loaderReducer';
import { successHandler } from "../../../utils/SuccessHandler";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../../atoms/Button/Button.component";
import { StyledParagraph } from "../../atoms/Paragraph/Paragraph.styled";
import ControlledInput from "../../molecules/ControlledInput/ControlledInput.component";
import Select from "../../molecules/Select/Select.component";
import { RadioButton } from "react-native-paper";
import { Box, Slider } from "native-base";
import { Checkbox } from 'react-native-paper';
import { Screens } from "../../../navigation/Screens";

interface PollData {
    name: string;
    attention: string;
    elaborationTime: number;

}
const AddPollScreen = ({ navigation }: any) => {
    const [images, setImages] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { control, getValues, reset, handleSubmit } = useForm<PollData>();
    const [attention, setAttention] = useState("");
    const opinion: MutableRefObject<any> = useRef();
    const [price, setPollsPrice] = React.useState('');
    const data: AuthTypes = useSelector<IStore, any>(store => store.auth);
    const dispatch = useDispatch();
    const [onChangeSliderValue, setOnChangeSliderValue] = React.useState(70); //slider value
    const [cleaning, setCleaning] = React.useState(false);
    const [deliverySpeed, setDeliverySpeed] = React.useState(false);
    const [VarietyOfFood, setVarietyOfFood] = React.useState(false);

    const dataAttention = [
        { label: "Insatisfecho", value: "dissatisfied" },
        { label: "Satisfecho", value: "satisfied" },
        { label: "Normal", value: "normal" },
    ]

    const OtherReset = () => {
        setAttention("");
        opinion.current = "";
        setOnChangeSliderValue(70);
        setCleaning(false);
        setDeliverySpeed(false);
        setVarietyOfFood(false);
    }

    const handleSelectAttention = (value: string) => {
        setAttention(value);
    }

    useFocusEffect(
        useCallback(() => {
            reset();
            OtherReset();
        }, [])
    );

    const uploadPoll = async () => {
        try {
            dispatch(fetchLoadingStart());
            const values = getValues();
            validateInputs(values);
            const imagesRef = await uploadImages(images);
            const docRef = await addDoc(collection(db, "polls"), {
                user: data.user.email,
                PollTable: data.user.table,
                PollAttention: attention,
                PollPrice: price,
                PollTasteFood: onChangeSliderValue,
                PollOpinion: opinion.current,
                PollCleaning: cleaning,
                PollVarietyOfFood: VarietyOfFood,
                PollDeliverySpeed: deliverySpeed,
                creationDate: new Date(),
                images: imagesRef,
                ...values
            });
            successHandler('poll-created');
            // navigation.navigate(Screens.QRCode, { // TODO: change to poll-created
            //     title: "Mesa creada exitosamente",
            //     subtitle:
            //         "La mesa ya está cargado en nuestras bases de datos, de todas formas asegurate de guardar el código QR que te brindamos",
            //     code: JSON.stringify({tableCode:values.tableNumber.toString()}),
            // });
            reset();
            OtherReset();
        } catch (e: any) {
            console.log(e);
            errorHandler(e.code);
        } finally {
            dispatch(fetchLoadingFinish());
        }
    };

    const handleCamera = async () => {
        let result: any = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            if (images.length < 2) {
                setModalVisible(true);
            } else {
                setModalVisible(false);
            }
            setImages(arr => [...arr, result["uri"]]);
        }
    };

    const handleCancel = () => {
        setImages([]);
        setModalVisible(false);
    }

    return (
        <StyledLinearGradient colors={["#6190E8", "#A7BFE8"]}>
            <StyledView contentContainerStyle={{ alignItems: 'center' }}>
                <Modal
                    isVisible={modalVisible}
                    title={`${images.length}/3 Fotos agregadas`}
                    subtitle="Es necesario que cargues todas las imágenes para la encuesta"
                    onPrimaryText="Siguiente foto"
                    onPrimary={handleCamera}
                    onSecondaryText="Cancelar"
                    onSecondary={handleCancel}
                />
                {images.length < 1 ?
                    <ImageButton source={require('../../../../assets/add-photo.png')} onPress={handleCamera} /> :
                    <Carousel images={images} />}
                <StyledView>

                    <StyledMargin>
                        <StyledParagraph
                            level="L"
                            color="white"
                            bold={true}
                            textAlign="left"
                        >
                            •  ¿Que te ha parecido la atención?
                        </StyledParagraph>
                    </StyledMargin>

                    <StyledMargin>
                        <Select value={attention} onChange={handleSelectAttention} placeholder="Tu respuesta nos ayuda a mejorar" data={dataAttention} />
                    </StyledMargin>

                    <StyledMargin>
                        <StyledParagraph
                            level="L"
                            color="white"
                            bold={true}
                            textAlign="left"
                        >
                            •  ¿Que te ha parecido el precio?
                        </StyledParagraph>
                    </StyledMargin>

                    <StyledMargin>
                        <RadioButton.Group
                            onValueChange={value => setPollsPrice(value)}
                            value={price}
                            control={control}
                        >
                            <RadioButton.Item
                                label="Insatisfecho"
                                value="dissatisfied"
                                position="leading"
                                style={{
                                    marginRight: 180,
                                }}
                            />
                            <RadioButton.Item
                                label="Satisfecho"
                                value="satisfied"
                                position="leading"
                                style={{ marginRight: 193 }}

                            />
                            <RadioButton.Item
                                label="Normal"
                                value="normal"
                                position="leading"
                                style={{
                                    marginRight: 215,
                                }}
                            />
                        </RadioButton.Group>
                    </StyledMargin>

                    <StyledMargin>
                        <StyledParagraph
                            level="L"
                            color="white"
                            bold={true}
                            textAlign="left"
                        >
                            •  ¿Que te ha parecido la comida?
                        </StyledParagraph>
                    </StyledMargin>

                    <StyledMargin>
                        <Box alignItems="center" w="100%">
                            <Slider
                                w="3/4" maxW="300" defaultValue={70} minValue={0} maxValue={100} accessibilityLabel="hello world" step={10} size="sm"
                                colorScheme="cyan" onChange={v => {
                                    setOnChangeSliderValue(Math.floor(v));
                                }} onChangeEnd={v => {
                                    v;
                                }}>
                                <Slider.Track>
                                    <Slider.FilledTrack />
                                </Slider.Track>
                                <Slider.Thumb />
                            </Slider>
                        </Box>

                    </StyledMargin>

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

                    <Checkbox.Item
                        label="Limpieza"
                        position="leading"
                        status={cleaning ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setCleaning(!cleaning);
                        }}
                        style={{
                            marginRight: 195,
                        }}
                    />

                    <Checkbox.Item
                        label="Velocidad de entrega"
                        position="leading"
                        status={deliverySpeed ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setDeliverySpeed(!deliverySpeed);
                        }}
                        style={{
                            marginRight: 110,
                        }}
                    />
                    <Checkbox.Item
                        label="Variedad de comida"
                        position="leading"
                        status={VarietyOfFood ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setVarietyOfFood(!VarietyOfFood);
                        }}
                        style={{
                            marginRight: 120,
                        }}
                    />
                    <StyledMargin>
                        <StyledParagraph
                            level="L"
                            color="white"
                            bold={true}
                            textAlign="left"
                        >
                            •  Dejanos tu opinion sobre el servicio
                        </StyledParagraph>
                    </StyledMargin>
                    <StyledMargin>
                        <ControlledInput onSubmitEditing={() => opinion.current.focus()} placeholder="Tu respuesta nos ayuda a mejorar" variant="rounded" control={control} name="PollsOpinion" />
                    </StyledMargin>
                    <StyledMargin>
                        <Button onPress={handleSubmit(uploadPoll)}>Enviar</Button>
                    </StyledMargin>
                </StyledView>
            </StyledView>
        </StyledLinearGradient>
    );
};
export default AddPollScreen;
