import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Platform } from "react-native";
import { Skeleton } from "native-base";
import { Colors } from "../utils/Colors";
import { useSelector } from "react-redux";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import ModalCredential from "./modals/ModalCredential";


const {height, width} = Dimensions.get('window');

const CardGafete = ({children, background= Colors.white, setQrRoute, isFront=false, showHorizontal, isHorizontal=false}) => {
    const colorDay = useSelector(state => state.homeDuck.colorDay)
    const loader = useSelector(state => state.homeDuck.loading)

    

    return(
        <View style={[styles.card,{backgroundColor: background}, isHorizontal && {transform:[{scale: Platform.OS === 'ios' ? 1.5 : 1.5}]}]}>
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
            <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Image source={require('../../assets/horizontalBar.gif')} style={{ width:200, height:20,}}/>
                
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    {isFront ? isHorizontal ? (
                        <TouchableOpacity onPress={showHorizontal}>
                            <AntDesign name="shrink" size={27} color={Colors.blue} />
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity onPress={showHorizontal}>
                            <Ionicons name="expand" size={27} color={Colors.blue} />
                        </TouchableOpacity>

                    ): null}
                    {isFront && 
                        <View style={styles.contBtn}>
                            {loader ? (
                                <Skeleton lines={1} width={30} height={30} borderRadius={5} backgroundColor={'gray.100'}/>

                            ):(
                                <TouchableOpacity onPress={setQrRoute}>
                                    <Image source={require('../../assets/qr-icon.png')} style={styles.imgQr}/>
                                </TouchableOpacity>
                            )}
                        </View>}
                    <View style={{width:12, height:12, borderRadius:6, backgroundColor: colorDay != '' ? colorDay : Colors.white, marginTop:0, marginHorizontal:10}}/>
                </View>
            </View>
            
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
    },
    contBtn:{
        alignSelf:'flex-end', 
        marginLeft:10
    },
    imgQr:{
        width:30, 
        height:30, 
        resizeMode:'contain',
    },
})

export default CardGafete;