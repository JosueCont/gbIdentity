import React,{useState,useEffect} from "react";
import { FlatList, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import { MaterialIcons } from '@expo/vector-icons';


const {height, width} = Dimensions.get('window');


const HeaderContent = ({title='', isVisibleTitle, goBack}) => {
    return(
        <View style={styles.contHeader}>
            <TouchableOpacity onPress={goBack} >
                {/*<Image source={require('../../assets/back.png')} style={styles.img}/>*/}
                <MaterialIcons name="arrow-back-ios" size={24} color={Colors.white} />

            </TouchableOpacity>
            {isVisibleTitle ? <Text style={styles.txt} >{title}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    contHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        //paddingHorizontal:15,
        marginTop:16,
        marginBottom:20,
        width: width/1.1
    },
    img:{
        width:50,
        height:38,
        resizeMode:'contain'
    },
    txt:{
        fontSize: getFontSize(23),
        color: Colors.white,
        fontWeight:'700'
    }
})

export default HeaderContent;