import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Skeleton } from "native-base";
import { getFontSize } from "../../utils/functions";
import { Colors } from "../../utils/Colors";
import CardGafeteDigitalCredentialLayout from "./CardGafeteDigitalCredentialLayout";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const { height, width } = Dimensions.get("window");

const DigitalCredentialFront = ({ item }) => {
  const loader = useSelector((state) => state.homeDuck.loading);
  const dataUser = useSelector((state) => state.authDuck.dataUser);

  return (
    <View style={styles.contInfo}>
      {item?.image != null && item?.image != "" ? (
        <View>
          <Image source={{ uri: item?.image }} style={styles.imgProfile} />
          <Text style={styles.lblCode}>ID: {item?.code}</Text>
        </View>
      ) : (
        <View>
          <Image
            source={require("../../../assets/profile.png")}
            style={styles.imgProfile}
          />
          <Text style={styles.lblCode}>ID: {item?.code}</Text>
        </View>
      )}
      <View style={{ width: width / 2 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          
          <View>
            <Text style={styles.lblName}>{item?.firstName}</Text>
            <Text style={styles.lblName}>{item?.lastName}</Text>
          </View>
          
        </View>
        <View style={styles.line} />
        
        <View>
          <Text style={[styles.lblBranch, { marginTop: 6 }]}>
            {item?.department}
          </Text>
        </View>
        
      </View>
      {dataUser?.nodeImage != null && dataUser?.nodeImage != "" ? (
        <Image source={{ uri: dataUser?.nodeImage }} style={styles.logoBimbo} />
      ) : (
        <Image
          source={require("../../../assets/logoBimbo.png")}
          style={styles.logoBimbo}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contInfo: {
    marginTop: 20,
    flexDirection: "row",
  },
  imgProfile: {
    marginTop: -20,
    marginLeft: -8,
    width: 110,
    height: 125,
    resizeMode: "cover",
    borderRadius: 15,
    marginRight: 6,
    //elevation:4,
    //shadowColor: '#000', // Color de la sombra
    //shadowOffset: {
    //  width: 4,
    //  height: 4,
    //},
    //shadowOpacity: 0.2,
    //shadowRadius: 4,
  },
  lblName: {
    fontSize: getFontSize(17),
    fontWeight: "700",
  },
  line: {
    width: width / 2.0,
    height: 5,
    backgroundColor: Colors.black,
    marginTop: 6,
  },
  lblBranch: {
    //marginTop:6,
    width: width / 2.4,
    paddingRight: 4,
  },
  lblCode: {
    textAlign: "center",
    marginTop: 8,
    // width: width/2.4,
    fontSize: 16,
    paddingRight: 11,
    fontWeight: "700",
  },
  logoBimbo: {
    width: 50,
    height: 22,
    resizeMode: "contain",
    position: "absolute",
    right: 2,
    top: -20,
  },
  contBtn: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  imgQr: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  imgPointer: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 20,
    right: 0,
  },
});

export default DigitalCredentialFront;
