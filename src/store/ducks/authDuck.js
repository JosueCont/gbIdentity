import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
    postLogin, postRecoverPassword, postValidateDataCollaborator, postChangeCollaboratorPassword,
    postSaveExpoToken,
    logoutUser
 } from "../../utils/ApiApp";
import { saveTokens } from "../../utils/functions";
import moment from "moment";

const CHANGE_EMAIL = 'change_email';
const CHANGE_PASSWORD = 'change_password';
const CHANGE_CHECKBOX = 'change_checkbox';
const CHANGE_REPEAT_PASSWOTD = 'change_repeat_password';
const CLOSE_MODAL = 'close_modal'

const LOADER = 'loader';
const LOGIN_SUCCESS = 'login_success';
const LOGIN_FAILED = 'login_failed';
const LOGOUT = 'logout';

const RECOVER_PASSWORD_SUCCESS = 'recover_password_success';
const RECOVER_PASSWORD_FAILED = 'recover_password_failed';
const NO_SIMILAR_PASSWORD = 'no_similar_password';
const PASSWORD_CHANGED_SUCESS = 'password_changed_sucess'
const PASSWORD_CHANGED_FAILED = 'password_changed_failed'

const initialState = {
    email:'',
    password:'',
    isChecked: false,
    loading: false,
    isLogged:false,
    message:'',
    dataUser:null,
    modalErrorLogin:false,
    isValidCollaborator:false,
    modalRecover:false,
    repeatPassword:'',
    isChangedPassword:false,
    userId:''
}

const authDuck = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_EMAIL:
            return{ ...state, email: action.payload }
        case CHANGE_PASSWORD:
            return{ ...state, password: action.payload }
        case CHANGE_REPEAT_PASSWOTD:
            return{...state, repeatPassword: action.payload}
        case CHANGE_CHECKBOX:
            return{ ...state, isChecked: action.payload }
        case LOADER:
            return{ ...state, loading: true}
        case LOGIN_SUCCESS:
            return{ ...state, dataUser: action.payload, loading:false, isLogged: true, email:'', password:'', isChecked:false}
        case LOGIN_FAILED:
            return{ ...state, loading: false, message: action.message, isLogged: false, email:'', password:'',isChecked:false, modalErrorLogin:true}
        case LOGOUT:
            return{ ...state, isLogged: false, dataUser: null}
        case CLOSE_MODAL:
            return{ ...state, [action.payload.prop]:action.payload.value}
        case RECOVER_PASSWORD_SUCCESS:
            return {...state, isValidCollaborator:true, loading: false, userId: action.payload }
        case RECOVER_PASSWORD_FAILED:
            return{ ...state, isValidCollaborator: false, message: action.message, modalRecover: true, loading: false, email:''}
        case NO_SIMILAR_PASSWORD:
            return{ ...state, message: action.message, modalRecover: true, loading:false, repeatPassword:''}
        case PASSWORD_CHANGED_SUCESS:
            return{ ...state, isChangedPassword: true, password:'',isChecked:false, userId:'', loading:false}
        case PASSWORD_CHANGED_FAILED:
            return{ ...state, isChangedPassword:false, modalRecover:true, message: action.message, loading:false, repeatPassword:'',password:''}
        default:
            return state;
    }
}

export const setValueEmail = (data) => {
    return{
        type: CHANGE_EMAIL,
        payload: data
    }
}

export const setValuePAssword = (data) => {
    return{
        type: CHANGE_PASSWORD,
        payload: data
    }
}

export const setRepeatPassword = (data) => {
    return{
        type: CHANGE_REPEAT_PASSWOTD,
        payload: data
    }
}

export const setValueCheckbox = (data) => {
    return{
        type: CHANGE_CHECKBOX,
        payload: data
    }
}

export const loginAction = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADER})
        const login = await postLogin(data)
        if(login?.data?.user?.id && login?.data?.user?.userType === 3){
            console.log('dataYSe',login?.data)
            await saveTokens(login?.data?.accessToken, login?.data?.refreshToken, login?.data?.user)
            dispatch({type: LOGIN_SUCCESS, payload: login.data.user})
        }else{
            dispatch({type: LOGIN_FAILED, message:'El correo o la contraseña son incorrectos'})
        }

    } catch (e) {
        console.log('error',e)
        dispatch({type: LOGIN_FAILED, message:'Ha ocurrido un error, intenta otra vez'})

    }
}

