import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import ScreenBaseAuth from "../components/screensBase/ScreenBaseAuth";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import Input from "../components/CustomInput";
import { Checkbox, Icon, useToast, Toast, Alert, VStack, HStack, } from "native-base";
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { setRepeatPassword, setValuePAssword } from "../store/ducks/authDuck";
import { Spinner } from "native-base";
import ModalErrorLogin from "../components/modals/ModalErrorLogin";
import { closeModal } from "../store/ducks/authDuck";
import FormConfirmPassword from "../components/FormConfirmPassword";
import CardRecover from "../components/CardRecoverPassword";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const tokenPassword = useSelector(state => state.authDuck.tokenProvitional)
    const isChangedPassword = useSelector(state => state.authDuck.isChangedPassword)
    const isModalActive = useSelector(state => state.authDuck.modalRecover)

    useEffect(() => {
        if(isChangedPassword){
            setTimeout(() => {
                navigation.navigate('Login')
            },2000)
        }
    },[isChangedPassword])

    return(
        <ScreenBaseAuth title="Actualizar contraseña">
            {!isChangedPassword ? (
                <FormConfirmPassword 
                    isNewUser={false} 
                    title='Actualizar' 
                    isContainToken={tokenPassword}
                />

            ):(
                <CardRecover>
                    <Text style={{fontSize:getFontSize(25), color:Colors.grayDark, fontWeight:'700', textAlign:'center'}}>Se ha actualizado la contraseña</Text>
                    <AntDesign name="checkcircle" size={120} color={Colors.lightBlue} />
                </CardRecover>
            )}
            <ModalErrorLogin 
                visible={isModalActive} 
                onClose={() => dispatch(closeModal({prop:'modalRecover', value: false}))}
            />
        </ScreenBaseAuth>
    )
}

export default UpdatePassword;