import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";
import Card from "./CardGafete";

const {height, width} = Dimensions.get('window');

const GafeteItem = ({item,setQrRoute}) => {
    return(
        <Card background={item.color}>
            <View style={{marginTop:20, flexDirection:'row'}}>
                <Image source={item.image} style={{width:108, height:115, resizeMode:'contain'}}/>
                <View style={{ width: width/2,}}>
                    <Text style={{fontSize: getFontSize(20), fontWeight:'700'}}>{item?.firstName}</Text>
                    <Text style={{fontSize: getFontSize(20), fontWeight:'700'}}>{item?.lastName}</Text>
                    <View style={{width: width/2.5, height:5, backgroundColor:Colors.black, marginTop:6}}/>
                    <Text style={{marginTop:6, width: width/2.4, paddingRight:4}}>{item.code} - {item.branch}</Text>
                </View>
                <Image source={require('../../assets/logoBimbo.png')} style={{width:50, height:22, resizeMode:'contain',  position:'absolute', right:10, top:-10}}/>
            </View>
            <View style={{alignSelf:'flex-end', marginRight:20}}>
                <TouchableOpacity onPress={setQrRoute}>
                    <Image source={require('../../assets/qr1.png')} style={{width:30, height:30, resizeMode:'contain',}}/>
                </TouchableOpacity>
                <Image source={require('../../assets/pointer.png')} style={{width:20, height:20, position:'absolute', top:20, right:0}}/>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({

})

export default GafeteItem;
