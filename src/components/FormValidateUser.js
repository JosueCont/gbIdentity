import React,{useState, useEffect} from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Platform, Pressable } from "react-native";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import Input from "./CustomInput";
import CustomButtom from "./CustomBtn";
import CardRecover from "./CardRecoverPassword";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { onRecoveryPassword, setValueEmail, changeInput,closeModal, onValidateCollaborator, setValuePAssword, setRepeatPassword,validatePassword } from "../store/ducks/authDuck";
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';

const {height, width} = Dimensions.get('window');

const FormValidateUser = ({isNewUser}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const email = useSelector(state => state.authDuck.email)
    const userId = useSelector(state => state.authDuck.userId)
    const loader = useSelector(state => state.authDuck.loading)

    const ingress = useSelector(state => state.authDuck.ingress)
    const birthdayDate = useSelector(state => state.authDuck.birthdayDate)

    const [date, setDate] = useState(new Date());
    const [ingressDate, setIngressDate] = useState(new Date());
    //const [birthdayDate, setBirthdayDate] = useState('')
    //const [ingress, setIngress] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePickerBirthday, setShowDatePickerBirthdat] = useState(false)
    const [disabledButon, setDisble] = useState(false)

    useEffect(() => {
        if(email != '' && ingress != '' && birthdayDate != '') setDisble(false)
        else setDisble(true)
    },[email, ingress,birthdayDate])

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
                dispatch(changeInput({prop:'ingress',value:(moment(currentDate.toDateString()).format('DD MMMM YYYY'))}))
                //setIngress(moment(currentDate.toDateString()).format('DD MMMM YYYY'))
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
                dispatch(changeInput({prop:'birthdayDate', value:moment(currentDate.toDateString()).format('DD MMMM YYYY')}))
                //setBirthdayDate(moment(currentDate.toDateString()).format('DD MMMM YYYY'))
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
            dispatch(changeInput({prop:'ingress',value:(moment(ingressDate.toDateString()).format('DD MMMM YYYY'))}))
            //setIngress(moment(ingressDate.toDateString()).format('DD MMMM YYYY'))
            onShowDatepicker()

        }else{
            dispatch(changeInput({prop:'birthdayDate', value:moment(date.toDateString()).format('DD MMMM YYYY')}))
            //setBirthdayDate(moment(date.toDateString()).format('DD MMMM YYYY'))
            onShowDatePickerBirthDay()
        }
    }

    return(
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
                    <View style={styles.contIosPicker}>
                        <TouchableOpacity onPress={onShowDatepicker} style={styles.btnCancel}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => confirmIOSDate('ingress')} style={styles.btnOk}>
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
                    <View style={styles.contIosPicker}>
                        <TouchableOpacity onPress={onShowDatePickerBirthDay} style={styles.btnCancel}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => confirmIOSDate('birth')} style={styles.btnOk}>
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
                onPressed={() => {
                    dispatch(onValidateCollaborator({
                        email,
                        ingress: moment(ingress, 'DD MMMM YYYY').format('YYYY-MM-DD'), 
                        birthdayDate: moment(birthdayDate, 'DD MMMM YYYY').format('YYYY-MM-DD'), 
                        isNewUser 
                    }))
                }} 
                loading={loader} 
                isDisabled={disabledButon}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    lbl:{
        color:Colors.white, 
        fontSize:getFontSize(16), 
        marginBottom:6,
        //marginTop:100
    },
    contIosPicker:{
        flexDirection:'row',
        justifyContent:'space-between', 
        width: width/2,  
        alignSelf:'center'
    },
    btnCancel:{
        padding:10, 
        backgroundColor:Colors.red, 
        borderRadius:10
    },
    btnOk:{
        padding:10, 
        backgroundColor:Colors.white, 
        borderRadius:10
    }
})

export default FormValidateUser;