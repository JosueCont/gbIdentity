import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {MaterialIcons} from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return(
        <Stack.Navigator
            mode={'card'}
            backBehavior={'history'}
            
            screenOptions={({navigation, route}) =>({

            })}>
                <Stack.Screen  name='Login' component={LoginScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default AuthStack;