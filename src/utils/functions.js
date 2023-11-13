import { PixelRatio } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fontScale = PixelRatio.getFontScale();
export const getFontSize = size => size/fontScale;

export const saveTokens = async(access, refresh, user) => {
    try {
        await AsyncStorage.setItem('accessToken', JSON.stringify(access));
        await AsyncStorage.setItem('refreshToken', JSON.stringify(refresh));
        await AsyncStorage.setItem('user', JSON.stringify(user));


    } catch (e) {
        console.log('Error al almacenar los tokens',e)   
    }
}