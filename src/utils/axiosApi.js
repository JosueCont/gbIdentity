import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser, refreshToken } from "./ApiApp";
import { logoutAction } from "../store/ducks/authDuck";
import { useDispatch, useStore } from "react-redux";
import { Platform } from "react-native";
import * as Device from 'expo-device';



export const baseURL = 'https://gbwallet.hiumanlab.com'//process.env.EXPO_PUBLIC_API_URL//'https://gbwallet.hiumanlab.com'//'http://192.168.1.108:5213';


let config = {
    baseURL:baseURL,
    headers: {
        Accept: "application/json",
    },
};
const timeOut = 120000;


let APIKit = axios.create(config);

APIKit.defaults.timeout = timeOut;

let store

export const injectStore = _store => {
  store = _store
}

const getTypeDevice = () => {
    return Device.osName === 'Android' ? Device.osName : Device.osName ==='iOS' ? 'iPhone' : 'iPad' ;
}

APIKit.interceptors.request.use(async(config) => {
    try {
        let token = await AsyncStorage.getItem('accessToken');
        if (token){
            config.headers.Authorization =`Bearer ${JSON.parse(token)}`;
            config.headers['User-Agent'] = getTypeDevice()
        } 
    } catch (e) {
        console.log('APIKit.interceptors.request error =>',e.toString())

    }
    return config;
});
    
APIKit.interceptors.response.use((config)  => config,
    async(error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry){ 
            store.dispatch(await logoutAction())
        }else{

            return Promise.reject(error);
        }

    }
);

export const axiosPost = async (url, data) => {
    return await APIKit.post(`${url}`, data)
}


export const axiosGet = async (url, params = '') => {
    return await APIKit.get(`${url}${params}`);
}

export const axiosPut = async (url, data) => {
    return await APIKit.put(`${url}`, data)
}


