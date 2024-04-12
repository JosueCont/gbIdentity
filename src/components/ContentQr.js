import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import { Skeleton, Spinner } from "native-base";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import { useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import { MaterialIcons } from '@expo/vector-icons'; 


const {height, width} = Dimensions.get('window');


const ContentQr = ({code, loader, userId}) => {
    return(
        <View style={{alignSelf:'center', marginBottom:10}}>
            {userId != 'a1c7cad5-f359-44b2-867e-4fd19c8e0f4b' ? (
                code != '' && !loader ? (
                    <QRCode
                        value={code}
                        // logo={require('../../assets/logoBimbo.png')}
                        logoSize={20}
                        color={Colors.blueText}
                        logoBackgroundColor='transparent'
                        size={150}
                    />

                ): (
                    <View style={{height:150,justifyContent:'center', alignItems:'center'}}>
                        <Spinner size={'sm'} color={Colors.blue} />
                    </View>
                    
                )

            ) : (
                <Image source={require('../../assets/qrTest.png')} style={{width:170, height:170, resizeMode:'contain'}}/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({

})

export default ContentQr;