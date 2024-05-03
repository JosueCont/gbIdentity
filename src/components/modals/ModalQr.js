import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";
import { useSelector } from "react-redux";
import { getFontSize } from "../../utils/functions";
import QRCode from "react-native-qrcode-svg";

const { height, width } = Dimensions.get("window");

const ModalQr = ({ visible, onClose, code, dataUser }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent supportedOrientations={['portrait', 'landscape']}>
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={onClose}
            style={{ alignSelf: "flex-end", marginBottom: 10 }}
          >
            <AntDesign name="closecircle" size={20} color={Colors.blueText} />
          </TouchableOpacity>
          {!dataUser?.fixedQr != null && !dataUser?.fixedQr != "" ? (
            <QRCode
              style={styles.qrCode}
              value={code}
              // logo={require('../../../assets/logoBimbo.png')}
              logoSize={10}
              color={Colors.blueText}
              logoBackgroundColor="transparent"
              size={260}
            />
          ) : (
            <View style={{ height: 270 }}>
              <Image
                source={{ uri: dataUser?.fixedQr }}
                style={{
                  flex: 1,
                  resizeMode: "contain",
                  width: 620,
                  height: 225,
                  alignSelf: "flex-start",
                }}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.8)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginBottom: 20,
  },
  txt: {
    fontSize: getFontSize(20),
    fontWeight: "400",
    marginBottom: 20,
  },
  btn: {
    width: width / 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  lblBtn: {
    color: Colors.white,
    fontSize: getFontSize(18),
  },
  card: {
    width: width / 1.2,
    //height: height/3 ,
    backgroundColor: Colors.white,
    alignItems: "center",
    borderRadius: 10,
    //paddingHorizontal:10,
    paddingBottom: 25,
  },
});

export default ModalQr;
