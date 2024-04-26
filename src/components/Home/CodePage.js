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
import { Colors } from "../../utils/Colors";
import { getFontSize } from "../../utils/functions";
import moment from "moment/moment";
import HeaderContent from "../HeaderContent";
import CardGafeteDigitalCredentialLayout from "../DigitalCredential/CardGafeteDigitalCredentialLayout";
import QRCode from "react-native-qrcode-svg";
import { useSelector, useDispatch } from "react-redux";
import { getCodeQR } from "../../store/ducks/homeDuck";
import { getDinamicCode } from "../../utils/ApiApp";
import DigitalCredentialBack from "../DigitalCredential/DigitalCredentialBack";
const { height, width } = Dimensions.get("window");

const CodePage = ({ backHome }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authDuck?.dataUser?.id);
  const [code, setCode] = useState(false);
  const [loader, setLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seg, setSeconds] = useState(0);
  const dataUser = useSelector((state) => state.authDuck.dataUser);

  const countdownInterval = useRef(null); // Cambio aquí

  const getCodeQR = async ({ isRunning, userId }) => {
    setLoading(true);
    // Lógica para obtener el código QR...
    try {
      const response = await getDinamicCode(userId);
      if (response?.data?.code) {
        setCode(response.data.code);
        setLoading(false);
        // Inicia el contador aquí solo si es necesario
        startCounter(response.data.seconds - 1);
      }
    } catch (error) {
      console.log("Error al obtener el código QR:", error);
      setLoading(false);
    }
  };

  const startCounter = (totalSeconds) => {
    if (countdownInterval.current !== null) {
      clearInterval(countdownInterval.current); // Usa .current aquí
      console.log("clear");
    }
    let counter = totalSeconds;
    console.log("setInterval");
    countdownInterval.current = setInterval(() => {
      // Cambio aquí
      if (counter >= 0) {
        setMinutes(Math.floor(counter / 60));
        setSeconds(counter % 60);
        counter--;
      } else {
        clearInterval(countdownInterval.current); // Usa .current aquí
        console.log("Tiempo terminado");
        setIsRunning(true);
        // Considera si necesitas llamar a getCodeQR aquí
      }
    }, 1000);
  };

  useEffect(() => {
    if (!dataUser?.fixedQr != null && !dataUser?.fixedQr != "") {
      if (isRunning && seg === 0 && minutes === 0) {
        if (countdownInterval.current !== null) {
          clearInterval(countdownInterval.current); // Limpieza usando .current
        }
        getCodeQR({ isRunning, userId });
        setIsRunning(false);
      }
    }
    // console.log("codePage",isRunning, seg, minutes)
  }, [isRunning, seg, minutes]);

  return (
    <View style={styles.container}>
      <HeaderContent
        isVisibleTitle={false}
        goBack={backHome}
        title="Notificaciones (20)"
      />
      <CardGafeteDigitalCredentialLayout>
        <DigitalCredentialBack code={code} loader={loader} />
      </CardGafeteDigitalCredentialLayout>
      {!dataUser?.fixedQr != null && !dataUser?.fixedQr != "" && (
        <View style={styles.contDesc}>
          <Text style={styles.title}>QR dinámico</Text>
          <Text style={styles.desc}>
            Presente este código QR en la zona de acceso{" "}
          </Text>
          <Text style={styles.hour}>
            Válido por {minutes < 10 ? `0${minutes}` : minutes}:
            {seg < 10 ? `0${seg}` : seg} {minutes <= 0 ? "sec" : "min"}.
          </Text>
        </View>
      )}
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

export default CodePage;
