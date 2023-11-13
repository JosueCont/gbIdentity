import React,{useState,useEffect} from "react";
import { FlatList, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Switch } from "native-base";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import HeaderContent from "../HeaderContent";
import Input from "../CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../store/ducks/authDuck";

const {height, width} = Dimensions.get('window');


const ProfilePage = ({backHome}) => {
    const dispatch = useDispatch();

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
                    <Input background={Colors.inputV2}/>
                    <Text style={[styles.txtPref,{marginBottom:10, marginTop:13}]}>Repita de nuevo su contraseña</Text>
                    <Input background={Colors.inputV2}/>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.lblBtn}>Cambiar contraseña</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => dispatch(logoutAction())}>
                <Text style={styles.lblOptions}>Cerrar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.lblOptions}>Solicitar eliminación de mis datos</Text>
            </TouchableOpacity>

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
        backgroundColor: Colors.blueText,
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