import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Skeleton } from "native-base";
import { Colors } from "../../utils/Colors";
import { useSelector } from "react-redux";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import ModalCredential from "../modals/ModalDigitalCredential";

const { height, width } = Dimensions.get("window");

const CardGafeteDigitalCredentialLayout = ({
  children,
  background = Colors.white,
  setQrRoute,
  isFront = false,
  showHorizontal,
  isHorizontal = false,
  hideMaxContent = false,
  isMaximizedContent = false,
  setIsFront,
}) => {
  const colorDay = useSelector((state) => state.homeDuck.colorDay);
  const loader = useSelector((state) => state.homeDuck.loading);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: background },
        isHorizontal && {
          transform: [{ scale: Platform.OS === "ios" ? 1.5 : 1.5 }],
        },
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.contChild}>{children}</View>
        <View style={{ alignSelf: "flex-start", paddingTop: 10 }}>
          <Image
            source={require("../../../assets/verticalBar.gif")}
            style={{ width: 8, height: 150 }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: -1,
        }}
      >
        <Image
          source={require("../../../assets/horizontalBar.gif")}
          style={{ width: 200, height: 20, marginLeft: -16 }}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {isMaximizedContent ? (
            <TouchableOpacity onPress={showHorizontal}>
              <AntDesign name="shrink" size={20} color={Colors.blue} />
            </TouchableOpacity>
          ) : isFront ? (
            isHorizontal ? (
              <TouchableOpacity onPress={showHorizontal}>
                <AntDesign name="shrink" size={27} color={Colors.blue} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={showHorizontal}>
                <Ionicons name="expand" size={27} color={Colors.blue} />
              </TouchableOpacity>
            )
          ) : null}
          {isMaximizedContent ? (isFront ? (
            <TouchableOpacity onPress={()=>{setIsFront(false)}}>
            <Image
              source={require("../../../assets/qr-icon.png")}
              style={styles.imgQrMax}
            />
          </TouchableOpacity>
          ):(<TouchableOpacity onPress={()=>{setIsFront(true)}}>
            <Image
              source={require("../../../assets/profile.png")}
              style={styles.imgQrMax}
            />
          </TouchableOpacity>)) : isFront && !hideMaxContent && (
            <View style={styles.contBtn}>
              {loader ? (
                <Skeleton
                  lines={1}
                  width={30}
                  height={30}
                  borderRadius={5}
                  backgroundColor={"gray.100"}
                />
              ) : (
                <TouchableOpacity onPress={setQrRoute}>
                  <Image
                    source={require("../../../assets/qr-icon.png")}
                    style={styles.imgQr}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: colorDay != "" ? colorDay : Colors.white,
              marginTop: 0,
              marginHorizontal: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width / 1.1,
    //height: height/3.4,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemColor: {
    width: 7,
    height: 30,
    marginBottom: 2,
  },
  itemColorRow: {
    width: 52,
    height: 8,
    marginBottom: 2,
    marginRight: 3,
  },
  contChild: {
    width: width / 1.2,
    //height: height/4,
  },
  contBtn: {
    alignSelf: "flex-end",
    marginLeft: 10,
  },
  imgQr: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  imgQrMax: {
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 8,
    marginRight: 8,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default CardGafeteDigitalCredentialLayout;
