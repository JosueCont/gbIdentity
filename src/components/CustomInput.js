import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../utils/Colors";

const {height, width} = Dimensions.get('window');

const Input = ({value, setValue, background = Colors.whiteInput, ...props}) => {
    return(
        <TextInput onChangeText={setValue} value={value} style={[styles.input,{backgroundColor: background,}]} {...props}/>
    )
}

const styles = StyleSheet.create({
    input:{
        width:width/1.27, 
        height: 50,  
        borderRadius:8, 
        padding:7
    }
})

export default Input;