import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "./Common/InputField";
import { IGetOtp, IGetOtpRespone, IverifyOtp, IVerifyOtpResponse } from "../common/interface/api";
import { useMutation } from "@tanstack/react-query";
import { getGenerateOtp, verifyOtp } from "../service/apiRegistraion";
import { toast } from "react-toastify";
import OtpInput from "./Common/OtpInputField";
import RegistrationForm from "./RegistrationForm";

const OTPValidation = () => {

    const [isOtpRequested, setIsOtpRequested] = useState(false);
    const [otp, setOtp] = useState<any>(["", "", "", ""]);
    const [timer, setTimer] = useState<number>(60);
    const [isOtpValidation, setOtpValidation] = useState(false)
    const form = useForm<IGetOtp>({
        defaultValues: {
            email: "",
        },
    });     

    const { control,
        handleSubmit,
        formState: { errors } } = form;



    useEffect(() => {
        if (isOtpRequested && timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(countdown);
        }
    }, [isOtpRequested, timer]);

    const {mutate:requestToGetOtp} = useMutation({
        mutationFn:(data:IGetOtp) => getGenerateOtp(data),
        onSuccess:(res:IGetOtpRespone) => {
            if(res.success === true){
                setIsOtpRequested(true)
                setTimer(60);
                console.log(res);  
          
            }
            else{
                toast.error(res.message)
            }
        },
        onError: (error) => {
            toast.error('Unabe to get Otp')
            console.error('Unable to fetch Otp',error)
        }
    })

    const getOtp = (data:IGetOtp) => {
        const requestData:IGetOtp = {
            email: data.email
        }
        requestToGetOtp(requestData)
        console.log(requestData);
    };

    const {mutate:handleVerifyOtp} = useMutation({
        mutationFn:(data:IverifyOtp) => verifyOtp(data),
        onSuccess:(res:IVerifyOtpResponse) =>{
            if (res.success === true) {
                setOtpValidation(true);
                toast.success("Validate Successful!");
                localStorage.setItem("userDetails", JSON.stringify(res.data));
            } else {
                toast.error("Invalid OTP!");
            }  
        },
        onError: () => {
            toast.error("OTP verification failed!");
        },
    })

    const handleOtpSubmit = (data:IverifyOtp) => {
        console.log('button Cliecked');
        

        const otpValue = otp.join("");
        if (otpValue.length !== 4) {
            toast.error("Enter a valid 4-digit OTP!");
            return;
        }
        const requestData:IverifyOtp= {
            email:data.email,
            otp:otpValue

        }

        handleVerifyOtp(requestData)
        console.log('requestData',requestData);
        
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <>
            {
                isOtpValidation?(
                    <RegistrationForm />
                ):
                (
                    <div>
                    <form
                        onSubmit={handleSubmit(getOtp)}
                        className="bg-white p-6 rounded-lg shadow-md w-96"
                    >
                        <h2 className="text-xl font-bold mb-4 text-center">OTP Validation</h2>
        
                        <div className="mb-3">
                            <Controller
                                name="email"
                                control={control}
                               
                                rules={{
                                    required: "Email is required",
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
                        {!isOtpRequested ? (
                            <button
                                type="submit"
                                className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition cursor-pointer"
                            >
                                Get OTP
                            </button>
                        ) : (
                            <>
                            <div className="flex flex-row">
        
                                <OtpInput otp={otp} setOtp={setOtp} />
                                {timer > 0 ? (
                                    <p className="text-xs text-gray-500 mt-4">Resend OTP in {timer}s</p>
                                ) : (
                                    <button type="submit"  className="mt-4 w-full text-gray-500 text-xs  transition cursor-pointer">
                                        Resend OTP
                                    </button>
                                )}
                                
                            </div>
                                <button
                                    type="button"
                                    onClick={() => handleOtpSubmit({
                                        email: form.getValues("email"),
                                        otp: otp
                                    })}
                                    className="mt-4 w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                                >
                                    Verify OTP
                                </button>
                            </>
                        )}
                    </form>
                </div>

                )
            }
            
            </>
      

        </div>
    );
};

export default OTPValidation;
