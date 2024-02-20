import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Skeleton } from "native-base";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";
import Card from "./CardGafete";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const {height, width} = Dimensions.get('window');

const GafeteItem = ({item,setQrRoute, rules}) => {
    const userId = useSelector(state => state.authDuck?.dataUser?.id)
    const colorDay = useSelector(state => state.homeDuck.colorDay)
    const loader = useSelector(state => state.homeDuck.loading)

    return(
        <Card background={item?.color}>
            <View style={styles.contInfo}>
                {userId != 'a1c7cad5-f359-44b2-867e-4fd19c8e0f4b' ? (
                    <Image source={require('../../assets/profile.png')} style={styles.imgProfile}/>

                ): <Image source={require('../../assets/user.jpg')} style={styles.imgProfile}/>}
                <View style={{ width: width/2,}}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                        {loader ? (
                            <View>
                                <Skeleton.Text px="10" lines={2} mb={2} mt={2} backgroundColor={'gray.100'}/>
                            </View>
                        ):(
                            <View>
                                <Text style={styles.lblName}>{item?.firstName.split(' ')[0]}</Text>
                                <Text style={styles.lblName}>{item?.lastName.split(' ')[0]}</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.line}/>
                    {loader ? <Skeleton.Text px="2" lines={1} mb={2} mt={2} backgroundColor={'gray.100'} borderRadius={8}/> :<Text style={styles.lblBranch}>{item?.code}{item?.branch}</Text>}
                    {rules?.showBirthDate && <Text>{item?.birthDate}</Text>}
                    {rules?.showCurp && <Text>{item?.curp}</Text>}
                    {rules?.showNss && <Text>{item?.nss}</Text>}
                </View>
                <Image source={require('../../assets/logoBimbo.png')} style={styles.logoBimbo}/>
            </View>
            <View style={styles.contBtn}>
                {loader ? (
                    <Skeleton lines={1} width={30} height={30} borderRadius={5} backgroundColor={'gray.100'}/>

                ):(
                    <TouchableOpacity onPress={setQrRoute}>
                        <Image source={require('../../assets/qr-icon.png')} style={styles.imgQr}/>
                    </TouchableOpacity>
                )}
                {/*<Image source={require('../../assets/pointer.png')} style={styles.imgPointer}/>*/}
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
