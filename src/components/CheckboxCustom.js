import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../utils/Colors";
import { Entypo } from '@expo/vector-icons';

const CheckBoxCustom = ({isChecked, setChecked}) => {
    return(
        <TouchableOpacity 
            onPress={setChecked}
            style={[styles.btn,{backgroundColor: isChecked ? Colors.green : Colors.gray, borderColor:Colors.blue }]}>
            {isChecked ? (
                <Entypo name="check" size={11} color={Colors.white}/>

            ): null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn:{
        width:15, 
        height:15, 
        justifyContent:'center', 
        alignItems:'center',
        elevation:1,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4
    }
})

export default CheckBoxCustom;
