import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Spinner, Skeleton } from "native-base";
import QRCode from "react-native-qrcode-svg";
import ModalQr from "../modals/ModalQr";
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import { useSelector, useDispatch } from "react-redux";
const { height, width } = Dimensions.get("window");
import { getInfoCredentials } from "../../utils/ApiApp";

const DigitalCredentialBack = ({ code, loader }) => {
  const dataUser = useSelector((state) => state.authDuck.dataUser);
  const [modalQr, setModalQr] = useState(false)
  const [bcConfiguration, setBcConfiguration] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getBcConfiguration(dataUser.id)
  }, []);

  const getBcConfiguration = async (userId) => {
    setLoading(true);
    // Lógica para obtener el código QR...
    try {
      const response = await getInfoCredentials(userId);
      if (response?.data) {
        console.log("response.data", response.data)
        setBcConfiguration(response.data.bcConfiguration);
        setLoading(false); 
      }
    } catch (error) {
      console.log("Error al la configuración de tarjetas", error);
      setLoading(false);
    } 
  }



  return (
    <View
      style={{ alignSelf: "flex-start", marginBottom: 5, flexDirection: "row" }}
    >
      {!dataUser?.fixedQr != null && !dataUser?.fixedQr != "" ? (
        code != "" && !loader ? (
          <View style={styles.contInfo}>
             <TouchableOpacity style={styles.contInfo} onPress={() => setModalQr(true)}>
            <QRCode
              style={styles.qrCode}
              value={code}
              // logo={require('../../../assets/logoBimbo.png')}
              logoSize={10}
              color={Colors.blueText}
              logoBackgroundColor="transparent"
              size={140}
            />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              height: height / 4.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner size={"sm"} color={Colors.blue} />
          </View>
        )
      ) : (
        <View style={{ width: 170, height: 190 }}>
          <Image
            source={{ uri: dataUser?.fixedQr }}
            style={{ flex: 1, resizeMode: "cover" }}
          />
        </View>
      )}
      <View style={{ width: width / 2, marginLeft: 8 }}>
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
              {bcConfiguration?.showBirthDate && (
                <View
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <Text style={styles.lblUserConfig}>RFC:</Text>
                  <Text style={styles.lblUserValue}>{dataUser?.rfc}</Text>
                </View>
              )}
              {bcConfiguration?.showCurp && (
                <View
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <Text style={styles.lblUserConfig}>CURP:</Text>
                  <Text style={styles.lblUserValue}>{dataUser?.curp}</Text>
                </View>
              )}
              {bcConfiguration?.showNss && (
                <View
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <Text style={styles.lblUserConfig}>IMSS:</Text>
                  <Text style={styles.lblUserValue}>{dataUser?.nss}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      <ModalQr 
        visible={modalQr}
        onClose={() => setModalQr(false)}
        code={code}
        dataUser={dataUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contInfo: {
    marginTop: 10,
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: height / 3.5,
    height: height / 4.5,
    resizeMode: "contain",
    alignSelf: "center",
  },
  contDesc: {
    marginTop: 15,
    width: width / 1.1,
    height: height / 5,
    backgroundColor: Colors.blue2,
    borderRadius: 20,
    alignItems: "center",
    paddingTop: 10,
  },
  title: {
    fontSize: getFontSize(23),
    color: Colors.white,
    fontWeight: "700",
  },
  desc: {
    fontSize: getFontSize(18),
    fontWeight: "400",
    textAlign: "center",
    marginTop: 7,
    color: Colors.white,
  },
  hour: {
    fontSize: getFontSize(15),
    fontWeight: "300",
    color: Colors.white,
    marginTop: 15,
  },
  qrCode: {
    width: 110,
    height: 125,
    alignSelf: "flex-start",
  },
  lblCompany: {
    fontSize: getFontSize(16),
    fontWeight: "700",
    paddingBottom: 5,
  },
  lblUserConfig: {
    fontSize: getFontSize(13),
    fontWeight: "600",
  },
  lblUserValue: {
    fontSize: getFontSize(12),
  },
});

export default DigitalCredentialBack;
