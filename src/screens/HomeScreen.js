import React, { useEffect, useState, useRef } from "react";
import { View, Text, BackHandler } from "react-native";
import ScreenBaseLogged from "../components/screensBase/ScreenBaseLogged";
import InitialPage from "../components/Home/InitialPage";
import ProfilePage from "../components/Home/ProfilePage";
import NotificationsPage from "../components/Home/NotificationsPage";
import CodePage from "../components/Home/CodePage";
import { cancelAutoGenerateCode, activateAutoGenerate, getLogsUser, onSetRoute, onGetColorDay, getCommunicates, onRefreshAction } from "../store/ducks/homeDuck";
import { userPreferences } from "../store/ducks/preferencesDuck";
import { getInitialData } from "../store/ducks/notificationsDuck";
import { saveExpoToken } from "../store/ducks/authDuck";
import { useDispatch, useSelector } from "react-redux";
import { getExpoToken } from "../utils/functions";
import { useNavigation, useRoute } from "@react-navigation/native";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const routes = ['initial', 'profile','notifications','code'];
    const [selectedSection, setSelectedSection] = useState('initial');
    const userId = useSelector(state => state.authDuck?.dataUser?.id)
    const isReadNotify = useSelector(state => state.notifyDuck.isReadNotify)
    const dataUser = useSelector(state => state.authDuck.dataUser)
    const refresh = useSelector(state => state.homeDuck.refresh)
    const scrollViewRef = useRef();
const navigation = useNavigation();

    useEffect(() => {
        if(userId && userId != undefined ) getInitialConfig()
    },[])

    //useEffect(() => {
    //    if(selectedSection === 'notifications') console.log('leer notificaciones')
    //},[selectedSection])

    useEffect(() => {
        if(selectedSection === 'initial' || isReadNotify) getInfoNotifcationInit()
    },[selectedSection, isReadNotify])

    useEffect(() => {
        (async() => {
            if(userId && userId != undefined ) dispatch(await getLogsUser({userId, name: `${dataUser.firstName} ${dataUser.lastName}`, pageSize: 5,}))
        })();
    },[])

    useEffect(() => {
        const handleBackButton = () => {
            if(navigation.getState().routes.find(item => item?.name === 'ModalDigitalCredential') != undefined){
                navigation.goBack()
            }
            setSelectedSection('initial')
            return true
        }
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
    },[])

    const getInfoNotifcationInit = async() => {
        dispatch(await getInitialData({userId}))
    }

    const getInitialConfig = async() => {
        const expoToken = await getExpoToken();
        const response = await  dispatch(saveExpoToken({userId, expoToken}))
        await dispatch(userPreferences(userId))
        await dispatch(onGetColorDay())
        dispatch(getCommunicates({pageNumber: 1, pageSize: 1000}))


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

    const onRefresh = async() => {
        dispatch(onRefreshAction())
        setTimeout(() => {
            dispatch(userPreferences(userId))
            dispatch(onGetColorDay())
            dispatch(getCommunicates({pageNumber: 1, pageSize: 1000}))
            dispatch(getInitialData({userId}))
            dispatch(getLogsUser({userId, name: `${dataUser.firstName} ${dataUser.lastName}`, pageSize: 5,}))
        },500)
        console.log('refresh')
    }

    return(
        <ScreenBaseLogged 
            showNotifications={() => getSelectedRoute('notifications')}
            showProfile={() => getSelectedRoute('profile')} 
            scrollViewRef={scrollViewRef} 
            refresh={refresh}
            onRefresh={() => onRefresh()}>
            {selectedSection === 'initial' ? (
                <InitialPage setQrRoute={() => {getSelectedRoute('code'); /*dispatch(activateAutoGenerate())*/ }}/>
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