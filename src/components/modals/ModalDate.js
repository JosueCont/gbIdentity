import React,{useEffect,useState} from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { Colors } from "../../utils/Colors";
import { useSelector } from "react-redux";
import { getFontSize } from "../../utils/functions";
import DateTimePicker from '@react-native-community/datetimepicker'

const {height, width} = Dimensions.get('window');

const ModalDate = ({visible, onClose, type}) => {
    return(
        <Modal
            visible={visible} animationType='slide' transparent>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text>Selecciona tu {type}</Text>
                        <View style={{width: width, height:7, backgroundColor: Colors.grayDark, marginBottom:10}}/>
                        <DateTimePicker
                            style={{width:width/1.27,}}
                            locale="es-ES"
                            value={date}
                            mode="date"
                            display="spinner"
                            onChange={handleDateChange}
                            //maximumDate={new Date().getDate()}
                        />

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
        alignItems:'center', 
        borderRadius:15, 
        paddingHorizontal:10,
        padding:12
    },
})