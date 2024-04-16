import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
    postLogin, postRecoverPassword, postValidateDataCollaborator, postChangeCollaboratorPassword,
    postSaveExpoToken,
    logoutUser,
    postChangeExpiredPassword,
    getRegexPassword,
    getPasswordConfiguration,
    getGeneralConfiguration
 } from "../../utils/ApiApp";
import { getValidators, saveTokens } from "../../utils/functions";
import moment from "moment";

const CHANGE_EMAIL = 'change_email';
const CHANGE_PASSWORD = 'change_password';
const CHANGE_CHECKBOX = 'change_checkbox';
const CHANGE_REPEAT_PASSWOTD = 'change_repeat_password';
const CLOSE_MODAL = 'close_modal'
const CHANGE_INPUT = 'change_input'

const LOADER = 'loader';
const LOGIN_SUCCESS = 'login_success';
const LOGIN_FAILED = 'login_failed';
const LOGOUT = 'logout';

const RECOVER_PASSWORD_SUCCESS = 'recover_password_success';
const RECOVER_PASSWORD_FAILED = 'recover_password_failed';
const NO_SIMILAR_PASSWORD = 'no_similar_password';
const PASSWORD_CHANGED_SUCESS = 'password_changed_sucess'
const PASSWORD_CHANGED_FAILED = 'password_changed_failed'
const CREATED_USER_SUCCESS = 'created_user';
const VALIDATE_COLABORATOR_NEW_USER = 'validate_colaborator_new_user';
const EXPIRED_PASSWORD = 'expired_password';
const CHANGE_EXPIRED_PASSWORD_SUCCES = 'change_expired_password_succes'
const CHANGE_EXPIRED_PASSWORD_FAILED = 'change_expired_password_failed'
const RESET_DATA_RECOVER = 'reset_data'

const SET_REGEX_PASSWORD = 'set_regex_password'
const VALIDATE_PASSWORD_SUCESS = 'validate_password'
const VALIDATE_PASSWORD_FAIL = 'validate_password_fail'

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
    userId:'',
    ingress:'',
    birthdayDate:'',
    isCreatedUser:false,
    isValidateToNewUser:false,
    isExpiredPassword:false,
    tokenProvitional:'',
    regexPassword:'',
    passwordConfig:null,
    rules:[],
    isValidatePassword:false
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
            return {...state, isValidCollaborator:true, loading: false, userId: action.payload, ingress:'', birthdayDate:'', email:''}
        case VALIDATE_COLABORATOR_NEW_USER:
            return{ ...state, isValidateToNewUser: true, loading: false, userId: action.payload }
        case RECOVER_PASSWORD_FAILED:
            return{ ...state, isValidCollaborator: false, message: action.message, modalRecover: true, loading: false, email:'', ingress:'', birthdayDate:''}
        case NO_SIMILAR_PASSWORD:
            return{ ...state, message: action.message, modalRecover: true, loading:false, repeatPassword:''}
        case PASSWORD_CHANGED_SUCESS:
            return{ ...state, isChangedPassword: true, password:'',isChecked:false, userId:'', loading:false, repeatPassword:'', birthdayDate:'', ingress:'', isValidatePassword:false}
        case CREATED_USER_SUCCESS:
            return{ ...state, isCreatedUser:true, password:'',isChecked:false, userId:'', loading:false, repeatPassword:'', isValidatePassword: false}
        case PASSWORD_CHANGED_FAILED:
            return{ ...state, isChangedPassword:false, modalRecover:true, message: action.message, loading:false, repeatPassword:'',password:'', isCreatedUser:false}
        case CHANGE_INPUT:
            return{ ...state, [action.payload.prop]:action.payload.value}
        case EXPIRED_PASSWORD:
            return{ ...state,  loading: false, message: action.message, isLogged: false,  password:'',isChecked:false, isExpiredPassword:true, tokenProvitional: action.payload }
        case CHANGE_EXPIRED_PASSWORD_SUCCES:
            return{ ...state, loading: false, isExpiredPassword:false, tokenProvitional:'', repeatPassword:'', password:'',isChangedPassword:true, isValidatePassword:false}
        case CHANGE_EXPIRED_PASSWORD_FAILED:
            return{ ...state, loading: false, modalRecover:true, message: action.payload, repeatPassword:'', password:''}
        case RESET_DATA_RECOVER:
            return{ ...state, isChangedPassword:false, isValidCollaborator: false}
        case SET_REGEX_PASSWORD:
            return{ ...state, regexPassword: action.payload, passwordConfig: action.config }
        case VALIDATE_PASSWORD_SUCESS:
            return{ ...state, isValidatePassword: true}
        case VALIDATE_PASSWORD_FAIL:
            return{ ...state, rules: action.payload, isValidatePassword: false}
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

