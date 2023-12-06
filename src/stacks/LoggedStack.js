import React,{useRef, useEffect} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {MaterialIcons} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import * as Notifications from 'expo-notifications';
import { getExpoToken } from "../utils/functions";
import { useSelector, useDispatch } from "react-redux";
import { getInitialData } from "../store/ducks/notificationsDuck";

const Stack = createNativeStackNavigator();


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
const LoggedStack = () => {
    const dispatch = useDispatch();
    const notificationListener = useRef();
    const responseListener = useRef();
    const userId = useSelector(state => state.authDuck?.dataUser?.id)


    useEffect(() => {

        getExpoToken();

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            //setNotification(notification);
            console.log('notification',notification)
            dispatch(getInitialData({userId}))
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(" responseListener.current: ", response);
        });        

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])
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