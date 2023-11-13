import React,{useState,useEffect} from "react";
import { FlatList, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import moment from "moment/moment";
import HeaderContent from "../HeaderContent";
import Card from "../CardGafete";

const {height, width} = Dimensions.get('window');

const CodePage = ({backHome}) => {
    return(
        <View style={styles.container}>
            <HeaderContent isVisibleTitle={false} goBack={backHome} title="Notificaciones (20)"/>
            <Card>
                <Image source={require('../../../assets/qr2.png')} style={styles.img}/>
            </Card>
            <View style={styles.contDesc}>
                <Text style={styles.title}>QR dinámico</Text>
                <Text style={styles.desc}>Presente este código QR en la zona de acceso </Text>
                <Text style={styles.hour}>Válido por 01:09 min.</Text>
            </View>
        </View>
    )
}   

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    img:{
        width: height/3.5, 
        height: height/4.5, 
        resizeMode:'contain', 
        alignSelf:'center'
    },
    contDesc:{
        marginTop:15, 
        width: width/1.1, 
        height: height/5, 
        backgroundColor: Colors.blue2, 
        borderRadius:20, 
        alignItems:'center', 
        paddingTop:10
    },
    title:{
        fontSize: getFontSize(23), 
        color: Colors.white, 
        fontWeight:'700'
    },
    desc:{
        fontSize: getFontSize(18), 
        fontWeight:'400', 
        textAlign:'center', 
        marginTop:7, 
        color: Colors.white
    },
    hour:{
        fontSize: getFontSize(15), 
        fontWeight:'300',  
        color: Colors.white, 
        marginTop:15
    }
})


export default CodePage;