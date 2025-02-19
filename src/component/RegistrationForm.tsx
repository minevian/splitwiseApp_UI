import { useForm, Controller } from "react-hook-form"
import InputField from "./Common/InputField";
import { IRegisterUser, IRegisterUserRequest, IRegisterUserResponse } from "../common/interface/api";
import { useMutation } from "@tanstack/react-query";
import { updateRegisterUsers } from "../service/apiRegistraion";
import { toast } from "react-toastify";
import { useState } from "react";
import OTPValidation from "./OTPValidation";


const RegistrationForm = () => {
    const form = useForm<IRegisterUser>();
    const [isOtpValidation, setOtpValidation] = useState(false)

    const { control,
        handleSubmit,
        watch,
        formState: { errors } } = form;
        
    const password = watch("password", "")

const {mutate:registerUserDetails} = useMutation({
    mutationFn: (data:IRegisterUserRequest) => updateRegisterUsers(data),
    onSuccess: (response:IRegisterUserResponse) => {
        console.log(response);
        if(response.success === true){
            toast.success(response.message)
            setOtpValidation(true);
            localStorage.setItem("userDetails", JSON.stringify(response.data));
            console.log('Register sucessfully',response);

            
        }else{
            toast.error(response.message)
            console.log('Register Unsucessful',response);
        }
    },
    onError: (error) => {
        toast.error('Unable to Register User')
        console.error('Unable to Register User',error)
        
    },
    
}

)

    const registerForm = (data:IRegisterUser) => {
        const registerForm:IRegisterUserRequest = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        }
        registerUserDetails(registerForm)
        console.log(registerForm);
    }
    return (


        <div className="flex items-center justify-center h-screen bg-gray-100">
            <>           
            {
                isOtpValidation ? 
                (
                    <OTPValidation/>
                )
                
                : (
                     <form
                    onSubmit={handleSubmit(registerForm)}
    
                    className="bg-white p-6 rounded-lg shadow-md w-96"
                >
                    <h2 className="text-xl font-bold mb-4 text-center">Registration Form</h2>
    
                    <div className="mb-3">
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "First Name is Requird"
                            }}
                            render={({ field }) => (
                                <>
                                    <InputField
                                        {...field}
                                        id="firstName"
                                        label="First Name"
                                        hasError={!!errors.firstName}
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-xs text-left w-fit">
                                             {String(errors.firstName.message)}</p>
                                    )}
                                </>
                            )}
                        />
                    </div>
    
                    <div className="mb-3">
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Last Name is Requird"
                            }}
                            render={({ field }) => (
                                <>
                                    <InputField
                                        {...field}
                                        id="lastName"
                                        label="Last Name"
                                        hasError={!!errors.lastName}
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-xs text-left w-fit">
                                           {String(errors.lastName.message)}</p>
                                    )}
                                </>
                            )}
                        />
                    </div>
    
                    <div className="mb-3">
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Email is Requird"
                            }}
                            render={({ field }) => (
                                <>
                                    <InputField
                                        {...field}
                                        id="email"
                                        label="Email Address"
                                        hasError={!!errors.email}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs text-left w-fit">
                                            {String(errors.email.message)}
                                            </p>
                                    )}
                                </>
                            )}
                        />
                    </div>
    
                    <div className="mb-3">
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "password is Requird"
                            }}
                            render={({ field }) => (
                                <>
                                    <InputField
                                        {...field}
                                        id="password" label="Password"
                                        type="password"
                                        hasError={!!errors.password} />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs text-left w-fit">
                                            {String(errors.password.message)}</p>
                                    )}
                                </>
                            )}
                        />
                    </div>
    
                    <div className="mb-3">
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Confirm Password is required",
                                validate: value => value === password || "Passwords do not match",
                            }}
                            render={({ field }) => (
                                <>
                                    <InputField
                                        {...field}
                                        id="confirmPassword" label="Confirm Password"
                                        type="password"
                                        hasError={!!errors.confirmPassword} />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs text-left w-fit">
                                            {String(errors.confirmPassword.message)}</p>
                                    )}
                                </>
                            )}
                        />
                    </div>
    
                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-2 rounded
                         hover:bg-blue-800 transition cursor-pointer"
                    >
                        Register
                    </button>
                </form>

                )
            }
            </>

           
        </div>

    )
}

export default RegistrationForm