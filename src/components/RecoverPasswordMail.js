import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Platform, Pressable } from "react-native";
import ScreenBaseAuth from "./screensBase/ScreenBaseAuth";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import Input from "./CustomInput";
import CustomButtom from "./CustomBtn";
import CardRecover from "./CardRecoverPassword";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { onRecoveryPassword, setValueEmail, closeModal, onValidateCollaborator, setValuePAssword, setRepeatPassword,validatePassword } from "../store/ducks/authDuck";
import ModalErrorLogin from "./modals/ModalErrorLogin";
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from "moment";
import { AntDesign } from '@expo/vector-icons'; 
import FormValidateUser from "./FormValidateUser";
import FormConfirmPassword from "./FormConfirmPassword";


const {height, width} = Dimensions.get('window');

const RecoverPasswordMail = ({setModeRecover}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    //const [isValidMail, setValidMail] = useState(false)
    const email = useSelector(state => state.authDuck.email)
    const password = useSelector(state => state.authDuck.password)
    const repeatPassword = useSelector(state => state.authDuck.repeatPassword)
    const userId = useSelector(state => state.authDuck.userId)

    const isValidMail = useSelector(state => state.authDuck.isValidCollaborator)
    const loader = useSelector(state => state.authDuck.loading)
    const modalActive = useSelector(state => state.authDuck.modalRecover)
    const isChangedPassword = useSelector(state => state.authDuck.isChangedPassword)


    useEffect(() => {
        if(isChangedPassword){
            setTimeout(() => {
                navigation.navigate('Login')
            },3000)
        }
    },[isChangedPassword])

    return(
        <>
            {isValidMail ? !isChangedPassword ? (
                <>
                    <FormConfirmPassword isNewUser={false} title='Recuperar'/>
                </>
            ):(
                <>
                    <CardRecover>
                        <Text style={{fontSize:getFontSize(25), color:Colors.grayDark, fontWeight:'700', textAlign:'center'}}>Se ha actualizado la contraseña</Text>
                        <AntDesign name="checkcircle" size={120} color={Colors.lightBlue} />
                    </CardRecover>
                </>

            ):(
                <>
                    <FormValidateUser isNewUser={false}/>
                    
                </>
            )}
            <ModalErrorLogin 
                visible={modalActive} 
                onClose={() => dispatch(closeModal({prop:'modalRecover',value:false})) }
            />
        </>
    )
}

const styles = StyleSheet.create({
    lbl:{
        color:Colors.white, 
        fontSize:getFontSize(16), 
        marginBottom:6,
        //marginTop:100
    },
    help:{
        fontSize: getFontSize(16),
        fontWeight:'400',
        textAlign:'center',
        marginTop:20,
        width:width/1.2,
        color:Colors.white, 
        paddingHorizontal:5
    },
    btn:{
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    click:{
        fontSize:getFontSize(20),
        textDecorationLine:'underline',
        color:Colors.white,
        
    },
    imgMail:{
        width: 120,
        height:120,
        resizeMode:'contain',
        marginBottom:30
    }
})

export default RecoverPasswordMail;