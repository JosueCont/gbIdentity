import APIKit,{ baseURL } from "./axiosApi";
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