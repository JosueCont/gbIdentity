import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity, Linking } from "react-native";
import ScreenBaseAuth from "../components/screensBase/ScreenBaseAuth";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import Input from "../components/CustomInput";
import { Checkbox, Icon, useToast, Toast, Alert, VStack, HStack, } from "native-base";
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { setValueEmail, setValuePAssword, setValueCheckbox, loginAction, onResetRecover, onResetCreateUser } from "../store/ducks/authDuck";
import { Spinner } from "native-base";
import ModalErrorLogin from "../components/modals/ModalErrorLogin";
import { closeModal } from "../store/ducks/authDuck";
import CheckBoxCustom from "../components/CheckboxCustom";
import InfoModal from "./InfoModal";


const {height, width} = Dimensions.get('window');

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast();

    const email = useSelector(state => state.authDuck.email)
    const password = useSelector(state => state.authDuck.password)
    const isChecked = useSelector(state => state.authDuck.isChecked)
    const loader = useSelector(state => state.authDuck.loading)
    const modalActive = useSelector(state => state.authDuck.modalErrorLogin)
    const isExpiredPassword = useSelector(state => state.authDuck.isExpiredPassword)
    const message = useSelector(state => state.authDuck.message)


    //const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const [disableBtn, setDisableBtn] = useState(true);
    //const [isChecked, setChecked] = useState(false)

    useEffect(() => {
        if(email != '' && password != '' && isChecked) setDisableBtn(false)
        else setDisableBtn(true)
    },[email, password, isChecked])

    useEffect(() => {
        if(isExpiredPassword){
            toast.show({
                placement:'top',
                render:({id}) => {
                    return(
                        <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status='warning' variant='solid' backgroundColor={Colors.orange}>
                            <VStack space={1} flexShrink={1} w="100%" >
                                <HStack flexShrink={1} alignItems="center" justifyContent="space-between" >
                                    <HStack space={2} flexShrink={1} alignItems="center">
                                        <Alert.Icon/>
                                        <Text>La contraseña ha caducado</Text>
                                    </HStack>
                                </HStack>
                                <Text style={{marginLeft:20}}>Redireccionando a restablecer la contraseña...</Text>
                            </VStack>
                        </Alert>
                    )
                }
            })
            setTimeout(() => {
                navigation.navigate('UpdatePassword')
            },3000)
        }
    },[isExpiredPassword])




    return(
        <ScreenBaseAuth title="Bienvenido a nuestra era de digitalización">
            <View style={styles.contInputs}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.lblInput}>Código de identificación  </Text>
                    {/* <TouchableOpacity onPress={openModal}>
                        <AntDesign name="questioncircleo" size={16} color={Colors.darkBlue} />
                    </TouchableOpacity> */}
                </View>
                <Input value={email} setValue={(val) => dispatch(setValueEmail(val)) } keyboardType="numeric"/>
                <Text style={styles.lblInput}>Contraseña</Text>
                <Input value={password} setValue={(val) => dispatch(setValuePAssword(val))} secureTextEntry showEye={true}/>
            </View>
            <View style={styles.row}>
                <CheckBoxCustom 
                    isChecked={isChecked}
                    setChecked={() => dispatch(setValueCheckbox(!isChecked))}
                />
                
                {/* <Text style={styles.lblAcep}>Acepto los <Text style={styles.termsCond} onPress={() => navigation.navigate('ModalTerms')}>términos y condiciones</Text></Text> */}
                <Text style={styles.lblAcep}>Acepto los <Text style={styles.termsCond} onPress={() => Linking.openURL('https://www.gbidentity.com/docs/terms-conditions/').catch(err => console.error('No se pudo abrir la URL', err))}>términos y condiciones</Text></Text>
            </View>
            <TouchableOpacity 
                style={[styles.btnIn,{backgroundColor: disableBtn ? Colors.grayDark : Colors.darkBlue,}]} 
                disabled={disableBtn}
                onPress={() => dispatch(loginAction({email,password}))}>
                {loader ? <Spinner size={'sm'} color={'white'}></Spinner> :<Text style={styles.lblIn}>Ingresar</Text>}
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.btnIn,{backgroundColor: Colors.darkBlue,}]} 
                //disabled={disableBtn}
                onPress={() => {
                    dispatch(onResetCreateUser())
                    navigation.navigate('CreateUser')
                }}>
                <Text style={styles.lblIn}>Crear cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.center} 
                onPress={() => {
                    dispatch(onResetRecover())
                    navigation.navigate('RecoverPassword')
                }}>
                <>
                    <Text style={styles.lblRecover}>¿No recuerdas tus credenciales?</Text>
                    <Text style={styles.lblRecover}>Recupéralas aqui</Text>
                </>
            </TouchableOpacity>
            <ModalErrorLogin visible={modalActive} onClose={() => dispatch(closeModal({prop:'modalErrorLogin',value:false})) }/>
            
        </ScreenBaseAuth>
    )
}

const styles = StyleSheet.create({
    lblInput:{
        color:Colors.blue, 
        fontSize:getFontSize(16), 
        marginBottom:6,
        marginTop:10
    },
    homeInputs:{
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    contInputs:{
        marginTop:30, 
        marginBottom:30
    },
    row:{
        flexDirection:'row',
        marginBottom:30
    },
    center:{
        justifyContent:'center', 
        alignItems:'center'
    },
    btnIn:{
        //marginTop:30, 
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
        color:Colors.blue, 
        fontSize:getFontSize(14), 
        fontWeight:'400',
        textDecorationLine:'underline',
        textDecorationStyle:'solid',
        textShadowColor: Colors.white
    },
    lblAcep:{
        color:Colors.blue,
        fontSize:getFontSize(14), 
        fontWeight:'400',
        marginLeft:10, 
    },
    termsCond:{
        textDecorationLine:'underline', 
        textDecorationColor:Colors.blue
    }
})

export default LoginScreen;