import APIKit,{ axiosPut, baseURL } from "./axiosApi";
import moment from "moment";

import { axiosGet, axiosPost } from "./axiosApi";
import { axiosTypes } from "./axiosTypes";

//Login

export const postLogin = async(data) => await axiosPost(axiosTypes.LOGIN, data)
export const postRecoverPassword = async(data) => await axiosPost(axiosTypes.RECOVER_PASSWORD, data)
export const postValidateDataCollaborator = async(data) => await axiosPost(axiosTypes.VALIDATE_COLLABORATOR, data)
export const postChangeCollaboratorPassword = async(data) => await axiosPost(axiosTypes.CHANGE_COLLABORATOR_PASSWORD, data)
export const postChangeExpiredPassword = async(data) => await axiosPost(axiosTypes.CHANGE_EXPIRED_PASSWORD,data)

export const refreshToken = async(data) => await axiosPost(axiosTypes.REFRESH_TOKEN, data)
export const logoutUser = async(data) => await axiosPost(axiosTypes.LOGOUT,data)

export const getRegexPassword = async() => await axiosGet(axiosTypes.GET_REGEX_PASSWORD)
export const getPasswordConfiguration = async() => await axiosGet(axiosTypes.GET_PASSWORD_CONFIG)
export const getGeneralConfiguration = async() => await axiosGet(axiosTypes.GET_GENERAL_CONFIG)

//AccessLog
export const postAccessLogList = async(data) => await axiosPost(axiosTypes.ACCESS_LOG_COLLABORATOR,data)
export const postCommunications = async(data) => await axiosPost(axiosTypes.GET_COMMUNICATIONS, data)

//Code
export const getDinamicCode = async(id) => await axiosGet(`${axiosTypes.GET_CODE}${id}`);
export const createAccessLocation = async(code) => await axiosPost(axiosTypes.CREATE_ACCESSLOCATION, code)
export const getAccesLocationActives = async() => await axiosGet(axiosTypes.GET_ACTIVES_ACCESSLOCATIONS)
export const validateQrCode = async(data) => await axiosPost(axiosTypes.VALIDATE_CODE,data);

//notifications
export const postSaveExpoToken = async(data) => await axiosPost(axiosTypes.SAVE_EXPO_TOKEN, data)
export const getNotificationsCollaborator = async(data) => await axiosPost(axiosTypes.GET_NOTIFICATIONS, data)
export const getBadgetCollaborator = async(data) => await axiosPost(axiosTypes.GET_BADGE_NOTIFY, data)
export const postReadNotifications = async(data) => await axiosPost(axiosTypes.READ_NOTIFICATIONS, data)
export const getPreferences = async(id) => await axiosGet(`${axiosTypes.USER_PREFERENCES}${id}`)
export const putReceiveNotifications = async(data) => await axiosPut(axiosTypes.UPDATE_USER_PREFERENCES, data)

//preferences
export const getDeleteProfile = async(id) => await axiosGet(`${axiosTypes.DELETE_PROFILE}${id}`) 
export const getColorDay = async() => await axiosGet(axiosTypes.GET_COLOR_DAY)