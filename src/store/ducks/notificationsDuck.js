import { getNotificationsCollaborator,getBadgetCollaborator, postReadNotifications, putReceiveNotifications  } from "../../utils/ApiApp";

const LOADING = 'loading';
const CANCEL_LOADING = 'cancel_loading'
const SUCCESS_BADGE = 'success_badge';
const SET_NOTIFICATIONS = 'set_notifications';
const FAILED_NOTIFICATIONS = 'failed_notifications'
const READ_NOTIFICATIONS = 'read_notifications'
const CANCEL_READ_NOTIFICATIONS = 'cancel_read_notifications'

const initialState = {
    loading: false,
    notifications:[],
    badgeNotification:0,
    totalNotifications:0,
    isReadNotify:false,
    totalPages:0,
    current:0,
}

const notificationDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{...state, loading:true}
        case CANCEL_LOADING:
            return{ ...state, loading:false}
        case SUCCESS_BADGE:
            return{ ...state, badgeNotification: action.payload}
        case SET_NOTIFICATIONS:
            return{ ...state, notifications: action.notifications, totalNotifications: action.total, totalPages: action.pages, current: action.current}
        case READ_NOTIFICATIONS:
            return{ ...state, isReadNotify: true}
        case CANCEL_READ_NOTIFICATIONS:
            return{ ...state, isReadNotify:false}
        default:
            return state
    }
}

export const getInitialData = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        await Promise.all([
            dispatch(getNotifications(data?.userId)),
            dispatch(getBadge(data?.userId))
        ])

        setTimeout(() => {
            dispatch({type: CANCEL_LOADING})
        },200)
    } catch (e) {
        console.log('error en data',e)
        dispatch({type: CANCEL_LOADING})
    }
}

const getBadge = (userId) => async(dispatch) => {
    try {
        const response = await getBadgetCollaborator({userId})
        dispatch({type: SUCCESS_BADGE, payload: response?.data?.badgeNumber })
        console.log('badge response',response?.data)
    } catch (e) {
        console.log('error al obtener badge',e)
    }
}

export const getNotifications = (userId, page =1, size=10,) => async(dispatch) => {
    try {
        let dataSend = {
            "userId": userId,
            "pageNumber": page,
            "pageSize": size
        }
        //console.log('dataSend notifications',dataSend)
        const response = await getNotificationsCollaborator(dataSend)
        dispatch({
            type: SET_NOTIFICATIONS, 
            notifications: response?.data?.items, 
            total: response?.data?.totalItems,
            pages: response?.data?.totalPages,
            current: response?.data?.current 
        })
    } catch (e) {
        console.log('error notificaciones',e)
    }
}

export const getReadNotification = (data) => async(dispatch) => {
    try {
        let dataSend = {
            "userId": data.userId,
            "lastRead": data.date
        }
        const response = await postReadNotifications(dataSend)
        dispatch({type: READ_NOTIFICATIONS})
        console.log('response read', dataSend, response?.data)
    } catch (e) {
        console.log('error read notify',e)
    }
}

export const cancelReadNotify = () => {
    return{
        type: CANCEL_READ_NOTIFICATIONS
    }
}

export default notificationDuck;