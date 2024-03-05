import React,{useState,useEffect} from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet, ScrollView, RefreshControl, } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { Entypo } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/es';




const {height, width} = Dimensions.get('window');

const ScreenBaseLogged = ({children, showNotifications,showProfile, scrollViewRef, refresh=false, onRefresh}) => {
    const user = useSelector(state => state.authDuck.dataUser)
    const badge = useSelector(state => state.notifyDuck.badgeNotification)

    return(
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={Colors.blue}
                barStyle={'default'}
                //showHideTransition={statusBarTransition}
                hidden={false}
            />
            <View style={styles.contHeader}>

                <TouchableOpacity 
                    onPress={showNotifications}
                    style={styles.btnNoti}>
                    < >
                        <Entypo name="bell" size={16} color="black" />
                        {badge >0  ? (
                            <View style={styles.contlblIcon}>
                                <Text style={styles.lblBadge} >{badge <= 10 ? badge.toString() : '10+'}</Text>
                            </View>
                        ):null}
                    </>
                </TouchableOpacity>
                <View style={{flexDirection:'row', paddingHorizontal:12}}>
                    <TouchableOpacity onPress={showProfile} style={styles.contShadow} >
                        {user?.id != 'a1c7cad5-f359-44b2-867e-4fd19c8e0f4b' ? (user?.profileImage !=null && user?.profileImage !='') ? (
                            <Image source={{uri: user?.profileImage}} style={styles.imgProfile}/>
                        ):(
                            <Image source={require('../../../assets/profile.png')} style={styles.imgProfile}/>

                        ): <Image source={require('../../../assets/user.jpg')} style={styles.imgProfile}/>}

                    </TouchableOpacity>
                    <View style={{flexDirection:'column', marginLeft:12}}>
                        <Text style={styles.lblDesc}>Bienvenido de nuevo</Text>
                        <Text style={styles.lblName}>{user?.firstName?.split(' ')[0]}</Text>
                        <Text style={styles.lblName}>{user?.lastName?.split(' ')[0]}</Text>
                        <Text style={styles.lblDesc}>Miembro desde:</Text>
                        <Text style={[styles.lblDesc,{textTransform:'capitalize'}]}>{moment(user?.entryDate).format('MMMM YYYY')}</Text>
                    </View>
                </View>

            </View>
            <ScrollView
                ref={scrollViewRef}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} tintColor={Colors.white}/>}
                keyboardShouldPersistTaps='handled'
                automaticallyAdjustKeyboardInsets
                nestedScrollEnabled={true}
                overScrollMode="always"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom:20
                    
                }}>
                    {children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.darkBlue,
        
    },
    contHeader:{
        backgroundColor:Colors.blue, 
        paddingTop:30, 
        paddingBottom:12, 
        borderBottomLeftRadius:22, 
        borderBottomRightRadius:22
    },
    btnNoti:{
        marginTop:20, 
        alignSelf:'flex-end', 
        backgroundColor:Colors.whiteInput, 
        width:30, 
        height:30, 
        borderRadius:15, 
        marginRight:30,
        justifyContent:'center',
        alignItems:'center'
    },
    contlblIcon:{
        backgroundColor:'red', 
        width:30, 
        borderRadius:10, 
        justifyContent:'center',
        alignItems:'center', 
        position:'absolute', 
        left:20, top:0
    },
    lblBadge:{
        fontSize:getFontSize(12), 
        color:Colors.white,
    },
    lblDesc:{
        fontSize:getFontSize(16), 
        fontWeight:'400', 
        color:Colors.white
    },
    lblName:{
        fontSize:getFontSize(32), 
        fontWeight:'700', 
        color:Colors.white, 
        textTransform:'capitalize'
    },
    imgProfile:{
        width:119, 
        height:140, 
        resizeMode:'cover',
        borderRadius:15,
    },
    contShadow:{
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 4,  
          height: 4,
        },
        shadowOpacity: 0.2, 
        shadowRadius: 4, 
    }
})

export default ScreenBaseLogged;
