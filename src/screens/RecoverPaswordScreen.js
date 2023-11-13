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

const {height, width} = Dimensions.get('window');

const RecoverPasswordScreen = () => {
    const navigation = useNavigation();
    const [modeRecover, setModeRecover] = useState(false)

    const onValidateEmail = () => {
        setValidMail(true)
    }
    return(
        <ScreenBaseAuth title="Recuperación de contraseña">
            {modeRecover ? (
                <RecoverPasswordCode />
            ):(
                <RecoverPasswordMail setModeRecover={() => setModeRecover(true)}/>

            )}
        </ScreenBaseAuth>
    )
}



export default RecoverPasswordScreen;