import React,{useEffect,useState} from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { Colors } from "../../utils/Colors";
import { useSelector } from "react-redux";
import { getFontSize } from "../../utils/functions";

const {height, width} = Dimensions.get('window');

const ModalAlertConfirm = ({visible, setConfirm, onClose, message}) => {
    return(
        <Modal visible={visible} animationType='slide' transparent>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image source={require('../../../assets/logoBimbo.png')} style={styles.img}/>
                    <Text style={styles.txt}>{message}</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between',paddingHorizontal:10, flex:1, alignItems:'center', width:'70%'}}>
                        <TouchableOpacity onPress={onClose} style={[styles.btn,{ backgroundColor: Colors.red, }]}>
                            <Text style={styles.lblBtn}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={setConfirm} style={[styles.btn, { backgroundColor: Colors.darkBlue, }]}>
                            <Text style={styles.lblBtn}>Sí</Text>
                        </TouchableOpacity>

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
    img:{
        width:100, 
        height:50, 
        resizeMode:'contain', 
        marginBottom:20
    },
    txt:{
        fontSize: getFontSize(20),
        fontWeight:'400',
        marginBottom:20
    },
    btn:{
        width: width/5, 
        height:50, 
        justifyContent:'center', 
        alignItems:'center',
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(18)
    },
    card:{
        width: width/1.2,
        height: height/3 ,
        backgroundColor: Colors.white, 
        alignItems:'center', 
        borderRadius:15, 
        paddingHorizontal:10,
        padding:12
    },
})

export default ModalAlertConfirm;