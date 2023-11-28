import React, { useState } from "react";
import { View, Text } from "react-native";
import ScreenBaseLogged from "../components/screensBase/ScreenBaseLogged";
import InitialPage from "../components/Home/InitialPage";
import ProfilePage from "../components/Home/ProfilePage";
import NotificationsPage from "../components/Home/NotificationsPage";
import CodePage from "../components/Home/CodePage";
import { cancelAutoGenerateCode, activateAutoGenerate } from "../store/ducks/homeDuck";
import { useDispatch } from "react-redux";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const routes = ['initial', 'profile','notifications','code'];
    const [selectedSection, setSelectedSection] = useState('initial');

    const getSelectedRoute = (route) => {
        const obj = routes.reduce((result, key) => {
            result[key] = `${key}`
            return result;
        }, {});
        console.log('route',route,'navegar a ',obj[route]);
        setSelectedSection(obj[route])
    }

    return(
        <ScreenBaseLogged 
            showNotifications={() => getSelectedRoute('notifications')}
            showProfile={() => getSelectedRoute('profile')}>
            {selectedSection === 'initial' ? (
                <InitialPage setQrRoute={() => {getSelectedRoute('code'); dispatch(activateAutoGenerate()) }}/>
            ) : selectedSection === 'notifications' ? (
                <NotificationsPage backHome={() => getSelectedRoute('initial')}/>
            ) : selectedSection === 'profile' ? (
                <ProfilePage backHome={() => getSelectedRoute('initial')}/>
            ) : (
                <CodePage backHome={() => getSelectedRoute('initial')}/>
            )}
        </ScreenBaseLogged>
    )
}

export default HomeScreen;