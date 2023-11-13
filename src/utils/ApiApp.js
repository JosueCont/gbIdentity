import APIKit,{ baseURL } from "./axiosApi";
import moment from "moment";

import { axiosGet, axiosPost } from "./axiosApi";
import { axiosTypes } from "./axiosTypes";

//Login

export const postLogin = async(data) => await axiosPost(axiosTypes.LOGIN, data)
export const postRecoverPassword = async(data) => await axiosPost(axiosTypes.RECOVER_PASSWORD, data)

export const refreshToken = async(data) => await axiosPost(axiosTypes.REFRESH_TOKEN, data)