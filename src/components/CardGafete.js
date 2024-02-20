import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { Colors } from "../utils/Colors";
import { useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');

const Card = ({children, background= Colors.white}) => {
    const colorDay = useSelector(state => state.homeDuck.colorDay)

    return(
        <View style={[styles.card,{backgroundColor: background,}]}>
            <View style={{flexDirection:'row'}}>

                <View style={styles.contChild}>
                    {children}
                </View>
                <View style={{alignSelf:'flex-start', paddingTop:10}}>
                    <Image source={require('../../assets/verticalBar.gif')} style={{width: 8, height:150,}}/>
                    {/*<View style={[styles.itemColor,{backgroundColor:Colors.blue2}]}/>
                    <View style={[styles.itemColor,{backgroundColor:Colors.red}]}/>
                    <View style={[styles.itemColor,{backgroundColor:Colors.darkBlue}]}/>
    <View style={[styles.itemColor,{backgroundColor:Colors.grayV2}]}/>*/}
                </View>
            </View>
            <View style={{ flexDirection:'row',}}>
                <Image source={require('../../assets/horizontalBar.gif')} style={{ width:200, height:20,}}/>
                {/*<View style={[styles.itemColorRow,{backgroundColor:Colors.blue2}]}/>
                <View style={[styles.itemColorRow,{backgroundColor:Colors.red}]}/>
    <View style={[styles.itemColorRow,{backgroundColor:Colors.darkBlue}]}/>*/}
            </View>
            <View style={{width:10, height:10, borderRadius:5, backgroundColor: colorDay != '' ? colorDay : Colors.white, marginTop:0}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{ 
        width: width/1.1, 
        //height: height/3.4, 
        borderRadius:20,
        paddingHorizontal:15,
        paddingVertical:10
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