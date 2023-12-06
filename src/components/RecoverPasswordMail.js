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

    const [date, setDate] = useState(new Date());
    const [ingressDate, setIngressDate] = useState(new Date());
    const [birthdayDate, setBirthdayDate] = useState('')
    const [ingress, setIngress] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePickerBirthday, setShowDatePickerBirthdat] = useState(false)
    const [disabledButon, setDisble] = useState(false)

    useEffect(() => {
        if(email != '' && ingress != '' && birthdayDate != '') setDisble(false)
        else setDisble(true)
    },[email, ingress,birthdayDate])

    useEffect(() => {
        if(isChangedPassword){
            setTimeout(() => {
                navigation.navigate('Login')
            },3000)
        }
    },[isChangedPassword])


    const onShowDatepicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const onShowDatePickerBirthDay = () => {
        setShowDatePickerBirthdat(!showDatePickerBirthday)
    }

    const handleDateChange = ({type}, selectedDate) => {
        console.log('event',type)
        if(type === 'set'){
            const currentDate = selectedDate || date;
            setIngressDate(currentDate);
            if(Platform.OS === 'android'){
                setIngress(moment(currentDate.toDateString()).format('DD MMMM YYYY'))
                onShowDatepicker()
            }
            //setShowDatePicker(false);

        }else{
            //onShowDatepicker()
            console.log('entro aqui')
        }
    };

    const handleDateChangeBirthDay = ({type}, selectedDate) => {
        console.log('event',type)
        if(type === 'set'){
            const currentDate = selectedDate || date;
            setDate(currentDate);
            if(Platform.OS === 'android'){
                setBirthdayDate(moment(currentDate.toDateString()).format('DD MMMM YYYY'))
                onShowDatePickerBirthDay()
            }
            //setShowDatePicker(false);

        }else{
            //onShowDatepicker()
            console.log('entro aqui')
        }
    };
    const confirmIOSDate = (type) => {
        if(type === 'ingress'){
            setIngress(moment(ingressDate.toDateString()).format('DD MMMM YYYY'))
            onShowDatepicker()

        }else{
            setBirthdayDate(moment(date.toDateString()).format('DD MMMM YYYY'))
            onShowDatePickerBirthDay()
        }
    }

    return(
        <>
            {isValidMail ? !isChangedPassword ? (
                <View style={{marginTop:100}}>
                    <View style={{marginBottom:20}}>
                        <Text style={styles.lbl}>Ingrese su nueva contraseña</Text>
                        <Input 
                            value={password} 
                            setValue={(val) => dispatch(setValuePAssword(val)) }
                            secureTextEntry/>

                    </View>
                    <View style={{marginBottom:20}}>
                        <Text style={styles.lbl}>Escriba nuevamente su contraseña</Text>
                        <Input 
                            value={repeatPassword} 
                            setValue={(val) => dispatch(setRepeatPassword(val)) }
                            secureTextEntry/>

                    </View>
                    <CustomButtom title='Recuperar' onPressed={() => dispatch(validatePassword({password, repeatPassword, userId}))} />

                </View>
            ):
            (
                <>
                    <CardRecover>
                        <Text style={{fontSize:getFontSize(25), color:Colors.grayDark, fontWeight:'700', textAlign:'center'}}>Se ha actualizado la contraseña</Text>
                        <AntDesign name="checkcircle" size={120} color={Colors.lightBlue} />
                        {/*<Image source={require('../../assets/mail.png')} style={styles.imgMail}/>*/}
                    </CardRecover>
                    {/*<CustomButtom title='De acuerdo' onPressed={() => navigation.navigate('Login')} />*/}
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
                            {showDatePicker && (
                                <DateTimePicker
                                    style={{width:width/1.27,}}
                                    locale="es-ES"
                                    value={date}
                                    mode="date"
                                    display="spinner"
                                    onChange={handleDateChange}
                                    //maximumDate={new Date().getDate()}
                                />
                            )}
                            {showDatePicker && Platform.OS === 'ios' && (
                                <View style={{flexDirection:'row',justifyContent:'space-between', width: width/2,  alignSelf:'center'}}>
                                    <TouchableOpacity onPress={onShowDatepicker} style={{padding:10, backgroundColor:Colors.red, borderRadius:10}}>
                                        <Text>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => confirmIOSDate('ingress')} style={{padding:10, backgroundColor:Colors.white, borderRadius:10}}>
                                        <Text>Confirmar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {!showDatePicker  && (
                                <Pressable onPress={onShowDatepicker}>
                                    <Input 
                                        placeholder='DD MMMM YYYY' 
                                        editable={false} 
                                        onPressIn={onShowDatepicker}
                                        value={ingress} 
                                        //setValue={(val) => dispatch(setValueEmail(val)) }
                                    />

                                </Pressable>
                            )}

                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={styles.lbl}>Fecha de nacimiento</Text>
                            {showDatePickerBirthday && (
                                <DateTimePicker
                                    style={{width:width/1.27,}}
                                    locale="es-ES"
                                    value={date}
                                    mode="date"
                                    display="spinner"
                                    onChange={handleDateChangeBirthDay}
                                    //maximumDate={new Date().getDate()}
                                />
                            )}
                            {showDatePickerBirthday && Platform.OS === 'ios' && (
                                <View style={{flexDirection:'row',justifyContent:'space-between', width: width/2,  alignSelf:'center'}}>
                                    <TouchableOpacity onPress={onShowDatePickerBirthDay} style={{padding:10, backgroundColor:Colors.red, borderRadius:10}}>
                                        <Text>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => confirmIOSDate('birth')} style={{padding:10, backgroundColor:Colors.white, borderRadius:10}}>
                                        <Text>Confirmar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {!showDatePickerBirthday  && (
                                <Pressable onPress={onShowDatePickerBirthDay}>
                                    <Input 
                                        placeholder='DD MMMM YYYY' 
                                        editable={false} 
                                        onPressIn={onShowDatePickerBirthDay}
                                        value={birthdayDate} 
                                        //setValue={(val) => dispatch(setValueEmail(val)) }
                                    />

                                </Pressable>
                            )}

                        </View>
                        <CustomButtom 
                            title='Siguiente'  
                            onPressed={() => dispatch(onValidateCollaborator({email,ingress: moment(ingress, 'DD MMMM YYYY').format('YYYY-MM-DD'), birthdayDate: moment(birthdayDate, 'DD MMMM YYYY').format('YYYY-MM-DD') }))} 
                            loading={loader} 
                            isDisabled={disabledButon}
                        />
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