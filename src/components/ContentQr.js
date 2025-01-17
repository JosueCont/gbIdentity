import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import { Skeleton, Spinner } from "native-base";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import { useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import { MaterialIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const ContentQr = ({ code, loader, userId }) => {
  const dataUser = useSelector((state) => state.authDuck.dataUser);
  const bcConfiguration = useSelector(state => state.preferencesDuck.bcConfiguration)

   
  return (
    <View
      style={{
        alignSelf: "flex-start",
        marginBottom: 10,
        flexDirection: "row",
      }}
    >
      {!dataUser?.fixedQr != null && !dataUser?.fixedQr !='' ? (
        code != "" && !loader ? (
          // <QRCode
          //     value={code}
          //     // logo={require('../../assets/logoBimbo.png')}
          //     logoSize={20}
          //     color={Colors.blueText}
          //     logoBackgroundColor='transparent'
          //     size={150}
          // />

          <View style={styles.contInfo}>
            <QRCode
              style={styles.qrCode}
              value={code}
              // logo={require('../../../assets/logoBimbo.png')}
              logoSize={10}
              color={Colors.blueText}
              logoBackgroundColor="transparent"
              size={140}
            />
          </View>
        ) : (
          <View
            style={{
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner size={"sm"} color={Colors.blue} />
          </View>
        )
      ) : (
        <Image
          source={{uri: dataUser?.fixedQr}}
          style={{ width: 170, height: 170, resizeMode: "contain" }}
        />
      )}
      <View style={{ width: width / 4, marginLeft: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {loader ? (
            <View>
              <Skeleton.Text
                px="10"
                lines={2}
                mb={2}
                mt={2}
                backgroundColor={"gray.100"}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.lblCompany}>{dataUser?.ouCompany}</Text>
              { dataUser?.rfc && <View
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <Text style={styles.lblUserConfig}>RFC:</Text>
                <Text style={styles.lblUserValue}>{dataUser?.rfc}</Text>
              </View>}
              { bcConfiguration?.showCurp && <View
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <Text style={styles.lblUserConfig}>CURP:</Text>
                <Text style={styles.lblUserValue}>{dataUser?.curp}</Text>
              </View>}
              { bcConfiguration?.showNss && <View
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <Text style={styles.lblUserConfig}>IMSS:</Text>
                <Text style={styles.lblUserValue}>{dataUser?.nss}</Text>
              </View>}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contInfo: {
    marginTop: 10,
    flexDirection: "row",
  },
  qrCode: {
    width: 110,
    height: 125,
    alignSelf: "flex-start",
  },
  lblCompany: {
    fontSize: getFontSize(16),
    fontWeight: "700",
    paddingBottom: 5
  },
  lblUserConfig: {
    fontSize: getFontSize(13),
    fontWeight: "600",
  },
  lblUserValue: {
    fontSize: getFontSize(12),
  },
});

export default ContentQr;
