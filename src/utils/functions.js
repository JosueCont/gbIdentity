import { PixelRatio, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const fontScale = PixelRatio.getFontScale();
export const getFontSize = size => size/fontScale;

export const saveTokens = async(access, user) => {
    try {
        await AsyncStorage.setItem('accessToken', JSON.stringify(access));
        //await AsyncStorage.setItem('refreshToken', JSON.stringify(refresh));
        await AsyncStorage.setItem('user', JSON.stringify(user));


    } catch (e) {
        console.log('Error al almacenar los tokens',e)   
    }
}

export const getExpoToken = async() => {
    try {
        let token;
        if (Device.isDevice) {
            const {existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                console.log('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync({'projectId': Constants.expoConfig.extra.eas.projectId,})).data;
            //console.log(token);
        } else {
            console.log('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    } catch (e) {
        console.log("registerForPushNotificationsAsync error =>", e.toString())
    }
}

export const getValidators = (password, regex, polities) => {
    const requirements = {
        minLength: new RegExp(`.{${polities?.passwordLength},}`),
    };

    const messages = {
        number: 'Un número',
        specialChar:'Un caracter especial',
        uppercase:'Una letra mayúscula',
        lowercase:'Una letra minúscula',
        minLength:`Al menos ${polities?.passwordLength} dígitos`
    }

    if(polities.withSymbols) requirements.specialChar = /(?=.*[!@#$%^&*()_+\-=\[\]{};\\\'":\\\\|,.<>/?])/
    if(polities.withCapitalLetters) requirements.uppercase = /(?=.*[A-Z])/
    if(polities.withNumbers) requirements.number = /(?=.*[0-9])/
    if(polities.withLowercase) requirements.lowercase = /(?=.*[a-z])/

    const missingParams = [];

    Object.keys(requirements).forEach((key) => {
      if (!requirements[key].test(password)) {
        missingParams.push({key, message:messages[key]});
      }
    });

    return missingParams;
    
}