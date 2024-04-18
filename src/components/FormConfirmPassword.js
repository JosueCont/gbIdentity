import React,{useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Spinner } from "native-base";
import Input from "./CustomInput";
import CustomButtom from "./CustomBtn";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import { validatePassword, setValuePAssword,setRepeatPassword, resetPassword, onValidatePassword } from "../store/ducks/authDuck";
import { useDispatch, useSelector } from "react-redux";

const FormConfirmPassword = ({isNewUser, title, isContainToken=''}) => {
    const dispatch = useDispatch();

    const password = useSelector(state => state.authDuck.password)
    const repeatPassword = useSelector(state => state.authDuck.repeatPassword)
    const userId = useSelector(state => state.authDuck.userId)
    const id = useSelector(state => state.authDuck.email)
    const loading = useSelector(state => state.authDuck.loading)
    const regex = useSelector(state => state.authDuck.regexPassword)
    const passwordConfig = useSelector(state => state.authDuck.passwordConfig)
    const isValidatePassword = useSelector(state => state.authDuck.isValidatePassword)
    const rules = useSelector(state => state.authDuck.rules)

    return(
        <View style={{marginTop:100}}>
            <View style={{marginBottom:20}}>
                <Text style={styles.lbl}>Ingrese su nueva contraseña</Text>
                <Input 
                    value={password} 
                    setValue={(val) => {
                        dispatch(setValuePAssword(val))
                        dispatch(onValidatePassword(val, regex, passwordConfig))
                    }}
                    secureTextEntry
                    showEye={true}/>

            </View>
            {!isValidatePassword && rules.length > 0 && 
                <View style={{marginBottom:10, }}>
                    <Text style={{color: Colors.red, fontSize: getFontSize(15), fontWeight: '700'}}>La contraseña debe tener:</Text>
                    {rules.map((item,index) => (
                        <View style={{marginBottom:5,}} key={index}>
                            <Text style={{color: Colors.red, fontSize: getFontSize(13)}}>- {item?.message}</Text>
                        </View>
                    ))}
                </View>
            }
            <View style={{marginBottom:20}}>
                <Text style={styles.lbl}>Escriba nuevamente su contraseña</Text>
                <Input 
                    value={repeatPassword} 
                    setValue={(val) => dispatch(setRepeatPassword(val)) }
                    secureTextEntry
                    showEye={true}/>

            </View>
            <CustomButtom 
                loading={loading}
                isDisabled={!(password != '' && repeatPassword !='' && isValidatePassword)}
                title={title} 
                onPressed={() => dispatch(validatePassword({password, repeatPassword, userId, isNewUser, id, isContainToken}))} 
            />

        </View>
    )
}

const styles = StyleSheet.create({
    lbl:{
        color:Colors.blue, 
        fontSize:getFontSize(16), 
        marginBottom:6,
        //marginTop:100
    },
})

export default FormConfirmPassword;