

import {
    IGetOtp,
    IGetOtpRespone,
    IRegisterUserRequest,
    IRegisterUserResponse,
    IverifyOtp,
    IVerifyOtpResponse
} from "../common/interface/api";
import apiClient from "./apiClient";

export const updateRegisterUsers = async (
    data: IRegisterUserRequest
) => {
    const response = await apiClient.post<IRegisterUserResponse>(
        "/register",
        data
    );
    return response.data
}

export const getGenerateOtp = async(
    data:IGetOtp
) => {
    const response = await apiClient.post<IGetOtpRespone>(
        "/getOtp",data
    );
    return response.data
}

export const verifyOtp = async(data:IverifyOtp)=>{
    const respone = await  apiClient.post<IVerifyOtpResponse>(
        "/verifyOtp",data
    );
    return respone.data
}