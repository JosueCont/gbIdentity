import { getDinamicCode, validateQrCode, createAccessLocation, getAccesLocationActives } from "../../utils/ApiApp";

const SET_CODE = 'set_code';
const SET_TIME = 'set_time';
const LOADING = 'loading';
const NEW_CODE = 'new_code'
const FAILED_CODE = 'failed_code'
const CANCEL_RUNNING = 'cancel_running'
const ACTIVATE_AUTO_RUNNING = 'activate_auto_running'
const OPEN_MODAL = 'open_modal'
const CLOSE_MODAL = 'close_modal'
const initialState = {
    code:'',
    minutes:0,
    seconds:0,
    loading: false,
    isRunning:false,
    modalConfirm:false,
    message:'',
    isCloseSession:false
}

const homeDuck = (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return{...state, loading:true}
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
        default:
            return state
    }
}


export const getCodeQR = ({isRunning, userId}) => async(dispatch) => {
    try {
        console.log('userId',userId)
        dispatch({type: LOADING})
        if(isRunning != true){
            //Aqui se cambiará por el endpoint debería traer el texto y el contador como response 
            /*const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let resultado = '';
            
            for (let i = 0; i < 8; i++) {
                const indice = Math.floor(Math.random() * caracteres.length);
                resultado += caracteres.charAt(indice);
            }
            dispatch({type: SET_CODE, payload: resultado})
            if(resultado != ''){
                dispatch(getCounter(counter))
            }*/
            //let counter = 40
            const code = await getDinamicCode(userId)
            if(code?.data?.code != ''){
                await createAccessLocation({name:code?.data?.code})
                const locationsActives = (await getAccesLocationActives())?.data || [];
                let accessLocation = locationsActives?.filter(item => item.name === code?.data?.code)
                let dataSend = {
                    code: code?.data?.code,
                    userId: userId,
                    accessLocationId: accessLocation[0]?.id
                }
                const isValidate = await validateQrCode(dataSend)
                if(isValidate.data){
                    dispatch({type: SET_CODE, payload: code?.code})
                    dispatch(getCounter(code?.data?.seconds))
                }
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

export default homeDuck;