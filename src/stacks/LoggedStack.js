import React,{useRef, useEffect} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {MaterialIcons} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import * as Notifications from 'expo-notifications';
import { getExpoToken } from "../utils/functions";
import { useSelector, useDispatch } from "react-redux";
import { getInitialData } from "../store/ducks/notificationsDuck";
import ModalInfoCommunicate from "../components/modals/ModalInfoCommunicate";
import ModalDigitalCredential from "../components/modals/ModalDigitalCredential";

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
        notificationListener.current = Notifications.addNotificationReceivedListener(async(notification) => {
            //setNotification(notification);
            console.log('notification',notification)
            await dispatch(getInitialData({userId}))
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
                <Stack.Group screenOptions={{presentation:'transparentModal', headerShown:false, animation:'slide_from_bottom', gestureDirection:'vertical', gestureEnabled:true,  }} >
                    <Stack.Screen name="ModalCommunicate" component={ModalInfoCommunicate}/>
                    <Stack.Screen name="ModalDigitalCredential" component={ModalDigitalCredential} options={{ presentation:'card', orientation:'landscape',}}/>
                </Stack.Group>
        </Stack.Navigator>
    )
}

export default LoggedStack;