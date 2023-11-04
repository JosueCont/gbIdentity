import React from "react";
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import ScreenBaseAuth from "../components/ScreenBaseAuth";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import Input from "../components/CustomInput";
import { Checkbox, Icon } from "native-base";
import { AntDesign } from '@expo/vector-icons'; 


const {height, width} = Dimensions.get('window');

const LoginScreen = () => {
    return(
        <ScreenBaseAuth title="Bienvenido a nuestra era de digitalización">
            <View style={styles.contInputs}>
                <Text style={styles.lblInput}>Correo electrónico / Código Colaborador</Text>
                <Input />
                <Text style={styles.lblInput}>Contraseña</Text>
                <Input />
            </View>
            <View style={styles.row}>
                <Checkbox colorScheme={'green'} color={'green'} icon={<Icon as={<AntDesign name="check"  color="black" />}/>}/>
                <Text style={{marginLeft:10, color:Colors.white,fontSize:getFontSize(14), fontWeight:400}}>Acepto los <Text style={{color:Colors.white,textDecorationLine:'underline', textDecorationColor:Colors.white}}>términos y condiciones</Text></Text>
            </View>
            <TouchableOpacity style={styles.btnIn}>
                <Text style={styles.lblIn}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.center}>
                <>
                    <Text style={styles.lblRecover}>No recuerdas tus credenciales</Text>
                    <Text style={styles.lblRecover}>Recuperalas aqui</Text>
                </>
            </TouchableOpacity>
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
        backgroundColor: Colors.darkBlue, 
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
        fontWeight:400
    }
})

export default LoginScreen;