export const logoutAction = () => async(dispatch) => {
    try {
        await logoutUser({})
        await AsyncStorage.removeItem('accessToken')
        await AsyncStorage.removeItem('refreshToken')
        await AsyncStorage.removeItem('user')

        dispatch({type: LOGOUT})

    } catch (e) {
        console.log('error al cerrar session', e);
    }
}

export const closeModal = ({prop, value}) => {
    console.log()
    return{
        type: CLOSE_MODAL,
        payload: {prop, value}
    }
}

export const onRecoveryPassword = (email) => async(dispatch) => {
    try {
        dispatch({type: LOADER})
        const response = await postRecoverPassword({email})
        console.log('response email recover', response.data)
        setTimeout(() =>{
            dispatch({type: RECOVER_PASSWORD_SUCCESS})
        },500)

    } catch (e) {
        console.log('error',e)
        dispatch({type: RECOVER_PASSWORD_FAILED, message: 'El correo no es válido'})
    }
}

export const onValidateCollaborator = (data) => async(dispatch) => {
    try {
        dispatch({type:LOADER})
        let dataSend = {
            "collaboratorId": data.email,
            "entryDate": moment(data.ingress,'YYYY-MM-DD').toISOString(),
            "birthDate": moment(data.birthdayDate,'YYYY-MM-DD').toISOString()
        }
        const response = await postValidateDataCollaborator(dataSend)
        console.log('response',response?.data)
        if(response?.data?.id){
            setTimeout(() =>{
                dispatch({type: RECOVER_PASSWORD_SUCCESS, payload: response?.data?.id})
            },500)
        }else{
            dispatch({type: RECOVER_PASSWORD_FAILED, message: 'Los datos ingresados no son validos'})
        }
        console.log()
    } catch (error) {
        console.log('error validar colaboratot',error)
        dispatch({type: RECOVER_PASSWORD_FAILED, message: 'Algo salio mal, intentalo de nuevo'})

    }
}

export const onChangeCollaboratorPassword = (data) => async(dispatch) => {
    try {
        dispatch({type:LOADER})
        let dataSend = {
            userId: data.userId,
            newPassword: data.password
        }
        console.log('dataSend',dataSend)
        const response = await postChangeCollaboratorPassword(dataSend)
        console.log('cambio de contraseña', response?.data)
        //Validar que se hizo el cambio
        dispatch({type: PASSWORD_CHANGED_SUCESS})
    } catch (e) {
        dispatch({type: PASSWORD_CHANGED_FAILED, message:'Algo salio mal, intentalo de nuevo'})
        console.log('errorm',e)
    }
}

export const validatePassword = (data) => async(dispatch) =>{
    if (data.password.localeCompare(data.repeatPassword) === 0) {
        console.log('Las contraseñas son iguales');
        //mandar userId tambien
        dispatch(onChangeCollaboratorPassword(data))
      } else {
        dispatch({type: NO_SIMILAR_PASSWORD, message: 'Las contraseñas no coinciden, intenta de nuevo'})
      }
}

export const createSession = () => async(dispatch) => {
    try {
        const user = await AsyncStorage.getItem('user');
        if(JSON.parse(user)){
            dispatch({type: LOGIN_SUCCESS, payload: JSON.parse(user)})
        }
    } catch (error) {
        console.log('error al obtner sesión',e)
    }
}

export const resetPassword = (data) => async(dispatch) => {
    try {
        console.log('data a mandat',data)
    } catch (e) {
        console.log('error al resetear password')
    }
}

export const saveExpoToken = (data) => async(dispatch) => {
    try {
        let dataSend = {
            "userId": data.userId,
            "expoToken": data.expoToken
        }
        const response = await postSaveExpoToken(dataSend)
        console.log('responseExpoToken', response.data)
    } catch (e) {
        console.log('error save expoToken',e)
    }
}


export default authDuck;