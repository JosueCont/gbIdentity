import React,{useState,useEffect} from "react";
import { FlatList, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import moment from "moment/moment";
import HeaderContent from "../HeaderContent";
import data from '../../utils/notificationsMockData.json'

const {height, width} = Dimensions.get('window');

const NotificationsPage = ({backHome}) => {
    console.log('notifications',data)
    return(
        <View style={styles.container}>
            <HeaderContent isVisibleTitle={true} goBack={backHome} title="Notificaciones (20)"/>
            {data.map((item,index) => (
                <View style={styles.card} key={index}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{moment(item.date,'DD-MM-YYYY').format('DD MMMM YYYY')}</Text>
                    <Text style={styles.description} ellipsizeMode='tail' numberOfLines={4}>{item.description}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    card:{
        backgroundColor:Colors.white, 
        width: width/1.1, 
        borderRadius:20, 
        height: height/4.5, 
        marginBottom:10, 
        paddingHorizontal:20, 
        paddingVertical:13
    },
    title:{
        fontSize: getFontSize(15),
        color: Colors.blueText,
        fontWeight:'700'
    },
    date:{
        marginTop:5, 
        fontSize: getFontSize(10), 
        color: Colors.blueText, 
        fontWeight:'400'
    },
    description:{
        marginTop:13,
        fontSize: getFontSize(14),
        fontWeight: '400',
        color: Colors.blueText
    }
})

export default NotificationsPage;