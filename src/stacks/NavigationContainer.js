import React,{useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Spinner, View} from "native-base";
import AuthStack from "./AuthStack";
import LoggedStack from "./LoggedStack";
import { Colors } from "../utils/Colors";


const NavigationContainerConfig = () => {
    const [loggedIn, setLoggedIn] = useState(null)
    const [loading, setLoading] = useState(true)
    const status = false;

    useEffect(() => {
        if (status) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        setTimeout(() => {
            setLoading(false)
        }, 300)
    },[status])

    return(
        <NavigationContainer>
            {loading ? (
                <View flex={1} bgColor={'#284ED4'} alignItems={'center'} justifyContent={'center'}>
                    <Spinner size={'sm'} color={'white'}></Spinner>
                </View>
            ):(loading != true && loggedIn) ? <LoggedStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default NavigationContainerConfig;