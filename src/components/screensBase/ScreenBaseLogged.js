import React,{useState,useEffect} from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet, ScrollView, } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { Entypo } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/es';




const {height, width} = Dimensions.get('window');

const ScreenBaseLogged = ({children, showNotifications,showProfile}) => {
    const user = useSelector(state => state.authDuck.dataUser)

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
                        <View style={styles.contlblIcon}>
                            <Text style={{fontSize:getFontSize(12), color:Colors.white,}} >20+</Text>
                        </View>
                    </>
                </TouchableOpacity>
                <View style={{flexDirection:'row', paddingHorizontal:12}}>
                    <TouchableOpacity onPress={showProfile}>
                        <Image source={require('../../../assets/profileFake.png')} style={{width:119, height:140, resizeMode:'contain'}}/>

                    </TouchableOpacity>
                    <View style={{flexDirection:'column', marginLeft:12}}>
                        <Text style={{fontSize:getFontSize(16), fontWeight:400, color:Colors.white}}>Bienvenido de nuevo</Text>
                        <Text style={{fontSize:getFontSize(32), fontWeight:700, color:Colors.white, textTransform:'capitalize'}}>{user?.name.split(' ')[0]}</Text>
                        <Text style={{fontSize:getFontSize(32), fontWeight:700, color:Colors.white, textTransform:'capitalize'}}>{user?.lastName.split(' ')[0]}</Text>
                        <Text style={{fontSize:getFontSize(16), fontWeight:400, color:Colors.white}}>Miembro desde:</Text>
                        <Text style={{fontSize:getFontSize(16), fontWeight:400, color:Colors.white, textTransform:'capitalize'}}>{moment(user?.entryDate).format('MMMM YYYY')}</Text>
                    </View>
                </View>

            </View>
            <ScrollView
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
    }
})

export default ScreenBaseLogged;