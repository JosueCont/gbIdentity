import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";
import Card from "./CardGafete";
import moment from "moment";

const {height, width} = Dimensions.get('window');

const GafeteItem = ({item,setQrRoute, rules}) => {
    return(
        <Card background={item?.color}>
            <View style={styles.contInfo}>
                <Image source={require('../../assets/profile.png')} style={styles.imgProfile}/>
                <View style={{ width: width/2,}}>
                    <Text style={styles.lblName}>{item?.firstName.split(' ')[0]}</Text>
                    <Text style={styles.lblName}>{item?.lastName.split(' ')[0]}</Text>
                    <View style={styles.line}/>
                    <Text style={styles.lblBranch}>{item?.code}{item?.branch}</Text>
                    {rules?.showBirthDate && <Text>{item?.birthDate}</Text>}
                    {rules?.showCurp && <Text>{item?.curp}</Text>}
                    {rules?.showNss && <Text>{item?.nss}</Text>}
                </View>
                <Image source={require('../../assets/logoBimbo.png')} style={styles.logoBimbo}/>
            </View>
            <View style={styles.contBtn}>
                <TouchableOpacity onPress={setQrRoute}>
                    <Image source={require('../../assets/qr1.png')} style={styles.imgQr}/>
                </TouchableOpacity>
                <Image source={require('../../assets/pointer.png')} style={styles.imgPointer}/>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    contInfo:{
        marginTop:20, 
        flexDirection:'row',
    },
    imgProfile:{
        width:100, 
        height:115, 
        resizeMode:'contain',
        borderRadius:15,
        marginRight:6,
        //elevation:4,
        //shadowColor: '#000', // Color de la sombra
        //shadowOffset: {
        //  width: 4,  
        //  height: 4,
        //},
        //shadowOpacity: 0.2, 
        //shadowRadius: 4, 
    },
    lblName:{
        fontSize: getFontSize(20), 
        fontWeight:'700'
    },
    line:{
        width: width/2.5, 
        height:5, 
        backgroundColor:Colors.black, 
        marginTop:6
    },
    lblBranch:{
        marginTop:6, 
        width: width/2.4, 
        paddingRight:4
    },
    logoBimbo:{
        width:50, 
        height:22, 
        resizeMode:'contain',  
        position:'absolute', 
        right:10, 
        top:-10
    },
    contBtn:{
        alignSelf:'flex-end', 
        marginRight:20
    },
    imgQr:{
        width:30, 
        height:30, 
        resizeMode:'contain',
    },
    imgPointer:{
        width:20, 
        height:20, 
        position:'absolute', 
        top:20, 
        right:0
    }
})

export default GafeteItem;
