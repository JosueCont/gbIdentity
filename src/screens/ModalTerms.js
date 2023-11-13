import React,{useState, useEffect} from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 
import { getFontSize } from "../utils/functions";

const {height, width} = Dimensions.get('window');

const ModalTerms = () => {
    const navigation = useNavigation()
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconClose}>
                <AntDesign name="closecircle" size={35} color={Colors.grayDark} />            
            </TouchableOpacity>
            <ImageBackground 
                source={require('../../assets/background.png')} 
                resizeMode="cover" 
                imageStyle={{borderTopLeftRadius:15,borderTopRightRadius:15,}}
                style={styles.img}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Image source={require('../../assets/logoBimbo.png')} style={styles.imgHeader}/>
                    <View style={{flexDirection:'row', padding:10 }}>
                        <TouchableOpacity>
                            <AntDesign name="facebook-square" size={20} color={Colors.white} style={{marginRight:5}} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../../assets/logotwitter.png')} style={{width:20, height:20, resizeMode:'contain',marginRight:5}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign name="youtube" size={20} color={Colors.white} style={{marginRight:5}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign name="instagram" size={20} color={Colors.white} style={{marginRight:5}}/>

                        </TouchableOpacity>
                    </View>
                </View>
                
                <Text style={styles.title}>Términos y condiciones</Text>

                
            </ImageBackground>
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
                <View style={styles.contTerms}>
                    <Text style={styles.titleDes}>TÉRMINOS LEGALES Y CONDICIONES</Text>
                    <Text style={styles.desc}>Usted como usuario, al utilizar éste Sitio Web, acepta los términos y condiciones, que a continuación se mencionan: Cualquier uso del material contenido en este sitio web por el usuario “usted” será utilizado bajo su propio riesgo.
                        Grupo Bimbo S.A.B de C.V. o cualquier de sus afiliadas o subsidiarias “Grupo Bimbo” no será responsable si la información disponible en este sitio web no es precisa o completa.
                    </Text>
                    <Text style={styles.titleDes}>TRANSMISIÓN</Text>
                    <Text style={styles.desc}>Cualquier información que usted transmita o coloque en este sitio web no será considerada como confidencial y se convierte en propiedad de Grupo Bimboy la podrá utilizar para cualquier propósito, incluso para el desarrollo, fabricación, publicación y mercadeo de productos. Cualquier tipo de uso no generará compensación alguna. Usted declara que es el titular o licenciatario delcontenido, que de ninguna manera viola derechos de terceros.</Text>
                    <Text style={styles.titleDes}>PROPIEDAD INTELECTUAL</Text>
                    <Text style={styles.desc}>A reserva de sus Datos Personales, cualquier información, textos, imágenes, que sea introducida por usted en los espacios disponibles al público en general, será propiedad de Grupo Bimbo, por lo que éste podrá utilizarla, reproducirla, modificarla, adaptarla o ponerla a disposición del público, además de estar facultado para utilizar los comentarios, ideas, sugerencias o cualquier información que usted introduzca a este sitio, sin que esto genere alguna compensación.
                        Por otro lado, Grupo Bimbo se reserva el derecho a evitar que se publiquen fotos, gráficos, material sonoro o de video que usted introduzca en los espacios disponibles al público en general, que éste sean ilegales, inmorales, o bien, que vayan en contra de sus políticas.

                        Ninguna reproducción de cualquier parte del sitio web puede ser vendida o distribuida con fines de lucro ni debe ser modificada o incorporada en cualquier otro medio.
                        Las marcas, diseños, personajes, caracteres y marcas publicadas en el Sitio Web pertenecen a Grupo Bimbo. Ningún contenido de este sitio web debe interpretarse como un otorgamiento de licencia de uso o derecho de uso de cualquier Marca mostrada en este sitio web. Por el acceso a este sitio web, usted se compromete a no reproducir ni utilizar ningún derecho de propiedad industrial e intelectual propiedad de Grupo Bimbo sin su autorización. Grupo Bimbo hará uso de las acciones legales correspondientes en caso de que se haga un uso ilegal de sus derechos de propiedad industrial e intelectual incluyendo acciones penales, civiles y administrativas.
                    </Text>
                    <Text style={styles.titleDes}>ENLACES A OTROS SITIOS WEB</Text>
                    <Text style={styles.desc}>Los enlaces en los sitios web de Grupo Bimbo pueden dirigirlo a websites diferentes al de Grupo Bimbo, por lo cual Grupo Bimbo no acepta responsabilidad alguna respecto del contenido, precisión o función del contenido de estos otros sitios web.</Text>
                    <Text style={styles.titleDes}>GARANTÍAS</Text>
                    <Text style={styles.desc}>Grupo Bimbo no otorga garantías de ningún tipo, ni de manera expresa, implícitas, legales, ni de ningún otro tipo, (incluyendo garantías implícitas de comercio y fitness para cualquier propósito) así como tampoco garantías o representaciones que el material en este sitio web esté completo, preciso, puntual y que no infringe derechos de terceros; que el servicio de este sitio web será ininterrumpido o libre de errores y seguro; que cualquier consejo u opinión de Grupo Bimbo a través de este sitio web es preciso o confiable.Grupo Bimbo por medio de éste documento expresamente renuncia a cualquier garantía. En algunas jurisdicciones no se permiten las exclusiones de responsabilidad implícita, por lo que usted deberá verificar si éstas son aplicables a usted.</Text>
                    <Text style={styles.titleDes}>RENUNCIA DE RESPONSABILIDADES</Text>
                    <Text style={styles.desc}>Ni Grupo Bimbo ni ninguna otra parte involucrada en crear, producir o manejar este sitio en nuestro nombre tendrá responsabilidad alguna por cualquier: uso directo, accidental, consecuente, indirecto, daños, gastos, pérdidas o responsabilidad por su acceso a usar, inhabilitar el uso, cambiar el contenido de este sitio o que surjan por cualquier otro acceso al sitio web a través de un enlace de este sitio web o de cualquier acción que tomemos o decidamos no tomar como resultado de cualquier correo electrónico que nos envíen.
                        Cualquier material contenido en este sitio web está sujeto a cambio sin previo aviso.
                        Adicionalmente, Grupo Bimbo no tendrá responsabilidad alguna por cualquier pérdida causada por virus que puedan infectar a su computadora u otra propiedad por razón de usar, ingresar o bajar cualquier material de este sitio web. Si usted elige bajar materiales de este sitio web siempre será bajo su propio riesgo.
                    </Text>
                    <Text style={styles.titleDes}>ACTIVIDADES PROHIBIDAS</Text>
                    <Text style={styles.desc}>Se encuentra estrictamente prohibido cometer cualquier acto que a consideración de Grupo Bimbo, sea considerado como inapropiado o ilegal incluyendo de manera ilimitada:
                        -Cualquier acto que pueda constituir una infracción a la privacidad (incluyendo subir información privada sin el consentimiento del dueño de la misma) o cualquier otro que forme parte de los derechos legales de los individuos;
                        -Usar este sitio web para difamar o calumniar a Grupo Bimbo, sus colaboradores o cualquier otro tercero, así como actuar de forma tal que se vea perjudicado Grupo Bimbo;
                        -Subir archivos que contengan virus que pueden causar daño a la propiedad de Grupo Bimbo o la propiedad de otros individuos.
                        GRUPO BIMBO se reserva el derecho de restringir o dar por terminado el ingreso a este sitio web en cualquier momento.
                    </Text>
                    <Text style={styles.titleDes}>LEGISLACIÓN Y TRIBUNALES</Text>
                    <Text style={styles.desc}>Usted y Grupo Bimbo acuerdan que cualquier controversia o reclamo que surja del uso de este sitio web debe ser reglamentado por la Legislación y Tribunales de México Distrito Federal.</Text>
                    <Text style={styles.titleDes}>ACTUALIZACIÓN DE LOS TÉRMINOS Y CONDICIONES</Text>
                    <Text style={styles.desc}>Nos reservamos el derecho de hacer cualquier cambio o corrección a estos Términos y Condiciones.</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:Colors.white, 
        marginTop:50, 
        borderTopLeftRadius:20, 
        borderTopRightRadius:20,
        paddingTop:13, 
        paddingRight:10, 
        alignItems:'center'
    },
    iconClose:{
        alignSelf:'flex-end'
    },
    img:{
        width: width/1.2, 
        height: height/3.8, 
        marginTop:20,
    },
    imgHeader:{
        width:70, 
        height:50, 
        resizeMode:'contain', 
        marginLeft:15, 
        marginTop:5
    },
    title:{
        alignSelf:'center',
        marginTop:20, 
        fontSize: getFontSize(28),
        width:160, 
        color: Colors.white, 
        fontWeight:'700',
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    contTerms:{
        width: width/1.3,
        flex:1,
        borderColor: Colors.grayV2,
        borderWidth:1,
        marginTop:20,
        borderRadius:15,
        padding:15
    },
    titleDes:{
        fontSize: getFontSize(16),
        fontWeight:'bold',
        marginBottom:8
    },
    desc:{
        marginBottom:10,
    }
})
export default ModalTerms;