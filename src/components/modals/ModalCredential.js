import React,{useState, useEffect} from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, ScrollView, Modal, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Skeleton } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'; 
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import Card from "../CardGafete";
import ContentGafete from "../ContentGafete";
import { getCodeQR, activateAutoGenerate, cancelAutoGenerateCode } from "../../store/ducks/homeDuck";
import ContentQr from "../ContentQr";

const {height, width} = Dimensions.get('window');

const ModalCredential = ({visible, setVisible}) => {
    const navigation = useNavigation();
    const route = useRoute()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.authDuck?.dataUser?.id)
    const colorDay = useSelector(state => state.homeDuck.colorDay)
    const loader = useSelector(state => state.homeDuck.loading)
    const [showQr, setShowQr] = useState(false)
    const code = useSelector(state => state.homeDuck.code)
    const isRunning = useSelector(state => state.homeDuck.isRunning)
    const minutes = useSelector(state => state.homeDuck.minutes);
    const seg = useSelector(state => state.homeDuck.seconds)

    const {item, rules} = route.params

    useEffect(() => {
        if(userId != 'a1c7cad5-f359-44b2-867e-4fd19c8e0f4b'){
            if(!isRunning && seg === 0 && minutes === 0 && showQr){
                dispatch(getCodeQR({isRunning, userId}))
            }
        }
    },[isRunning, seg, minutes,showQr])

    useEffect(() => {
        console.log('showqr',showQr)
    },[showQr])

    return(
        <SafeAreaView style={styles.card}>
            {Platform.OS === 'ios' ? (
                <View style={{flex:1, position:'absolute', top: height/3.5, right:0,transform:[{rotateZ:'90deg'}],}}>
                    <Card 
                        isHorizontal={true} 
                        isFront={!showQr} 
                        showHorizontal={() => {navigation.goBack(); dispatch(cancelAutoGenerateCode())}}
                        setQrRoute={() => {
                            setShowQr(true);
                            }}>
                        {!showQr ? (
                            <ContentGafete item={item} rules={rules}/>
                        ):(
                            <ContentQr userId={userId} code={code}/>
                        )}
                        {showQr && <TouchableOpacity style={{position:'absolute', top:10,}} onPress={() => setShowQr(false)}>
                            <MaterialIcons name="arrow-back-ios" size={24} color={Colors.black} />
                        </TouchableOpacity>}
                    </Card>

                </View>

            ):(
                <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Card 
                        isHorizontal={true} 
                        isFront={!showQr} 
                        showHorizontal={() => {navigation.goBack(); dispatch(cancelAutoGenerateCode())}} 
                        setQrRoute={() => {
                            setShowQr(true)
                        }}>
                        {!showQr ? (
                            <ContentGafete item={item} rules={rules}/>
                        ):(
                            <ContentQr userId={userId} code={code}/>
                        )}
                        {showQr && <TouchableOpacity style={{position:'absolute', top:10,}} onPress={() => setShowQr(false)}>
                            <MaterialIcons name="arrow-back-ios" size={24} color={Colors.black} />
                        </TouchableOpacity>}
                    </Card>
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card:{
        flex:1, 
        backgroundColor:Colors.blue, 
        marginTop:60, 
        //borderRadius:10,
    },
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
})

export default ModalCredential;