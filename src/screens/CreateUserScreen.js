import React,{useEffect,useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ScreenBaseAuth from "../components/screensBase/ScreenBaseAuth";
import FormValidateUser from "../components/FormValidateUser";
import ModalErrorLogin from "../components/modals/ModalErrorLogin";
import { closeModal } from "../store/ducks/authDuck";
import FormConfirmPassword from "../components/FormConfirmPassword";
import CardRecover from "../components/CardRecoverPassword";
import { AntDesign } from '@expo/vector-icons';


const CreateUserScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const modalActive = useSelector(state => state.authDuck.modalRecover)
    const isValidCollaborator = useSelector(state => state.authDuck.isValidateToNewUser)
    const isCreatedUser = useSelector(state => state.authDuck.isCreatedUser)

    useEffect(() => {
        if(isCreatedUser){
            setTimeout(() => {
                navigation.navigate('Login')
            },3000)
        }
    },[isCreatedUser])


    return(
        <ScreenBaseAuth title="Verificaremos sus datos, por favor ingrese la siguiente información">
            {isValidCollaborator ? !isCreatedUser ? (
                <FormConfirmPassword isNewUser={true} title='Agregar'/>
            ):(
                <CardRecover>
                    <Text style={{fontSize:getFontSize(25), color:Colors.grayDark, fontWeight:'700', textAlign:'center', marginBottom:15}}>Se ha creado correctamente tu cuenta</Text>
                    <AntDesign name="checkcircle" size={120} color={Colors.lightBlue} />
                </CardRecover>
            ): <FormValidateUser isNewUser={true} />}
            

            <ModalErrorLogin visible={modalActive} onClose={() => dispatch(closeModal({prop:'modalRecover',value:false})) }/>
            
        </ScreenBaseAuth>
    )
}

const styles = StyleSheet.create({

})

export default CreateUserScreen;