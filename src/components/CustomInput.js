import React, {useState} from "react";
import { TextInput, StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import { Colors } from "../utils/Colors";
import { Feather } from '@expo/vector-icons';


const {height, width} = Dimensions.get('window');

const Input = ({value, setValue, showEye=false ,background = Colors.whiteInput, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)

    return(
        <View>
            <TextInput 
                onChangeText={setValue} 
                value={value} 
                style={[styles.input,{backgroundColor: background, }]} 
                {...props}
                secureTextEntry={showEye ? !showPassword : false}
            />
            {showEye &&<View style={{position:'absolute', right:5, top:10}}>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? 'eye-off' :"eye"} size={24} color={Colors.darkBlue} />
                </TouchableOpacity>
            </View>}
        
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        width:width/1.27, 
        height: 50,  
        borderRadius:8, 
        padding:7,
        elevation:2,
        shadowColor: '#000', // Color de la sombra
        shadowOffset: {
          width: 0,  
          height: 4,
        },
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
    }
})

export default Input;