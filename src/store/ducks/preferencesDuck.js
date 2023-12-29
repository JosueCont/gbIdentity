import { getPreferences, putReceiveNotifications } from "../../utils/ApiApp"

const LOADING = 'loading'
const USER_PREFERENCES = 'user_preferences'
const FAILED_PREFERENCES = 'failed_user_preferences'
const UPDATE_PREFERENCES = 'update_receive_notifications'

const initialState = {
    loading: false,
    preferences:null,
    receiveNotifications: false
}

const preferencesDuck = (state = initialState, action) => {
    switch(action.type){
        case USER_PREFERENCES:
            return{ ...state, preferences: action.payload, receiveNotifications: action.payload.receiveNotifications}
        case UPDATE_PREFERENCES:
            return{ ...state, loading: false, receiveNotifications: action.payload}
        default:
            return state;
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
export default preferencesDuck;