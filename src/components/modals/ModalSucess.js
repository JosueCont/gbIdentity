import React,{useEffect,useState} from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import { AntDesign } from '@expo/vector-icons';

const {height, width} = Dimensions.get('window');

const ModalAlertSuccess = ({visible, setVisible, message}) => {
    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.card}>
                    <AntDesign name="checkcircleo" size={50} color={Colors.green} />
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity style={styles.btn} onPress={setVisible}>
                        <Text style={styles.txtBtn}>Continuar</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
} 

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.5)', 
        flex:1, 
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        width: width/1.3,
        //height: height/4,
        backgroundColor: Colors.white,
        borderRadius:20,
        alignItems:'center',
        paddingVertical:20,
        paddingHorizontal:10
    },
    message:{
        marginBottom:18, 
        marginTop:15, 
        fontSize: getFontSize(16), 
        fontWeight:'700', 
        color: Colors.grayDark, 
        textAlign:'center'
    },
    btn:{
        width:120, 
        height:40, 
        backgroundColor:Colors.darkBlue, 
        borderRadius:8, 
        justifyContent:'center', 
        alignItems:'center'
    },
    txtBtn:{
        fontSize: getFontSize(16), 
        fontWeight:'700', 
        color:Colors.white
    }

})

export default ModalAlertSuccess;