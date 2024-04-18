import React,{useState, useEffect, useRef} from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, ScrollView, Modal, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Skeleton } from "native-base";
import { MaterialIcons } from '@expo/vector-icons'; 
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import CardGafete from "../CardGafete";
import ContentGafete from "../ContentGafete";
import { getCodeQR, activateAutoGenerate, cancelAutoGenerateCode } from "../../store/ducks/homeDuck";
import ContentQr from "../ContentQr";
import * as ScreenOrientation from 'expo-screen-orientation';
import { getDinamicCode } from "../../utils/ApiApp";
import GafeteItem from "../GafeteItem";

const {height, width} = Dimensions.get('window');

const ModalCredential = ({visible, setVisible}) => {
    const navigation = useNavigation();
    const route = useRoute()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.authDuck?.dataUser?.id)
    const colorDay = useSelector(state => state.homeDuck.colorDay)
    //const loader = useSelector(state => state.homeDuck.loading)
    const [showQr, setShowQr] = useState(false)
    //const code = useSelector(state => state.homeDuck.code)
    //const isRunning = useSelector(state => state.homeDuck.isRunning)
    //const minutes = useSelector(state => state.homeDuck.minutes);
    //const seg = useSelector(state => state.homeDuck.seconds)

    const [code, setCode] = useState(false)
    const [loader, setLoading] = useState(false)
    const [isRunning, setIsRunning] = useState(true)
    const [minutes, setMinutes] = useState(0)
    const [seg, setSeconds] = useState(0)
    const [typeOrientation, setTypeOrientation] = useState(1)

    const {item, rules} = route.params



    const countdownInterval = useRef(null); // Cambio aquí

    const getCodeQR = async ({ isRunning, userId }) => {
        setLoading(true);
        // Lógica para obtener el código QR...
        try {
            const response = await getDinamicCode(userId);
            if (response?.data?.code) {
                setCode(response.data.code);
                setLoading(false);
                // Inicia el contador aquí solo si es necesario
                startCounter(response.data.seconds - 1);
            }
        } catch (error) {
            console.log('Error al obtener el código QR:', error);
            setLoading(false);
        }
    };

    const startCounter = (totalSeconds) => {
        if (countdownInterval.current !== null) {
            clearInterval(countdownInterval.current); // Usa .current aquí
            console.log("clear")
        }
        let counter = totalSeconds;
        console.log("setInterval")
        countdownInterval.current = setInterval(() => { // Cambio aquí
            if (counter >= 0) {
                setMinutes(Math.floor(counter / 60));
                setSeconds(counter % 60);
                counter--;
            } else {
                clearInterval(countdownInterval.current); // Usa .current aquí
                console.log('Tiempo terminado');
                setIsRunning(true);
                // Considera si necesitas llamar a getCodeQR aquí
            }
        }, 1000);
    };


    useEffect(() => {
        if(userId != 'a1c7cad5-f359-44b2-867e-4fd19c8e0f4b'){
            if(isRunning && seg === 0 && minutes === 0 && showQr){
                if (countdownInterval.current !== null) {
                    clearInterval(countdownInterval.current); // Limpieza usando .current
                }
                getCodeQR({isRunning, userId})
                setIsRunning(false);
            }
        }
        console.log("ModalCredential", isRunning, seg, minutes, showQr)
    },[isRunning, seg, minutes,showQr])

    useEffect(() => {
        (async() => {
            if (Platform.OS === 'ios') {
                //await ScreenOrientation.unlockAsync();
               //await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
               //const orientation = await ScreenOrientation.getOrientationLockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
                //console.log('orientation',orientation)
            }
        
            await ScreenOrientation.addOrientationChangeListener((item) => {
                setTypeOrientation(item?.orientationInfo.orientation)
            })
                
        })()
        return async() => {
            if(Platform.OS === 'ios'){
                //await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
                await ScreenOrientation.removeOrientationChangeListener();
                await ScreenOrientation.unlockAsync();
            }
        };
      }, []);

    //useEffect(() => {
      //  console.log('showqr',showQr)
       // getCodeQR({isRunning, userId})
    //},[showQr])

    //useEffect(() => {
      //  getCodeQR({isRunning, userId})
    //}, [])
    

    return(
        <SafeAreaView style={styles.card}>
            {
                
                typeOrientation === 1 || typeOrientation === 2 ? (
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                       <CardGafete 
                        isHorizontal={false} 
                        isFront={!showQr} 
                        showHorizontal={() => {navigation.goBack(); setIsRunning(true)}}
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
                    </CardGafete>
                    </View>
                ):(
                    <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
                    <CardGafete 
                        isHorizontal={true} 
                        isFront={!showQr} 
                        showHorizontal={() => {navigation.goBack(); setIsRunning(true)}} 
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
                    </CardGafete>
                </View>

                )

            }
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