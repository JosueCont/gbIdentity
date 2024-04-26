import React,{useState,useEffect} from "react";
import { FlatList, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity, Switch, Linking } from "react-native";
import { Spinner } from "native-base";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import HeaderContent from "../HeaderContent";
import Input from "../CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, setValuePAssword, setRepeatPassword, onValidatePassword } from "../../store/ducks/authDuck";
import { getInfoCredentials, putCredentials } from "../../utils/ApiApp";
import { openModalHome, closeModalHome } from "../../store/ducks/homeDuck";
import ModalAlertConfirm from "../modals/ModalAlert";
import { onChageModalPreferences, onChangePasswordLogged, onChangeText, onDeleteProfile, updatePreferences } from "../../store/ducks/preferencesDuck";
import ModalAlertFailed from "../modals/ModalFailed";
import ModalAlertSuccess from "../modals/ModalSucess";

const {height, width} = Dimensions.get('window');


const ProfilePage = ({backHome}) => {
    const dispatch = useDispatch();
    const [disableBtn, setDisable] = useState(true)
    const password = useSelector(state => state.preferencesDuck.password)
    const repeatPassword = useSelector(state => state.preferencesDuck.repeatPassword)
    const user = useSelector(state => state.authDuck.dataUser)
    const modalConfirm = useSelector(state => state.homeDuck.modalConfirm)
    const isCloseSession = useSelector(state => state.homeDuck.isCloseSession)
    const preferences = useSelector(state => state.preferencesDuck.preferences)
    const receiveNotifications = useSelector(state => state.preferencesDuck.receiveNotifications)
    const userId = useSelector(state => state.authDuck?.dataUser?.id)
    const isDisabled = useSelector(state => state.preferencesDuck.loading)
    const modalDelete = useSelector(state => state.preferencesDuck.modalDeleteProfile)
    const message = useSelector(state => state.homeDuck.message)
    const messagePreferences = useSelector(state => state.preferencesDuck.message)
    const modalFailed = useSelector(state => state.preferencesDuck.modalFailed)
    const modalSuccess = useSelector(state => state.preferencesDuck.modalSucess)
    const loader = useSelector(state => state.preferencesDuck.loading)
    const regex = useSelector(state => state.authDuck.regexPassword)
    const passwordConfig = useSelector(state => state.authDuck.passwordConfig)
    const isValidatePassword = useSelector(state => state.authDuck.isValidatePassword)
    const rules = useSelector(state => state.authDuck.rules)
    const bcConfiguration = useSelector(state => state.preferencesDuck.bcConfiguration)
    const [disableIne, setDisableIne] = useState(false)
    const [disableCurp, setDisableCurp] = useState(false)
    const [disableNss, setDisableNss] = useState(false)


    useEffect(() => {
        if(password != '' && repeatPassword != '' && isValidatePassword) setDisable(false)
        else setDisable(true)
    },[password, repeatPassword])

    useEffect(() => {
        console.log('recibr noticicaiones', receiveNotifications)
    },[receiveNotifications])

    useEffect(() => {
        getInfoCredential()
    },[])

    const getInfoCredential = async() => {
        try {
            
            const response = await getInfoCredentials(userId)
            dispatch(onChangeText({prop:'bcConfiguration', value: response?.data?.bcConfiguration}))
            console.log('credentials',response?.data)
        } catch (e) {
            console.log('errorr credentials',e)
        }
    }

    const onChangeSwitch = async(val) => {
        await dispatch(updatePreferences({userId, receiveNotifications: val}))
    }

    const onDelete = async() => {
        await dispatch(onDeleteProfile(userId))
    }

    const onChangePassword = () => {
        if(password.localeCompare(repeatPassword) === 0){
            dispatch(openModalHome({prop:'modalConfirm', value: true,message:'¿Desea cambiar de contraseña?'}))
        }else{
            dispatch(onChageModalPreferences({prop:'modalFailed', value: true, message:'Las contraseñas no son iguales'}))
        }
    }

    const onChangeSwitchCredential = async(key, val) => {
        try {
            for(let valueKEy in bcConfiguration){
                if(valueKEy === key) bcConfiguration[valueKEy] = val
            }
            let dataSend = {
                userId,
                bcConfiguration: bcConfiguration
            }
            const response = await putCredentials(dataSend)
            dispatch(onChangeText({prop:'bcConfiguration', value: response?.data?.bcConfiguration}))
        } catch (e) {
            console.log('error',e)
        }
    }

    return(
        <View style={styles.container}>
            <HeaderContent isVisibleTitle={true} goBack={backHome} title="Mis preferencias"/>
            <View style={[styles.card,{  marginBottom:14}]}>
                <Text style={styles.title}>Preferencias</Text>
                <View style={styles.contPref}>
                    <Text style={styles.txtPref}>Recibir notificaciones</Text>
                    <Switch 
                        trackColor={{true: Colors.green, false: Colors.gray}}
                        thumbColor={receiveNotifications ? Colors.greenStrong : Colors.gray}
                        disabled={isDisabled}
                        style={{ transform:[{ scaleX: .7 }, { scaleY: .7 }] }}
                        //size={'sm'} 
                        //colorScheme={'green'} 
                        value={receiveNotifications}
                        onValueChange={(val) => onChangeSwitch(val)}/>
                </View>
                <View>
                    <Text style={{color: Colors.red, fontSize: getFontSize(16), fontWeight:'700'}}>Datos a mostrar en la tarjeta</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>
                        <Text style={styles.txtPref}>RFC</Text>
                        <Switch 
                            trackColor={{true: Colors.green, false: Colors.gray}}
                            thumbColor={bcConfiguration?.showBirthDate ? Colors.greenStrong : Colors.gray}
                            disabled={isDisabled}
                            style={{ transform:[{ scaleX: .7 }, { scaleY: .7 }] }}
                            //size={'sm'} 
                            //colorScheme={'green'} 
                            value={bcConfiguration?.showBirthDate}
                            onValueChange={(val) => onChangeSwitchCredential('showBirthDate',val)}
                        />
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={styles.txtPref}>CURP</Text>
                        <Switch 
                            trackColor={{true: Colors.green, false: Colors.gray}}
                            thumbColor={bcConfiguration?.showCurp ? Colors.greenStrong : Colors.gray}
                            disabled={isDisabled}
                            style={{ transform:[{ scaleX: .7 }, { scaleY: .7 }] }}
                            //size={'sm'} 
                            //colorScheme={'green'} 
                            value={bcConfiguration?.showCurp}
                            onValueChange={(val) => onChangeSwitchCredential('showCurp',val)}
                        />
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={styles.txtPref}>NSS</Text>
                        <Switch 
                            trackColor={{true: Colors.green, false: Colors.gray}}
                            thumbColor={bcConfiguration?.showNss ? Colors.greenStrong : Colors.gray}
                            disabled={isDisabled}
                            style={{ transform:[{ scaleX: .7 }, { scaleY: .7 }] }}
                            //size={'sm'} 
                            //colorScheme={'green'} 
                            value={bcConfiguration?.showNss}
                            onValueChange={(val) => onChangeSwitchCredential('showNss',val)}
                        />
                    </View>
                </View>
                <Text style={styles.lblAcep} onPress={() => Linking.openURL('https://www.gbidentity.com/docs/terms-conditions/').catch(err => console.error('No se pudo abrir la URL', err))}>Consultar los términos y condiciones</Text>

            </View>
            <View style={[styles.card,{paddingVertical:14, marginBottom:30}]}>
                <Text style={styles.title}>Cambiar mi contraseña</Text>
                <View style={{marginTop:21, marginBottom:14}}>
                    <Text style={[styles.txtPref,{marginBottom:10}]}>Ingrese su nueva contraseña</Text>
                    <Input 
                        background={Colors.inputV2} 
                        showEye={true}
                        value={password} 
                        setValue={(value) => {
                            dispatch(onChangeText({prop: 'password',value}))
                            dispatch(onValidatePassword(value, regex, passwordConfig))
                        }} 
                        secureTextEntry
                    />

                    {!isValidatePassword && rules.length > 0 && 
                        <View style={{marginVertical:10, }}>
                            <Text style={{color: Colors.black, fontSize: getFontSize(15), fontWeight: '700'}}>La contraseña debe tener:</Text>
                            {rules.map((item,index) => (
                                <View style={{marginBottom:5,}} key={index}>
                                    <Text style={{color: Colors.red, fontSize: getFontSize(13)}}>- {item?.message}</Text>
                                </View>
                            ))}
                        </View>
                    }
                    <Text style={[styles.txtPref,{marginBottom:10, marginTop:13}]}>Confirme su nueva contraseña</Text>
                    <Input 
                        background={Colors.inputV2} 
                        showEye={true}
                        value={repeatPassword} 
                        setValue={(value) => dispatch(onChangeText({prop:'repeatPassword', value}))} 
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity 
                    style={[styles.btn,{backgroundColor: disableBtn ? Colors.grayDark : Colors.blueText,}]} 
                    disabled={disableBtn} 
                    onPress={() => onChangePassword()}>
                    {loader ? <Spinner size={'sm'} color={Colors.white} />: <Text style={styles.lblBtn}>Cambiar contraseña</Text>}
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity onPress={() =>{
                dispatch(openModalHome({
                    prop:'modalConfirm', 
                    value:true, 
                    message:'¿Deseas cerrar sesión?',
                    close: true
                }))
            }}>
                <Text style={styles.lblOptions}>Cerrar sesión</Text>
            </TouchableOpacity> */}
            <TouchableOpacity 
                onPress={() => {
                    dispatch(onChageModalPreferences({
                        prop:'modalDeleteProfile', value: true,
                        message:'¿Está seguro de querer eliminar su cuenta?'
                    }))
                }}>
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
                        isCloseSession ? dispatch(logoutAction()) : dispatch(onChangePasswordLogged({userId, password}))
                    },500)
                }}
                message={message}
            />
            <ModalAlertConfirm 
                visible={modalDelete}
                message={messagePreferences}
                onClose={() => dispatch(onChageModalPreferences({prop:'modalDeleteProfile', value: false,}))}
                setConfirm={() => {
                    dispatch(onChageModalPreferences({prop:'modalDeleteProfile', value: false,}))
                    setTimeout(() => {
                       onDelete()
                    },500)
                }}
            />
            <ModalAlertFailed 
                visible={modalFailed}
                message={messagePreferences}
                setVisible={() => {
                    dispatch(onChageModalPreferences({prop:'modalFailed', value: false}))
                }}
            />
            <ModalAlertSuccess 
                visible={modalSuccess}
                message={messagePreferences}
                setVisible={() => {
                    dispatch(onChageModalPreferences({prop:'modalSucess', value: false}))
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
        paddingHorizontal:25,
        paddingTop:25,
        paddingBottom:10,
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
        marginTop:9,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:15
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
    },
    lblAcep:{
        color:Colors.red,
        fontSize:getFontSize(14), 
        fontWeight:'400',
        marginLeft:10, 
        textDecorationLine:'underline', 
        textDecorationColor:Colors.red,
        textAlign:'center', 
        marginTop:10
    }
})

export default ProfilePage;