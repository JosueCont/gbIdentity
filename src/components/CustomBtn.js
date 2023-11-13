import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions, Text } from "react-native";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import { Spinner } from "native-base";


const {height, width} = Dimensions.get('window');

const CustomButtom = ({title, onPressed, loading=false, isDisabled=false}) => {
    return(
        <TouchableOpacity style={[styles.btn,{backgroundColor: isDisabled ? Colors.grayDark : Colors.darkBlue, }]} onPress={onPressed}  disabled={isDisabled}>
            {loading ? <Spinner size={'sm'} color={'white'}></Spinner> : <Text style={styles.lbl}>{title}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn:{
        marginTop:20, 
        width: width/1.27, 
        height:50, 
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
    lbl:{
        color: Colors.white, 
        fontSize:getFontSize(20)
    }
})

export default CustomButtom;