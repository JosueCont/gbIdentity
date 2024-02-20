import React,{useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Spinner, View} from "native-base";
import AuthStack from "./AuthStack";
import LoggedStack from "./LoggedStack";
import { Colors } from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { createSession, getRegexToPassword } from "../store/ducks/authDuck";
import { injectStore } from "../utils/axiosApi";
import { store } from "../store/store";
import * as ScreenCapture from 'expo-screen-capture';
import * as MediaLibrary from 'expo-media-library';
import ModalScreenShot from "../components/modals/ModalScreenShot";

injectStore(store)


const NavigationContainerConfig = () => {
    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState(null)
    const [loading, setLoading] = useState(true)
    const status = useSelector(state => state.authDuck.isLogged)//false;
    const [modalScreenShot, setModal] = useState(false)

    useEffect(() => {
        getSession()
        if (status) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        setTimeout(() => {
            setLoading(false)
        }, 300)
    },[status])

    useEffect(() => {
        if(hasPermissions()){
            const subscription = ScreenCapture.addScreenshotListener(() => {
                setModal(true)
            });
            return () => subscription.remove();

        }
    },[])

    const hasPermissions = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return status === 'granted';
    };

    const getSession = async() => {
        dispatch(await createSession())
        dispatch(await getRegexToPassword())

    }

    return(
        <NavigationContainer>
            {loading ? (
                <View flex={1} bgColor={'#284ED4'} alignItems={'center'} justifyContent={'center'}>
                    <Spinner size={'sm'} color={'white'}></Spinner>
                </View>
            ):(loading != true && loggedIn) ? <LoggedStack /> : <AuthStack />}
            <ModalScreenShot visible={modalScreenShot} setVisible={() => setModal(false)}/>
        </NavigationContainer>
    )
}

export default NavigationContainerConfig;