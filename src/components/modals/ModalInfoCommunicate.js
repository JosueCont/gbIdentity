import React,{useState, useEffect} from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";

const {height, width} = Dimensions.get('window');


const ModalInfoCommunicate = () => {
    const navigation = useNavigation()
    const route = useRoute()

    const {item} = route?.params

    return(
        <View style={styles.container}>
            <Image source={{uri: item?.image}} style={styles.img}/>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                automaticallyAdjustKeyboardInsets
                nestedScrollEnabled={true}
                overScrollMode="always"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom:20,
                    
                }}>
                <View style={styles.contDesc}>
                    <Text style={styles.lblTitle}>{item?.name}</Text>
                    <Text style={styles.lblDesc}>{item?.description}</Text>

                </View>

            </ScrollView>
            <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={styles.btn}>
                <Text style={styles.lblBtn}>Cerrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:Colors.white, 
        marginTop:60, 
        borderTopLeftRadius:20, 
        borderTopRightRadius:20,
        //paddingTop:13, 
        //paddingRight:10, 
        //alignItems:'center'
    },
    img:{
        width: width, 
        height:155, 
        resizeMode:'cover',
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    contDesc:{
        marginTop:15, 
        padding:13, 
        flex:1
    },
    lblTitle:{
        color: Colors.darkBlue, 
        fontSize: getFontSize(24), 
        fontWeight:'700', 
        marginBottom:13
    },
    lblDesc:{
        color: Colors.blueText, 
        fontSize: getFontSize(14), 
        fontWeight:'400'
    },
    btn:{
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor: Colors.darkBlue, 
        marginHorizontal:15, 
        paddingVertical:15, 
        marginBottom:20,
        borderRadius:8
    },
    lblBtn:{
        color: Colors.white, 
        fontSize: getFontSize(16), 
        fontWeight:'400'
    }
})

export default ModalInfoCommunicate;