import React,{useEffect,useState} from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { Colors } from "../../utils/Colors";
import { useSelector } from "react-redux";
import { getFontSize } from "../../utils/functions";

const {height, width} = Dimensions.get('window');

const ModalErrorLogin = ({visible, setVisible, onClose}) => {
    const message = useSelector(state => state.authDuck.message)

    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.card}>
                    <MaterialIcons name="error" size={60} color={Colors.red} />
                    <Text style={styles.text}>{message}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.btn}>
                        <Text style={styles.lblBtn}>Entendido</Text>
                    </TouchableOpacity>
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
        height: height/3 ,
        backgroundColor: Colors.white, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:15, 
        paddingHorizontal:10
    },
    text:{
        fontSize: getFontSize(16), 
        textAlign:'center', 
        marginBottom:20
    },
    btn:{
        width: width/1.4, 
        backgroundColor: Colors.darkBlue, 
        height:50, 
        justifyContent:'center', 
        alignItems:'center',
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(18)
    }
})

export default ModalErrorLogin;