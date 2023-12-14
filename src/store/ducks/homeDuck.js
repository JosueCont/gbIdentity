import { 
    getDinamicCode, validateQrCode, createAccessLocation, getAccesLocationActives, 
    getNotificationsCollaborator, getBadgetCollaborator, postReadNotifications 
} from "../../utils/ApiApp";
import moment from "moment";

const SET_CODE = 'set_code';
const SET_TIME = 'set_time';
const LOADING = 'loading';
const CANCEL_LOADING = 'cancel_loading'
const NEW_CODE = 'new_code'
const FAILED_CODE = 'failed_code'
const CANCEL_RUNNING = 'cancel_running'
const ACTIVATE_AUTO_RUNNING = 'activate_auto_running'
const OPEN_MODAL = 'open_modal'
const CLOSE_MODAL = 'close_modal'
/*const SUCCESS_BADGE = 'success_badge';
const SET_NOTIFICATIONS = 'set_notifications';
const FAILED_NOTIFICATIONS = 'failed_notifications'
const READ_NOTIFICATIONS = 'read_notifications'
const CANCEL_READ_NOTIFICATIONS = 'cancel_read_notifications'*/

const initialState = {
    code:'',
    minutes:0,
    seconds:0,
    loading: false,
    isRunning:false,
    modalConfirm:false,
    message:'',
    isCloseSession:false,
    /*notifications:[],
    badgeNotification:0,
    totalNotifications:0,
    isReadNotify:false*/
}

const homeDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{...state, loading:true}
        case CANCEL_LOADING:
            return{ ...state, loading:false}
        case SET_CODE:
            return{...state, code: action.payload, loading: false, isRunning: true}
        case FAILED_CODE:
            return{...state, loading:false}
        case SET_TIME:
            return{...state, minutes: action.minutes, seconds: action.seconds}
        case NEW_CODE:
            return{...state, isRunning:false}
        case CANCEL_RUNNING:
            return{...state, isRunning:false}
        case ACTIVATE_AUTO_RUNNING:
            return{...state, isRunning: false}
        case OPEN_MODAL:
            return{...state, [action.payload.prop]:action.payload.value, message: action.payload.message, isCloseSession: action.payload.close}
        case CLOSE_MODAL:
            return{...state, [action.payload.prop]:action.payload.value, message:''}
        /*case SUCCESS_BADGE:
            return{ ...state, badgeNotification: action.payload}
        case SET_NOTIFICATIONS:
            return{ ...state, notifications: action.notifications, totalNotifications: action.total}
        case READ_NOTIFICATIONS:
            return{ ...state, isReadNotify: true}
        case CANCEL_READ_NOTIFICATIONS:
            return{ ...state, isReadNotify:false}*/
        default:
            return state
    }
}


export const getCodeQR = ({isRunning, userId}) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        if(isRunning != true){
            const code = await getDinamicCode(userId)
            if(code?.data?.code != ''){
                //await createAccessLocation({name:code?.data?.code})
                //const locationsActives = (await getAccesLocationActives())?.data || [];
                //let accessLocation = locationsActives?.filter(item => item.name === code?.data?.code)
                //let dataSend = {
                //    code: code?.data?.code,
                //    userId: userId,
                //    accessLocationId: accessLocation[0]?.id
                //}
                //const isValidate = await validateQrCode(dataSend)
                //if(isValidate.data){
                    dispatch({type: SET_CODE, payload: code?.code})
                    dispatch(getCounter(code?.data?.seconds))
                //}
            }

        }else console.log('no es necesario hacer uno nuevo')
    } catch (e) {
        dispatch({type: FAILED_CODE})
        console.log('failed code', e)
    }
}

const getCounter = (counter) => dispatch => {
    const countdownInterval = setInterval(() => {
        if (counter >= 0) {
          const minutes = Math.floor(counter / 60); // Obtener minutos
          const seconds = counter % 60; // Obtener segundos
          dispatch({type: SET_TIME, minutes:  minutes, seconds: seconds})
          //console.log(`${minutes} minutos ${seconds} segundos`); // Mostrar tiempo
      
          counter--; // Decrementar el contador en segundos
        } else {
          clearInterval(countdownInterval); // Detener el contador cuando llegue a cero
          console.log('Tiempo terminado');
          setTimeout(() => {
              dispatch({type: NEW_CODE })
          },500)
        }
    }, 1000);
}

export const cancelAutoGenerateCode = () => {
    return{
        type: CANCEL_RUNNING
    }
}

export const activateAutoGenerate = () => {
    return{
        type: ACTIVATE_AUTO_RUNNING
    }
}

export const openModalHome = ({prop, value, message='',close=false}) => {
    console.log('props',prop, value, message)
    return{
        type: OPEN_MODAL,
        payload: {prop, value,message, close}
    }
}

export const closeModalHome = ({prop, value, message=''}) => {
    return{
        type: CLOSE_MODAL,
        payload: {prop, value, message }
    }
}

/*export const getInitialData = (data) => async(dispatch) => {
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
        if(response?.data?.badgeNumber) dispatch({type: SUCCESS_BADGE, payload: response?.data?.badgeNumber })
        console.log('badge',response?.data)
    } catch (e) {
        console.log('error al obtener badge',e)
    }
}

const getNotifications = (userId) => async(dispatch) => {
    try {
        let dataSend = {
            "userId": userId,
            "pageNumber": 1,
            "pageSize": 10
        }
        const response = await getNotificationsCollaborator(dataSend)
        dispatch({type: SET_NOTIFICATIONS, notifications: response?.data?.items, total: response?.data?.totalItems })
        console.log('response notifications',response?.data)
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
        console.log('response read', dataSend)
    } catch (e) {
        console.log('error read notify',e)
    }
}

export const cancelReadNotify = () => {
    return{
        type: CANCEL_READ_NOTIFICATIONS
    }
}*/

export default homeDuck;