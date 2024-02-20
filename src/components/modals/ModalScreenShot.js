import React,{useEffect,useState} from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { Colors } from "../../utils/Colors";
import { useSelector } from "react-redux";
import { getFontSize } from "../../utils/functions";

const {height, width} = Dimensions.get('window');

const ModalScreenShot = ({visible, setVisible}) => {
    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.card}>
                        <Image source={require('../../../assets/logoBimbo.png')} style={styles.logo}/>
                    <View style={{alignItems:'center'}}>
                        <Ionicons name="alert-circle" size={100} color={Colors.red} /> 
                        <Text style={styles.title}>¡Atención!</Text>   
                        <Text style={styles.desc}>
                            Por su seguridad, no se permiten capturas de pantalla dentro de la aplicación. 
                            Le recomendamos borrar la captura de su dispositivo móvil cuanto antes. Gracias
                        </Text>
                        <TouchableOpacity 
                            onPress={setVisible}
                            style={styles.btn}>
                            <Text style={styles.lblBtn}>Entendido</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection:'row',}}>
                        <View style={[styles.itemColorRow,{backgroundColor:Colors.blue2}]}/>
                        <View style={[styles.itemColorRow,{backgroundColor:Colors.red}]}/>
                        <View style={[styles.itemColorRow,{backgroundColor:Colors.darkBlue}]}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.8)', 
        flex:1, 
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        width: width/1.2,
        paddingVertical:14,
        backgroundColor: Colors.white, 
        //alignItems:'center', 
        borderRadius:15, 
        paddingHorizontal:10,
        padding:12
    },
    itemColorRow:{
        width:52, 
        height:8,
        marginBottom:2,
        marginRight:3
    },
    logo:{
        width:100, 
        height:40, 
        resizeMode:'contain'
    },
    title:{
        color: Colors.darkBlue, 
        fontSize: getFontSize(32), 
        fontWeight:'700', 
        marginBottom:10
    },
    desc:{
        textAlign:'center', 
        fontSize: getFontSize(18)
    },
    btn:{
        paddingVertical:15, 
        paddingHorizontal:40, 
        backgroundColor: Colors.blue, 
        borderRadius:8, 
        marginVertical:20
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(13), 
        fontWeight:'400'
    }
})

export default ModalScreenShot;