import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Linking, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const InfoModal = ({ isVisible, onClose }) => {
    const openPhoneApp = () => {
        Linking.openURL(`tel:+5219992191253`);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.centeredView}
                activeOpacity={1}
                onPressOut={onClose}
            >
                <View style={styles.modalView} onStartShouldSetResponder={() => true}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>¿Cómo consigo estos datos?</Text>
                    <Text style={styles.modalContent}>
                        El código es generado como medio de identificación para acceder a nuestras instalaciones. Este sistema está diseñado para garantizar la seguridad y la gestión eficiente del acceso.
                    </Text>
                    <Text style={styles.modalContent}>
                        Para visitas como escuelas, universidades y proveedores es necesario ingresar este dato que ha sido previamente enviado a su correo para poder registrarse a esta app y utilizar su credencial digital de acceso. Estos accesos son temporales y se ajustan a la duración de la visita sin embargo la app es la misma para cada una de sus visitas a nuestras instalaciones.
                    </Text>
                    <Text style={styles.modalContent}>
                        Para colaboradores en instalaciones es necesario proporcionar tres datos asignados durante su contratación. Esto asegura que solo el personal autorizado pueda acceder a áreas restringidas.
                    </Text>
                    <Text style={styles.modalContent}>
                        Los accesos son válidos solo para un dispositivo al mismo tiempo, reforzando la seguridad y evitando el uso compartido de credenciales.
                    </Text>
                    <Text style={styles.callText}>Para obtener accesos llamar al:</Text>
                    <TouchableOpacity onPress={openPhoneApp}>
                        <Text style={styles.linkText}>Soporte GbIdentity</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        minHeight: height * 0.8,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    modalTitle: {
        marginBottom: 25,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18
    },
    modalContent: {
        marginBottom: 15,
        textAlign: "center"
    },
    callText: {
        marginTop: 20,
        marginBottom: 5,
        textAlign: "center",
        fontWeight: "bold",
    },
    linkText: {
        color: "#0000EE",
        textDecorationLine: "underline",
        textAlign: "center",
        fontSize: 18,
        marginBottom: 20,
    },
});

export default InfoModal;