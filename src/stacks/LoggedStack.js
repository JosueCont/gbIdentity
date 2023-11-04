import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {MaterialIcons} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();


const LoggedStack = () => {
    return(
        <Stack.Navigator
            mode={'card'}
            backBehavior={'history'}
            
            screenOptions={({navigation, route}) =>({

            })}>
                <Stack.Screen  name='Home' component={HomeScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default LoggedStack;