export const changeInput = ({prop, value}) =>  {
    return{
        type: CHANGE_INPUT,
        payload: {prop, value}
    }
}

export const loginAction = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADER})
        const login = await postLogin(data)
        console.log('dataYSe',login?.data)
        if(login?.data?.user?.id && login?.data?.user?.userType === 3){
            await saveTokens(login?.data?.accessToken, login?.data?.user)
            dispatch({type: LOGIN_SUCCESS, payload: login.data.user})
        }else{
            dispatch({type: LOGIN_FAILED, message:'El ID del colaborador o la contraseña son incorrectos'})
        }

    } catch (e) {
        console.log('error',e)
        if(e?.response?.data?.code === 'RecoverPassword'){
            dispatch({
                type: EXPIRED_PASSWORD, 
                message:'La contraseña ha caducado, te dirigirá a restablecer',
                payload: e?.response?.data?.token})
        }else dispatch({type: LOGIN_FAILED, message:'Ha ocurrido un error, intenta otra vez'})

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
            "entryDate": data.ingress != "" ? moment(data.ingress,'YYYY-MM-DD').toISOString() : null,
            "birthDate": data.birthdayDate != "" ? moment(data.birthdayDate,'YYYY-MM-DD').toISOString() : null
        }
        const response = await postValidateDataCollaborator(dataSend)
        console.log('response',response?.data)
        if(response?.data?.id){
            setTimeout(() =>{
                if(data.isNewUser) dispatch({type: VALIDATE_COLABORATOR_NEW_USER, payload: response?.data?.id})
                else dispatch({type: RECOVER_PASSWORD_SUCCESS, payload: response?.data?.id})
            },500)
        }else{
            dispatch({type: RECOVER_PASSWORD_FAILED, message: 'Los datos ingresados no son válidos'})
        }
        console.log()
    } catch (error) {
        console.log('error validar colaboratot',error)
        dispatch({type: RECOVER_PASSWORD_FAILED, message: 'Algo salió mal. Inténtalo de nuevo'})

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
        if(data.isNewUser) dispatch({type: CREATED_USER_SUCCESS})
        else dispatch({type: PASSWORD_CHANGED_SUCESS})
    } catch (e) {
        dispatch({type: PASSWORD_CHANGED_FAILED, message:'Algo salio mal, intentalo de nuevo'})
        console.log('errorm',e)
    }
}

export const validatePassword = (data) => async(dispatch) =>{
    if (data.password.localeCompare(data.repeatPassword) === 0) {
        console.log('Las contraseñas son iguales',data);
        //mandar userId tambien
        if(data.isContainToken != '') dispatch(resetPassword(data))
        else dispatch(onChangeCollaboratorPassword(data))
      } else {
        console.log('Las contraseñas no iguales',data);

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
        dispatch({type:LOADER})
        let dataSend = {
            collaboratorId: data.id,
            token: data.isContainToken,
            newPassword: data.password
        }
        const response = await postChangeExpiredPassword(dataSend)
        if(response?.data?.succeeded) dispatch({type: CHANGE_EXPIRED_PASSWORD_SUCCES})
        console.log('data response',response.data)
    } catch (e) {
        console.log('error al cahmbiar password expirado',e)
        dispatch({type: CHANGE_EXPIRED_PASSWORD_FAILED, message:'Error al cambiar password, intentalo de nuevo'})
    }
}

export const saveExpoToken = (data) => async(dispatch) => {
    try {
        let dataSend = {
            "userId": data.userId,
            "expoToken": data.expoToken
        }
        console.log('dataSendExpoToken', dataSend)
        const response = await postSaveExpoToken(dataSend)
        console.log('responseExpoToken', response.data)
    } catch (e) {
        console.log('error save expoToken',e)
    }
}

export const onResetRecover = () => {
    return{
        type: RESET_DATA_RECOVER
    }
}

export const getRegexToPassword = () => async(dispatch) => {
    try {
        const response = await getRegexPassword()
        if(response?.data){
            const config = await getPasswordConfiguration();
            dispatch({
                type: SET_REGEX_PASSWORD, 
                payload: response?.data?.regex, 
                config: config?.data
            })
        }
    } catch (e) {
        console.log('error',e)
    }
}


export const onValidatePassword = (password, regex, requirements) => dispatch => {
    const missingParams = getValidators(password, regex, requirements);

    if(missingParams.length > 0){
        dispatch({type: VALIDATE_PASSWORD_FAIL, payload: missingParams})
    }else{
        dispatch({type: VALIDATE_PASSWORD_SUCESS})
    }
}

export const getGeneralConfigurationData = async() => {
    const response = await getGeneralConfiguration();
    console.log('response', response?.data)
    if(response?.data){
        return response.data;
    }
    return null;
}

export default authDuck;