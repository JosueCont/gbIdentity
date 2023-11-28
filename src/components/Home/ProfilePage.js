import React,{useState,useEffect} from "react";
import { FlatList, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Switch } from "native-base";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import HeaderContent from "../HeaderContent";
import Input from "../CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, setValuePAssword, setRepeatPassword } from "../../store/ducks/authDuck";
import { openModalHome, closeModalHome } from "../../store/ducks/homeDuck";
import ModalAlertConfirm from "../modals/ModalAlert";

const {height, width} = Dimensions.get('window');


const ProfilePage = ({backHome}) => {
    const dispatch = useDispatch();
    const [disableBtn, setDisable] = useState(true)
    const password = useSelector(state => state.authDuck.password)
    const repeatPassword = useSelector(state => state.authDuck.repeatPassword)
    const user = useSelector(state => state.authDuck.dataUser)
    const modalConfirm = useSelector(state => state.homeDuck.modalConfirm)
    const isCloseSession = useSelector(state => state.homeDuck.isCloseSession)


    useEffect(() => {
        if(password != '' && repeatPassword != '') setDisable(false)
        else setDisable(true)
    },[password, repeatPassword])

    //dispatch(resetPassword({password, repeatPassword, user})) dispatch(logoutAction())

    return(
        <View style={styles.container}>
            <HeaderContent isVisibleTitle={true} goBack={backHome} title="Mis preferencias"/>
            <View style={[styles.card,{ height:height/3.5, marginBottom:14}]}>
                <Text style={styles.title}>Preferencias</Text>
                <View style={styles.contPref}>
                    <Text style={styles.txtPref}>Recibir notificaciones</Text>
                    <Switch size={'sm'} colorScheme={'green'}/>
                </View>
            </View>
            <View style={[styles.card,{height: height/2.1, marginBottom:30}]}>
                <Text style={styles.title}>Cambiar mi contraseña</Text>
                <View style={{marginTop:21, marginBottom:14}}>
                    <Text style={[styles.txtPref,{marginBottom:10}]}>Ingresar su nueva contraseña</Text>
                    <Input background={Colors.inputV2} value={password} setValue={(val) => dispatch(setValuePAssword(val))} secureTextEntry/>
                    <Text style={[styles.txtPref,{marginBottom:10, marginTop:13}]}>Repita de nuevo su contraseña</Text>
                    <Input background={Colors.inputV2} value={repeatPassword} setValue={(val) => dispatch(setRepeatPassword(val))} secureTextEntry/>
                </View>
                <TouchableOpacity 
                    style={[styles.btn,{backgroundColor: disableBtn ? Colors.grayDark : Colors.blueText,}]} 
                    disabled={disableBtn} 
                    onPress={() => dispatch(openModalHome({prop:'modalConfirm', value: true,message:'¿Desea cambiar de contraseña?'}))}>
                    <Text style={styles.lblBtn}>Cambiar contraseña</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() =>{
                dispatch(openModalHome({
                    prop:'modalConfirm', 
                    value:true, 
                    message:'¿Deseas cerrar sesión?',
                    close: true
                }))
            }}>
                <Text style={styles.lblOptions}>Cerrar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.lblOptions}>Solicitar eliminación de mis datos</Text>
            </TouchableOpacity>

            <ModalAlertConfirm 
                visible={modalConfirm}
                onClose={() => {
                    dispatch(closeModalHome({prop:'modalConfirm', value:false, }))
                }}
                setConfirm={() => {
                    dispatch(closeModalHome({prop:'modalConfirm', value:false, }))
                    setTimeout(() => {
                        isCloseSession ? dispatch(logoutAction()) : console.log('Cambiar de contraseña')
                    },500)
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    card:{
        width: width/1.1,
        backgroundColor: Colors.white,
        borderRadius:20,
        padding:25,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    title:{
        color: Colors.red,
        fontSize: getFontSize(24),
        fontWeight:'700'
    },
    contPref:{
        marginTop:29,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    txtPref:{
        color: Colors.blueText,
        fontSize: getFontSize(15),
        fontWeight:'400'
    },
    btn:{
        paddingVertical:16,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7,
        width: width/1.27
    },
    lblBtn:{
        color: Colors.white,
        fontSize: getFontSize(15), 
        fontWeight:'400'
    },
    lblOptions:{
        fontSize: getFontSize(15),
        color: Colors.white,
        fontWeight:'400',
        textDecorationLine:'underline',
        marginBottom:20
    }
})

export default ProfilePage;