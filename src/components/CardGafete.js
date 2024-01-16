import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { Colors } from "../utils/Colors";

const {height, width} = Dimensions.get('window');

const Card = ({children, background= Colors.white}) => {
    return(
        <View style={[styles.card,{backgroundColor: background,}]}>
            <View style={{flexDirection:'row'}}>

                <View style={styles.contChild}>
                    {children}
                </View>
                <View style={{alignSelf:'flex-start', paddingTop:10}}>
                    <View style={[styles.itemColor,{backgroundColor:Colors.blue2}]}/>
                    <View style={[styles.itemColor,{backgroundColor:Colors.red}]}/>
                    <View style={[styles.itemColor,{backgroundColor:Colors.darkBlue}]}/>
                    <View style={[styles.itemColor,{backgroundColor:Colors.grayV2}]}/>
                </View>
            </View>
            <View style={{ flexDirection:'row',}}>
                <View style={[styles.itemColorRow,{backgroundColor:Colors.blue2}]}/>
                <View style={[styles.itemColorRow,{backgroundColor:Colors.red}]}/>
                <View style={[styles.itemColorRow,{backgroundColor:Colors.darkBlue}]}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{ 
        width: width/1.1, 
        //height: height/3.4, 
        borderRadius:20,
        padding:15,
    },
    itemColor:{
        width:7, 
        height:30,
        marginBottom:2
    },
    itemColorRow:{
        width:52, 
        height:8,
        marginBottom:2,
        marginRight:3
    },
    contChild:{
        width: width/1.2, 
        //height: height/4,
    }
})

export default Card;