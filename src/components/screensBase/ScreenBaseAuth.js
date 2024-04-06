import React,{ useEffect} from "react";
import { SafeAreaView, KeyboardAvoidingView,View, Image, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../../utils/Colors";
import logo from '../../../assets/logoBimbo.png';
import { getFontSize } from "../../utils/functions";

const {height, width} = Dimensions.get('window');

const ScreenBaseAuth = ({children, title='Hola'}) => {
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView 
                    keyboardShouldPersistTaps='handled'
                    automaticallyAdjustKeyboardInsets
                    nestedScrollEnabled={true}
                    overScrollMode="always"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        
                    }}
                    >
                <View style={styles.contHeader}>
                    <Image source={require('../../../assets/logoBimbo.png')} style={styles.img}/>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    {children}
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.white,
        flex:1,
    },
    contHeader:{
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:90
    },
    img:{
        height:118, width:200, resizeMode:'contain'
    },
    title:{
        color: Colors.blue, 
        textAlign:'center', 
        width:width/1.7, 
        fontSize:getFontSize(18),
        marginTop:15
    }
})

export default ScreenBaseAuth;