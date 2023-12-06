import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import ScreenBaseAuth from "../components/screensBase/ScreenBaseAuth";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import Input from "../components/CustomInput";
import { Checkbox, Icon } from "native-base";
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { setValueEmail, setValuePAssword, setValueCheckbox, loginAction } from "../store/ducks/authDuck";
import { Spinner } from "native-base";
import ModalErrorLogin from "../components/modals/ModalErrorLogin";
import { closeModal } from "../store/ducks/authDuck";


const {height, width} = Dimensions.get('window');

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const email = useSelector(state => state.authDuck.email)
    const password = useSelector(state => state.authDuck.password)
    const isChecked = useSelector(state => state.authDuck.isChecked)
    const loader = useSelector(state => state.authDuck.loading)
    const modalActive = useSelector(state => state.authDuck.modalErrorLogin)


    //const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const [disableBtn, setDisableBtn] = useState(true);
    //const [isChecked, setChecked] = useState(false)

    useEffect(() => {
        if(email != '' && password != '' && isChecked) setDisableBtn(false)
        else setDisableBtn(true)
    },[email, password, isChecked])

    return(
        <ScreenBaseAuth title="Bienvenido a nuestra era de digitalización">
            <View style={styles.contInputs}>
                <Text style={styles.lblInput}>ID Colaborador</Text>
                <Input value={email} setValue={(val) => dispatch(setValueEmail(val)) }/>
                <Text style={styles.lblInput}>Contraseña</Text>
                <Input value={password} setValue={(val) => dispatch(setValuePAssword(val))} secureTextEntry/>
            </View>
            <View style={styles.row}>
                <Checkbox 
                    colorScheme={'green'} 
                    aria-label="" 
                    color={'green'} 
                    icon={isChecked && <Icon as={<AntDesign name="check"  color="black" />}/>}
                    value={isChecked}
                    onChange={() => dispatch(setValueCheckbox(!isChecked))}
                />
                <Text style={styles.lblAcep}>Acepto los <Text style={styles.termsCond} onPress={() => navigation.navigate('ModalTerms')}>términos y condiciones</Text></Text>
            </View>
            <TouchableOpacity 
                style={[styles.btnIn,{backgroundColor: disableBtn ? Colors.grayDark : Colors.darkBlue,}]} 
                disabled={disableBtn}
                onPress={() => dispatch(loginAction({email,password}))}>
                {loader ? <Spinner size={'sm'} color={'white'}></Spinner> :<Text style={styles.lblIn}>Ingresar</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('RecoverPassword')}>
                <>
                    <Text style={styles.lblRecover}>¿No recuerdas tus credenciales?</Text>
                    <Text style={styles.lblRecover}>Recuperalas aqui</Text>
                </>
            </TouchableOpacity>
            <ModalErrorLogin visible={modalActive} onClose={() => dispatch(closeModal({prop:'modalErrorLogin',value:false})) }/>
        </ScreenBaseAuth>
    )
}

const styles = StyleSheet.create({
    lblInput:{
        color:Colors.white, 
        fontSize:getFontSize(16), 
        marginBottom:6,
        marginTop:10
    },
    contInputs:{
        marginTop:30, 
        marginBottom:30
    },
    row:{
        flexDirection:'row',
    },
    center:{
        justifyContent:'center', 
        alignItems:'center'
    },
    btnIn:{
        marginTop:30, 
        width: width/1.27, 
        height:50,  
        justifyContent:'center', 
        alignItems:'center', 
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        marginBottom:15    
    },
    lblIn:{
        color: Colors.white, 
        fontSize:getFontSize(20)
    },
    lblRecover:{
        color:Colors.white, 
        fontSize:getFontSize(14), 
        fontWeight:'400'
    },
    lblAcep:{
        color:Colors.white,
        fontSize:getFontSize(14), 
        fontWeight:'400',
        marginLeft:10, 
    },
    termsCond:{
        textDecorationLine:'underline', 
        textDecorationColor:Colors.white
    }
})

export default LoginScreen;