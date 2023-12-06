import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import ScreenBaseAuth from "../components/screensBase/ScreenBaseAuth";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import Input from "../components/CustomInput";
import CustomButtom from "../components/CustomBtn";
import { useNavigation } from "@react-navigation/core";
import RecoverPasswordMail from "../components/RecoverPasswordMail";
import RecoverPasswordCode from "../components/RecoverPassworCode";
import { useDispatch, useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');

const RecoverPasswordScreen = () => {
    const navigation = useNavigation();
    const [modeRecover, setModeRecover] = useState(false)
    const isValidCollaborator = useSelector(state => state.authDuck.isValidCollaborator)

    const onValidateEmail = () => {
        setValidMail(true)
    }
    return(
        <ScreenBaseAuth title={isValidCollaborator ? 'Recuperación de contraseña' : "Verificaremos sus datos, por favor ingrese la siguiente información"}>
            {modeRecover ? (
                <RecoverPasswordCode />
            ):(
                <RecoverPasswordMail setModeRecover={() => setModeRecover(true)}/>

            )}
        </ScreenBaseAuth>
    )
}



export default RecoverPasswordScreen;