import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { getFontSize } from "../../utils/functions";
import { openModalHome, closeModalHome } from "../../store/ducks/homeDuck";
import { logoutAction } from "../../store/ducks/authDuck";
import { Colors } from "../../utils/Colors";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import ModalAlertConfirm from "../modals/ModalAlert";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/es";

const { height, width } = Dimensions.get("window");

const ScreenBaseLogged = ({
  children,
  showNotifications,
  showProfile,
  scrollViewRef,
  refresh = false,
  onRefresh,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authDuck.dataUser);
  const badge = useSelector((state) => state.notifyDuck.badgeNotification);
  const isCloseSession = useSelector(state => state.homeDuck.isCloseSession)
  const message = useSelector(state => state.homeDuck.message) 

  const modalConfirm = useSelector(state => state.homeDuck.modalConfirm)

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        // backgroundColor={Colors.blue}
        barStyle={"default"}
        //showHideTransition={statusBarTransition}
        hidden={false}
      />
      <View style={styles.contHeader}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 12 }}>
          {/* <TouchableOpacity onPress={showProfile} style={styles.contShadow} >
                        {user?.id != 'a1c7cad5-f359-44b2-867e-4fd19c8e0f4b' ? (user?.profileImage !=null && user?.profileImage !='') ? (
                            <Image source={{uri: user?.profileImage}} style={styles.imgProfile}/>
                        ):(
                            <Image source={require('../../../assets/profile.png')} style={styles.imgProfile}/>

                        ): <Image source={require('../../../assets/user.jpg')} style={styles.imgProfile}/>}

                    </TouchableOpacity> */}
          <View style={{ flexDirection: "column", marginLeft: 12, justifyContent: "flex-start" }}>
            <Text style={styles.lblDesc}>
              {user?.gender == 1 ? "Bienvenida" : "Bienvenido"}
            </Text>
            {/* <Text style={styles.lblName}>{user?.firstName}</Text>
                        <Text style={styles.lblName}>{user?.lastName}</Text> */}
            {/*<Text style={styles.lblDesc}>Miembro desde:</Text>
                        <Text style={[styles.lblDesc,{textTransform:'capitalize'}]}>{moment(user?.entryDate).format('MMMM YYYY')}</Text>*/}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
              onPress={() =>{
                dispatch(openModalHome({
                    prop:'modalConfirm', 
                    value:true, 
                    message:'¿Deseas cerrar sesión?',
                    close: true
                }))
            }}
              style={styles.btnNoti}
            >
              <> 
                <FontAwesome5 name="power-off" size={16} color="black" />
                 
              </>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showProfile}
              style={styles.btnNoti}
            >
              <> 
                <FontAwesome5 name="user-alt" size={16} color="black" />
                 
              </>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={showNotifications}
              style={styles.btnNoti}
            >
              <>
                <Entypo name="bell" size={16} color="black" />
                {badge > 0 ? (
                  <View style={styles.contlblIcon}>
                    <Text style={styles.lblBadge}>
                      {badge <= 10 ? badge.toString() : "10+"}
                    </Text>
                  </View>
                ) : null}
              </>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ModalAlertConfirm 
                visible={modalConfirm}
                onClose={() => {
                    dispatch(closeModalHome({prop:'modalConfirm', value:false, }))
                }}
                setConfirm={() => {
                    dispatch(closeModalHome({prop:'modalConfirm', value:false, }))
                    setTimeout(() => {
                        isCloseSession ? dispatch(logoutAction()) : dispatch(onChangePasswordLogged({userId, password}))
                    },500)
                }}
                message={message}
            />
      <ScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            tintColor={Colors.white}
          />
        }
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        nestedScrollEnabled={true}
        overScrollMode="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
  },
  contHeader: {
    marginTop: 33,
    margin: 10,
    backgroundColor: Colors.blue,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 22,
  },
  btnNoti: {
    marginTop: 0,    
    backgroundColor: Colors.whiteInput,
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 6,    
    justifyContent: "center",
    alignItems: "center",
  },
  contlblIcon: {
    backgroundColor: "red",
    width: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 20,
    top: 0,
  },
  lblBadge: {
    fontSize: getFontSize(12),
    color: Colors.white,
  },
  lblDesc: {
    fontSize: getFontSize(24),
    fontWeight: "700",
    color: Colors.white,
  },
  lblName: {
    fontSize: getFontSize(27),
    fontWeight: "700",
    color: Colors.white,
    textTransform: "capitalize",
  },
  imgProfile: {
    marginLeft: 3,
    width: 80,
    height: 90,
    resizeMode: "cover",
    borderRadius: 15,
  },
  contShadow: {
    elevation: 4,
    shadowColor: "#000", // Color de la sombra
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default ScreenBaseLogged;
