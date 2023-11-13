import AsyncStorage from "@react-native-async-storage/async-storage";
import { postLogin, postRecoverPassword } from "../../utils/ApiApp";
import { saveTokens } from "../../utils/functions";

const CHANGE_EMAIL = 'change_email';
const CHANGE_PASSWORD = 'change_password';
const CHANGE_CHECKBOX = 'change_checkbox';
const CLOSE_MODAL = 'close_modal'

const LOADER = 'loader';
const LOGIN_SUCCESS = 'login_success';
const LOGIN_FAILED = 'login_failed';
const LOGOUT = 'logout';

const RECOVER_PASSWORD_SUCCESS = 'recover_password_success';
const RECOVER_PASSWORD_FAILED = 'recover_password_failed'
const initialState = {
    email:'',
    password:'',
    isChecked: false,
    loading: false,
    isLogged:false,
    message:'',
    dataUser:null,
    modalErrorLogin:false,
    isValidMail:false,
    modalRecover:false
}

const authDuck = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_EMAIL:
            return{ ...state, email: action.payload }
        case CHANGE_PASSWORD:
            return{ ...state, password: action.payload }
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
            return {...state, isValidMail:true, loading: false }
        case RECOVER_PASSWORD_FAILED:
            return{ ...state, isValidMail: false, message: action.message, modalRecover: true, loading: false, email:''}
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
        if(login?.data?.user?.id){
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


export default authDuck;