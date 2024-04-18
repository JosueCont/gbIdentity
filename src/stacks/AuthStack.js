import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {MaterialIcons} from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import RecoverPasswordScreen from "../screens/RecoverPaswordScreen";
import ModalTerms from "../screens/ModalTerms";
import CreateUserScreen from "../screens/CreateUserScreen";
import UpdatePassword from "../screens/UpdatePassword";
import ConfirmPasswordScreen from "../screens/ConfirmPasswordScreen";
import ConfirmCreateUserScreen from "../screens/ConfirmCreateUserScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return(
        <Stack.Navigator
            mode={'card'}
            backBehavior={'history'}
            initialRouteName="Login"
            screenOptions={({navigation, route}) =>({
                headerShown:false
            })}>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='RecoverPassword' component={RecoverPasswordScreen} />
                <Stack.Screen name="CreateUser" component={CreateUserScreen}/>
                <Stack.Screen name="UpdatePassword" component={UpdatePassword}/>
                <Stack.Screen name="ConfirmPassword" component={ConfirmPasswordScreen}/>
                <Stack.Screen name="ConfirmCreateUser" component={ConfirmCreateUserScreen}/>
                <Stack.Group screenOptions={{presentation:'transparentModal', headerShown:false, animation:'slide_from_bottom', gestureEnabled:true }} >
                    <Stack.Screen name="ModalTerms" component={ModalTerms}/>
                </Stack.Group>
        </Stack.Navigator>
    )
}

export default AuthStack;