import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {MaterialIcons} from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import RecoverPasswordScreen from "../screens/RecoverPaswordScreen";
import ModalTerms from "../screens/ModalTerms";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return(
        <Stack.Navigator
            mode={'card'}
            backBehavior={'history'}
            initialRouteName="Login"
            screenOptions={({navigation, route}) =>({

            })}>
                <Stack.Screen  name='Login' component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name='RecoverPassword' component={RecoverPasswordScreen} options={{headerShown: false}}/>
                <Stack.Group screenOptions={{presentation:'transparentModal', headerShown:false, animation:'slide_from_bottom', gestureEnabled:true }} >
                    <Stack.Screen name="ModalTerms" component={ModalTerms}/>
                </Stack.Group>
        </Stack.Navigator>
    )
}

export default AuthStack;