import { getDeleteProfile, getPreferences, postChangeCollaboratorPassword, putReceiveNotifications } from "../../utils/ApiApp"

const LOADING = 'loading_pref'
const USER_PREFERENCES = 'user_preferences'
const FAILED_PREFERENCES = 'failed_user_preferences'
const UPDATE_PREFERENCES = 'update_receive_notifications'
const CHANGE_MODAL = 'change_modal_pref'
const DELETE_PROFILE_SUCCESS = 'delete_profile_success'
const DELETE_PROFILE_FAILED = 'delete_profile_failed'
const CHANGE_PASSWORD_SUCCESS = 'change_password_success'
const CHANGE_PASSWORD_FAILED = 'change_password_failed'
const CHANGE_TEXT = 'change_text'

const initialState = {
    loading: false,
    preferences:null,
    receiveNotifications: false,
    modalDeleteProfile:false,
    modalSucess:false,
    modalFailed:false,
    message:'',
    password:'',
    repeatPassword:'',
    bcConfiguration:null
}

const preferencesDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{ ...state, loading: true}
        case USER_PREFERENCES:
            return{ ...state, preferences: action.payload, receiveNotifications: action.payload.receiveNotifications}
        case UPDATE_PREFERENCES:
            return{ ...state, loading: false, receiveNotifications: action.payload}
        case CHANGE_MODAL:
            return{ ...state, [action.payload.prop]: action.payload.value, message: action.payload.message}
        case DELETE_PROFILE_SUCCESS:
            return{ ...state, modalSucess: true, message: action.payload}
        case DELETE_PROFILE_FAILED:
            return{ ...state, modalFailed: true, message: action.payload}
        case CHANGE_PASSWORD_SUCCESS:
            return{ ...state, loading:false, modalSucess: true, message: action.payload, password:'', repeatPassword:''}
        case CHANGE_PASSWORD_FAILED:
            return{ ...state, loading: false, modalFailed:true, message: action.payload}
        case CHANGE_TEXT:
            return{ ...state, [action.payload.prop]:action.payload.value}
        default:
            return state;
    }
}

export const onChageModalPreferences = ({ prop, value, message='' }) => {
    return{
        type: CHANGE_MODAL,
        payload: {prop, value, message}
    }
}

export const onChangeText = ({ prop,value }) => {
    return{
        type: CHANGE_TEXT,
        payload: { prop, value }
    }
}

export const onDeleteProfile = (id) => async(dispatch) => {
    try {
        const response = await getDeleteProfile(id)
        console.log('response delete', response?.data)
        dispatch({
            type: DELETE_PROFILE_SUCCESS, 
            payload:'Se ha mandado la solicitud de eliminación'})
    } catch (e) {
        console.log('error deletepro', e)
        dispatch({ 
            type: DELETE_PROFILE_FAILED,
            payload: 'Ha ocurrido un problema al eliminar, intenta nuevamente'
        })
    }
}

export const userPreferences = (id) => async(dispatch) => {
    try {
        const response = await getPreferences(id)
        dispatch({type: USER_PREFERENCES, payload: response?.data})
    } catch (e) {
        console.log('error',e)
    }
}

export const updatePreferences = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        const response = await putReceiveNotifications(data)
        if(response?.data?.userId){
            dispatch({type: UPDATE_PREFERENCES, payload: response?.data?.receiveNotifications})

        }
    } catch (e) {
        console.log('error ',e)
    }
}

export const onChangePasswordLogged = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        let dataSend = {
            userId: data.userId,
            newPassword: data.password
        }
        const response = await postChangeCollaboratorPassword(dataSend)
        dispatch({type: CHANGE_PASSWORD_SUCCESS, payload:'La contraseña ha sido cambiada con éxito'})
        console.log('datSend', dataSend)
    } catch (e) {
        console.log('error changePass',e)
        dispatch({type: CHANGE_PASSWORD_FAILED, payload: 'Ha ocurrido un error, intentalo de nuevo'})
    }
}
export default preferencesDuck;