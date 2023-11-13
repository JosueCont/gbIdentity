import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { getFontSize } from "../utils/functions";

const {height, width} = Dimensions.get('window');

const CardRecover = ({children}) => {
    return(
        <View style={styles.card}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width: width/1.27, 
        height:height/2, 
        backgroundColor:'#F1F0F6',
        borderRadius:15,
        marginTop:40,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:24,
        paddingTop:10
    },
    imgMail:{
        width: 120,
        height:120,
        resizeMode:'contain',
        marginBottom:30
    }
})

export default CardRecover;