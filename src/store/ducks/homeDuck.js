import { 
    getDinamicCode, validateQrCode, createAccessLocation, getAccesLocationActives, 
    getNotificationsCollaborator, getBadgetCollaborator, postReadNotifications, postAccessLogList, getColorDay, postCommunications 
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
const ACCESS_DATA_SUCCESS = 'access_data_success'
const SET_ROUTE = 'set_route'
const SET_COLOR_DAY = 'set_color_day'
const SET_COMMUNICATES = 'set_communicates'
const SET_REFRESH = 'refresh'
const ERROR_COMMUNICATES = 'error_communicates'


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
    accessList:[],
    pageNumber:1,
    pageSize:5,
    infoList: null,
    route:'initial',
    colorDay:'',
    communicates:[],
    refresh:false
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
            return{...state, isRunning:true}
        case ACTIVATE_AUTO_RUNNING:
            return{...state, isRunning: false}
        case OPEN_MODAL:
            return{...state, [action.payload.prop]:action.payload.value, message: action.payload.message, isCloseSession: action.payload.close}
        case CLOSE_MODAL:
            return{...state, [action.payload.prop]:action.payload.value, message:''}
        case ACCESS_DATA_SUCCESS:
            return{ ...state, accessList: action.payload.list, infoList: action.payload.info, pageSize: action.payload.pageSize, loading: false }
        case SET_ROUTE:
            return{ ...state, route: action.payload}
        case SET_COLOR_DAY:
            return{ ...state, colorDay: action.payload}
        case SET_COMMUNICATES:
            return{ ...state, communicates: action.payload, refresh: false }
        case SET_REFRESH:
            return{ ...state, refresh: true}
        case ERROR_COMMUNICATES:
            return{ ...state, refresh: false, }
        default:
            return state
    }
}


export const getCodeQR = ({isRunning, userId}) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        if(isRunning != true){
            const code = await getDinamicCode(userId)
            console.log('code',code?.data?.code)
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
                    dispatch({type: SET_CODE, payload: code?.data?.code})
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

export const getLogsUser = (data) => async(dispatch) => {
    try {
        dispatch({type: LOADING})
        let dataSend = {
            ...data,
            pageNumber: 1,
            "isFile": true
        }
        const response = await postAccessLogList(dataSend)
        if(response?.data?.items){
            dispatch({type: ACCESS_DATA_SUCCESS, payload:{list: response?.data?.items, info: response?.data, pageSize: response?.data?.items?.length}})
        }
    } catch (e) {
        console.log('error logs acces',e)
    }
}

export const onSetRoute = (route) => {
    return{
        type: SET_ROUTE,
        payload: route
    }
}

export const onGetColorDay = () => async(dispatch) => {
    try {
        const response = await getColorDay()
        console.log('response color', response?.data)
        dispatch({type: SET_COLOR_DAY, payload: response?.data?.color})
    } catch (e) {
        console.log('error color',e)
    }
}

export const getCommunicates = (data) => async(dispatch) => {
    try {
        //console.log('dataSend',data)
        const response = await postCommunications(data)
        //console.log('response comunications', response?.data)
        dispatch({type: SET_COMMUNICATES, payload: response?.data?.items})
    } catch (e) {
        dispatch({type: ERROR_COMMUNICATES})
        console.log('error',e)
    }
}

export const onRefreshAction = () => {
    return{
        type: SET_REFRESH
    }
}


export default homeDuck;