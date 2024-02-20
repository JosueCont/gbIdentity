import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const {height, width} = Dimensions.get('window');


const CommunicatesItem = ({item, index,}) => {
    const navigation = useNavigation();

    return(
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ModalCommunicate',{item})}>
            <Image source={{uri: item?.image}} style={styles.img}/>
            <View style={styles.contDesc}>
                <Text style={styles.lblTitle}>{item.name}</Text>
                <Text style={styles.lblSubtitle} ellipsizeMode='tail' numberOfLines={5}>{item?.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        width: width * 0.9,
        height: height/2.2,
        backgroundColor: Colors.white,
        borderRadius:20,
        marginRight:20,
        elevation:4,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    },
    img:{
        width: width * 0.9, 
        height:150, 
        resizeMode:'cover', 
        borderTopLeftRadius:20, 
        borderTopRightRadius:20
    },
    contDesc:{
        flex:1, 
        paddingHorizontal:12, 
        marginTop:9
    },
    lblTitle:{
        color: Colors.darkBlue, 
        fontSize: getFontSize(24), 
        fontWeight:'700', 
        marginBottom:13
    },
    lblSubtitle:{
        color: Colors.blueText, 
        fontSize: getFontSize(14), 
        fontWeight:'400'
    }
})

export default CommunicatesItem;