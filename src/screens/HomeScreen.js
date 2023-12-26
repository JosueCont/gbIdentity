import React, { useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import ScreenBaseLogged from "../components/screensBase/ScreenBaseLogged";
import InitialPage from "../components/Home/InitialPage";
import ProfilePage from "../components/Home/ProfilePage";
import NotificationsPage from "../components/Home/NotificationsPage";
import CodePage from "../components/Home/CodePage";
import { cancelAutoGenerateCode, activateAutoGenerate, getLogsUser } from "../store/ducks/homeDuck";
import { getInitialData } from "../store/ducks/notificationsDuck";
import { saveExpoToken } from "../store/ducks/authDuck";
import { useDispatch, useSelector } from "react-redux";
import { getExpoToken } from "../utils/functions";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const routes = ['initial', 'profile','notifications','code'];
    const [selectedSection, setSelectedSection] = useState('initial');
    const userId = useSelector(state => state.authDuck?.dataUser?.id)
    const isReadNotify = useSelector(state => state.notifyDuck.isReadNotify)
    const scrollViewRef = useRef();


    useEffect(() => {
        if(userId && userId != undefined ) getInitialConfig()
    },[])

    //useEffect(() => {
    //    if(selectedSection === 'notifications') console.log('leer notificaciones')
    //},[selectedSection])

    useEffect(() => {
        if(selectedSection === 'initial' || isReadNotify) getInfoNotifcationInit()
    },[selectedSection, isReadNotify])

    //useEffect(() => {
    //    (async() => {
    //        //if(userId && userId != undefined ) dispatch(await getLogsUser({userId,}))
    //    })();
    //},[])

    const getInfoNotifcationInit = async() => {
        dispatch(await getInitialData({userId}))
    }

    const getInitialConfig = async() => {
        const expoToken = await getExpoToken();
        const response = await  dispatch(saveExpoToken({userId, expoToken}))

    }

    const getSelectedRoute = (route) => {
        const obj = routes.reduce((result, key) => {
            result[key] = `${key}`
            return result;
        }, {});
        //console.log('route',route,'navegar a ',obj[route]);
        setSelectedSection(obj[route])
    }

    const onMoveScroll = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
          }
    }

    return(
        <ScreenBaseLogged 
            showNotifications={() => getSelectedRoute('notifications')}
            showProfile={() => getSelectedRoute('profile')} scrollViewRef={scrollViewRef} >
            {selectedSection === 'initial' ? (
                <InitialPage setQrRoute={() => {getSelectedRoute('code'); dispatch(activateAutoGenerate()) }}/>
            ) : selectedSection === 'notifications' ? (
                <NotificationsPage backHome={() => getSelectedRoute('initial')} userId={userId} moveOnTop={() => onMoveScroll()}/>
            ) : selectedSection === 'profile' ? (
                <ProfilePage backHome={() => getSelectedRoute('initial')}/>
            ) : (
                <CodePage backHome={() => getSelectedRoute('initial')}/>
            )}
        </ScreenBaseLogged>
    )
}

export default HomeScreen;