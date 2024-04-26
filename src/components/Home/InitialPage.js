import React, { useState, useEffect, useRef, useDebugValue } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Spinner } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import moment from "moment/moment";

import DigitalCredentialFront from "../DigitalCredential/DigitalCredentialFront";
import { useDispatch, useSelector } from "react-redux";
import { getLogsUser } from "../../store/ducks/homeDuck";
import CommunicateList from "./CommunicatesList";
import { useNavigation } from "@react-navigation/native";
import CardGafeteDigitalCredentialLayout from "../DigitalCredential/CardGafeteDigitalCredentialLayout";

const { height, width } = Dimensions.get("window");

const InitialPage = ({ setQrRoute, showMoreLogs }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const accessList = useSelector((state) => state.homeDuck.accessList);
  const userId = useSelector((state) => state.authDuck?.dataUser?.id);
  const dataUser = useSelector((state) => state.authDuck.dataUser);
  const pageSize = useSelector((state) => state.homeDuck.pageSize);
  const infoList = useSelector((state) => state.homeDuck.infoList);
  const loader = useSelector((state) => state.homeDuck.loading);
  const credentials = useSelector(
    (state) => state.authDuck.dataUser?.configuration?.credentials
  );
  const communicates = useSelector((state) => state.homeDuck.communicates);
  const bcConfiguration = useSelector(state => state.preferencesDuck.bcConfiguration)
  const [modalCard, setModalCard] = useState(false);

  const getRegisters = () => {
    return accessList.map((item, index) => (
      <View style={styles.cardItem} key={index}>
        <View
          style={[
            styles.contImgItem,
            { backgroundColor: Colors.white /*item.color*/ },
          ]}
        >
          <Image
            source={require("../../../assets/logoBimbo.png")}
            style={styles.imgItem}
          />
        </View>
        <View style={styles.contDesc}>
          <Text style={styles.txtDate}>
            {moment(item.accessDateTime).format("DD MMMM YYYY")}
          </Text>
          <Text style={styles.txtDesc}>
            {moment.utc(item.accessDateTime).local().format("hh:mm A")}
          </Text>
          <Text style={styles.txtDesc}>{item.locationName}</Text>
        </View>
      </View>
    ));
  };

  const getIndicators = (item) => {
    if (!item || typeof item !== "number") return null;

    let indicators = [];
    for (let i = 0; i < item; i++) {
      indicators.push(i);
    }
    return indicators.map((indicator, index) => (
      <View
        key={indicator}
        style={[
          styles.indicator,
          index === currentIndex ? styles.selected : styles.unSelected,
        ]}
      ></View>
    ));
  };

  const change = useRef((item) => {
    if (item && item.viewableItems && item.viewableItems.length > 0) {
      setCurrentIndex(item.viewableItems[0].index);
    }
  });

  const item = {
    firstName: dataUser?.firstName,
    lastName: dataUser?.lastName,
    code: dataUser?.collaboratorId,
    branch: "",
    curp: bcConfiguration?.showCurp,
    nss: bcConfiguration?.showNss,
    birthDate: moment(dataUser?.birthDate).format("DD-MM-YYYY"),
    branch: dataUser?.ouWorkCenter,
    department: dataUser?.ouDepartment,
    company: dataUser?.ouCompany,
    image: dataUser?.profileImage,
  };

  return (
    <View style={styles.container}>
      <View style={styles.contCards}>
        {credentials?.bimboCredential && (
          <CardGafeteDigitalCredentialLayout
            background={credentials?.bimboCredential?.color}
            setQrRoute={setQrRoute}
            isFront={true}
            showHorizontal={() =>
              navigation.navigate("ModalDigitalCredential", {
                item,
                rules: credentials?.bcConfiguration,
              })
            }
          >
            <DigitalCredentialFront item={item} />
          </CardGafeteDigitalCredentialLayout>
        )}
      </View>
      <CommunicateList communicates={communicates} />

      {accessList.length > 0 && (
        <View style={styles.contChecks}>
          <Text style={styles.titleChecks}>Mi última actividad</Text>
          <View style={styles.cardChecks}>
            <View style={styles.contReg}>{getRegisters()}</View>
            {accessList.length > 1 &&
              accessList.length != infoList?.totalItems && (
                <TouchableOpacity
                  onPress={() =>
                    dispatch(
                      getLogsUser({
                        userId,
                        name: `${dataUser.firstName} ${dataUser.lastName}`,
                        pageSize: pageSize + 5,
                      })
                    )
                  }
                  style={{ marginTop: 60 }}
                >
                  {loader ? (
                    <Spinner size={"sm"} color={Colors.grayDark} />
                  ) : (
                    <Text style={styles.showMore}>Ver más registros</Text>
                  )}
                </TouchableOpacity>
              )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contCards: {
    width: width / 1.1,
    paddingTop: 20,
    //height:250,
    marginBottom: 15,
    //backgroundColor:'white'
  },
  card: {
    backgroundColor: Colors.white,
    width: width / 1.1,
    height: height / 3,
    borderRadius: 20,
  },
  contStreak: {
    marginTop: 40,
    width: width / 1.1,
    backgroundColor: Colors.blue2,
    height: 120,
    borderRadius: 20,
    paddingLeft: 20,
    flexDirection: "row",
    paddingRight: 20,
    marginBottom: 20,
  },
  imgStreak: {
    width: 77,
    height: 75,
    resizeMode: "contain",
  },
  lblStreak: {
    fontSize: getFontSize(35),
    position: "absolute",
    left: 27,
    color: Colors.golden,
    fontWeight: "700",
  },
  contDescStreak: {
    justifyContent: "center",
    width: "75%",
    marginLeft: 16,
    paddingRight: 5,
  },
  titleDesStreak: {
    fontSize: getFontSize(23),
    fontWeight: "700",
    color: Colors.white,
    marginBottom: 7,
  },
  subtitleStreak: {
    fontSize: getFontSize(10),
    fontWeight: "400",
    color: Colors.white,
  },
  contChecks: {
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  titleChecks: {
    fontSize: getFontSize(16),
    color: Colors.white,
    fontWeight: "400",
    marginBottom: 25,
  },
  cardChecks: {
    width: width / 1.1,
    backgroundColor: Colors.lightWhite,
    paddingVertical: 30,
    borderRadius: 15,
  },
  contReg: {
    paddingHorizontal: 19,
    //marginBottom:60
  },
  showMore: {
    alignSelf: "center",
    fontSize: getFontSize(16),
    fontWeight: "400",
    textDecorationLine: "underline",
    color: Colors.grayDark,
  },
  cardItem: {
    backgroundColor: Colors.grayV2,
    borderRadius: 20,
    height: 100,
    marginBottom: 14,
    flexDirection: "row",
    paddingRight: 10,
  },
  contImgItem: {
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 13,
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000", // Color de la sombra
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  imgItem: {
    width: 50,
    height: 22,
    resizeMode: "contain",
  },
  contDesc: {
    justifyContent: "center",
    marginLeft: 6,
  },
  txtDate: {
    fontSize: getFontSize(21),
    color: Colors.grayDark,
    fontWeight: "700",
  },
  txtDesc: {
    fontSize: getFontSize(15),
    color: Colors.grayDark,
    fontWeight: "400",
  },
  indicator: {
    width: 10,
    height: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selected: {
    backgroundColor: Colors.lightPurple,
  },
  unSelected: {
    backgroundColor: "#D9CBBD",
  },
  indicatorCont: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default InitialPage;
