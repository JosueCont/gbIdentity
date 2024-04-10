import React,{useState,useEffect, useRef} from "react";
import { FlatList, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Spinner } from "native-base";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import moment from "moment/moment";
import HeaderContent from "../HeaderContent";
import Card from "../CardGafete";
import QRCode from "react-native-qrcode-svg";
import { useSelector, useDispatch } from "react-redux";
import { getCodeQR } from "../../store/ducks/homeDuck";
import { getDinamicCode } from "../../utils/ApiApp";
const {height, width} = Dimensions.get('window');

const CodePage = ({backHome}) => {
    const dispatch = useDispatch();
    //const minutes = useSelector(state => state.homeDuck.minutes);
    //const seg = useSelector(state => state.homeDuck.seconds)
    //const code = useSelector(state => state.homeDuck.code)
    //const loader = useSelector(state => state.homeDuck.loading)
    //const isRunning = useSelector(state => state.homeDuck.isRunning)
    const userId = useSelector(state => state.authDuck?.dataUser?.id)
    const [code, setCode] = useState(false)
    const [loader, setLoading] = useState(false)
    const [isRunning, setIsRunning] = useState(true)
    const [minutes, setMinutes] = useState(0)
    const [seg, setSeconds] = useState(0)
    
    

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
            if(isRunning && seg === 0 && minutes === 0){
                if (countdownInterval.current !== null) {
                    clearInterval(countdownInterval.current); // Limpieza usando .current
                }
                getCodeQR({isRunning, userId})
                setIsRunning(false);
                
            }
        }
        console.log("codePage",isRunning, seg, minutes)
    },[isRunning, seg, minutes])


    /*const getCode = () => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let resultado = '';
        let counter = 70

        for (let i = 0; i < 8; i++) {
          const indice = Math.floor(Math.random() * caracteres.length);
          resultado += caracteres.charAt(indice);
        }
        if(resultado != ''){
            getCounter(counter)
        }
        console.log('result',resultado)
        setCode(resultado)
    }
    const getCounter = (counter) => {
        const countdownInterval = setInterval(() => {
            if (counter >= 0) {
              const minutes = Math.floor(counter / 60); // Obtener minutos
              const seconds = counter % 60; // Obtener segundos
                setMinutes(minutes < 10 ? `0${minutes}` : minutes)
                setSeg(seconds < 10 ? `0${seconds}` : seconds)
              console.log(`${minutes} minutos ${seconds} segundos`); // Mostrar tiempo
          
              counter--; // Decrementar el contador en segundos
            } else {
              clearInterval(countdownInterval); // Detener el contador cuando llegue a cero
              console.log('Tiempo terminado');
              getCode()
            }
          }, 1000);
    }*/

    return(
        <View style={styles.container}>
            <HeaderContent isVisibleTitle={false} goBack={backHome} title="Notificaciones (20)"/>
            <Card>
                <View style={{alignSelf:'center', marginBottom:10}}>
                    {userId != 'a1c7cad5-f359-44b2-867e-4fd19c8e0f4b' ? (
                        code != '' && !loader ? (
                            <QRCode
                                value={code}
                                logo={require('../../../assets/logoBimbo.png')}
                                logoSize={20}
                                color={Colors.blueText}
                                logoBackgroundColor='transparent'
                                size={height/4.5}
                            />
    
                        ): (
                            <View style={{height:height/4.5,justifyContent:'center', alignItems:'center'}}>
                                <Spinner size={'sm'} color={Colors.blue} />
                            </View>
                            
                        )

                    ) : (
                        <Image source={require('../../../assets/qrTest.png')} style={{width:170, height:170, resizeMode:'contain'}}/>
                    )}

                </View>
                {/*<Image source={require('../../../assets/qr2.png')} style={styles.img}/>*/}
            </Card>
            {userId != 'a1c7cad5-f359-44b2-867e-4fd19c8e0f4b' &&<View style={styles.contDesc}>
                <Text style={styles.title}>QR dinámico</Text>
                <Text style={styles.desc}>Presente este código QR en la zona de acceso </Text>
                <Text style={styles.hour}>Válido por {minutes < 10 ? `0${minutes}` : minutes}:{seg < 10 ? `0${seg}` : seg} {minutes <= 0 ? 'sec' : 'min'}.</Text>
            </View>}
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