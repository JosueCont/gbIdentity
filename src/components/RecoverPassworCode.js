import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import ScreenBaseAuth from "./screensBase/ScreenBaseAuth";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import Input from "./CustomInput";
import CustomButtom from "./CustomBtn";
import CardRecover from "./CardRecoverPassword";
import { useNavigation } from "@react-navigation/core";

const RecoverPasswordCode = () => {
    const navigation = useNavigation()
    const [isValidateCode, setValidateCode] = useState(false)

    const onValidateCode = () => {
        setValidateCode(true)
    }
    return(
        <>
            {isValidateCode ? (
                <>
                    <CardRecover>
                        <Image source={require('../../assets/OkIcon.png')} style={styles.img}/>
                        <Text style={[styles.text,{marginBottom:15}]}>Hemos generado correctamente su solicitud de recuperación de contraseña.</Text>
                        <Text style={styles.text}>En los próximos días nuestra área de Recursos Humanos se comunicará con usted para darle sus nuevos accesos.</Text>
                    </CardRecover>
                    <CustomButtom title='De acuerdo' onPressed={() => navigation.navigate('Login')} />
                </>
            ):(
                <View style={{marginTop:100}}>
                    <Text style={styles.lbl}>Ingrese su número de colaborador</Text>
                    <Input />
                    <CustomButtom title='Recuperar' onPressed={() => onValidateCode()} />
                </View>
            )}

        </>
    )
}

const styles = StyleSheet.create({
    img:{
        width:120,
        height:120,
        resizeMode:'contain',
        marginBottom:35
    },
    lbl:{
        color:Colors.white, 
        fontSize:getFontSize(16), 
        marginBottom:6,
    },
    text:{
        color:Colors.lightBlack, 
        fontSize:getFontSize(16), 
        fontWeight:'400', 
        textAlign:'center'
    }
})

export default RecoverPasswordCode;