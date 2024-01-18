import React,{useState,useEffect} from "react";
import { FlatList, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import moment from "moment/moment";
import HeaderContent from "../HeaderContent";
import { useSelector, useDispatch} from "react-redux";
import { getReadNotification, cancelReadNotify } from "../../store/ducks/notificationsDuck";
import { getNotifications } from "../../store/ducks/notificationsDuck";
import data from '../../utils/notificationsMockData.json'

const {height, width} = Dimensions.get('window');

const NotificationsPage = ({backHome, userId,moveOnTop}) => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifyDuck.notifications)
    const total = useSelector(state => state.notifyDuck.totalNotifications)
    const badge = useSelector(state => state.notifyDuck.badgeNotification)
    const current = useSelector(state => state.notifyDuck.current)
    const totalPages = useSelector(state => state.notifyDuck.totalPages)



    useEffect(() => {
        verifyNotify()
        
    },[])
    
    const verifyNotify = async() => {
        
        console.log('ller las notificaciones')
        if(badge > 0) dispatch(await getReadNotification({userId, date: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')}))
        else dispatch(cancelReadNotify())
    }


    const getIndicators = (item) => {
        if(!item || typeof item !=='number') return null;
    
        let indicators = [];
        for( let i=0; i<item; i++){
          indicators.push(i);
        }
        return indicators.map((indicator,index) => (
            <TouchableOpacity 
                key={index}
                disabled={current === index+1}
                onPress={() => {dispatch(getNotifications(userId,index+1)); moveOnTop()}}
                style={{ marginRight:8, justifyContent:'center',alignItems:'center', width:20, backgroundColor: current === index+1 ? Colors.blue : Colors.white, borderRadius:8}}>
                <Text style={{fontSize: getFontSize(15), color: current === index+1 ? Colors.white : Colors.black, textAlign:'center'}}>{index+1}</Text>
            </TouchableOpacity>
        ))
    }




    return(
        <View style={styles.container}>
            <HeaderContent isVisibleTitle={true} goBack={backHome} title={`Notificaciones (${total})`}/>
            {!!notifications && notifications.map((item,index) => (
                <View style={styles.card} key={index}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{moment.utc(item?.createdAt,).local().format('DD MMMM YYYY HH:mm')}</Text>
                    <Text style={styles.description} ellipsizeMode='tail' numberOfLines={4}>{item?.body}</Text>
                </View>
            ))}
            {!!notifications && notifications.length > 0  ? (
                <View style={{flexDirection:'row'}}>{getIndicators(totalPages)}</View>
            ): null}
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