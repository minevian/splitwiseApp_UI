export interface IRegisterUserResponse{
    success:boolean;
    message:string;
    data:
    |
    {
        name:string;
        email:string

    }
    | null
}

export interface IRegisterUserRequest{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    confirmPassword:string
}

export interface IRegisterUser{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    confirmPassword:string
}

export interface IGetOtp{
    email:string
}

export interface IGetOtpRespone{
    success:boolean;
    message:string;
    data:
    |
    {
        otp:string
    }
    | null
}

export interface IverifyOtp{
    email:string;
    otp:string
}

export interface IVerifyOtpResponse{
    success:boolean;
    message:string;
    data:
    |
    {
        email:string
    }
    | null
}