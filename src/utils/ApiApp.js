import APIKit,{ baseURL } from "./axiosApi";
import moment from "moment";

import { axiosGet, axiosPost } from "./axiosApi";
import { axiosTypes } from "./axiosTypes";

//Login

export const postLogin = async(data) => await axiosPost(axiosTypes.LOGIN, data)
export const postRecoverPassword = async(data) => await axiosPost(axiosTypes.RECOVER_PASSWORD, data)

export const refreshToken = async(data) => await axiosPost(axiosTypes.REFRESH_TOKEN, data)

//Code
export const getDinamicCode = async(id) => await axiosGet(`${axiosTypes.GET_CODE}${id}`);
export const createAccessLocation = async(code) => await axiosPost(axiosTypes.CREATE_ACCESSLOCATION, code)
export const getAccesLocationActives = async() => await axiosGet(axiosTypes.GET_ACTIVES_ACCESSLOCATIONS)
export const validateQrCode = async(data) => await axiosPost(axiosTypes.VALIDATE_CODE,data);