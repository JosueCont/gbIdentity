import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import ScreenBaseAuth from "./screensBase/ScreenBaseAuth";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import Input from "./CustomInput";
import CustomButtom from "./CustomBtn";
import CardRecover from "./CardRecoverPassword";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { onRecoveryPassword, setValueEmail, closeModal } from "../store/ducks/authDuck";
import ModalErrorLogin from "./modals/ModalErrorLogin";

const {height, width} = Dimensions.get('window');

const RecoverPasswordMail = ({setModeRecover}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    //const [isValidMail, setValidMail] = useState(false)
    const email = useSelector(state => state.authDuck.email)
    const isValidMail = useSelector(state => state.authDuck.isValidMail)
    const loader = useSelector(state => state.authDuck.loading)
    const modalActive = useSelector(state => state.authDuck.modalRecover)

    return(
        <>
            {isValidMail ? (
                <>
                    <CardRecover>
                        <Image source={require('../../assets/mail.png')} style={styles.imgMail}/>
                        <Text style={{fontSize:getFontSize(17), textAlign:'center'}}>¡Hemos enviado un email al correo {email} con las instrucciones para seguir el proceso de recuperación de contraseña.</Text>
                    </CardRecover>
                    <CustomButtom title='De acuerdo' onPressed={() => navigation.navigate('Login')} />
                </>

            ):(
                <>
                    <View style={{marginTop:40}}>
                        <Text style={styles.lbl}>ID colaborador</Text>
                        <Input 
                            value={email} 
                            setValue={(val) => dispatch(setValueEmail(val)) }/>
                        <View style={{marginTop:20}}>
                            <Text style={styles.lbl}>Fecha de ingreso</Text>
                            <Input value={email} setValue={(val) => dispatch(setValueEmail(val)) }/>
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={styles.lbl}>Fecha de nacimiento</Text>
                            <Input value={email} setValue={(val) => dispatch(setValueEmail(val)) }/>

                        </View>
                        <CustomButtom title='Siguiente'  onPressed={() => dispatch(onRecoveryPassword(email))} loading={loader} isDisabled={email===''}/>
                    </View>
                    {/*<Text style={styles.help}>¿Usted ingresa con el número de colaborador y no tiene un correo electrónico institucional?</Text>
                    <TouchableOpacity style={styles.btn} onPress={setModeRecover}>
                        <Text style={styles.click}>Haga click aqui</Text>
            </TouchableOpacity>*/}
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