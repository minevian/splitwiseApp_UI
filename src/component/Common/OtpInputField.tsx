import { useRef } from "react";

interface OtpInputProps {
    otp: string[];
    setOtp: (otp: string[]) => void;
}

const OtpInput = ({ otp, setOtp }: OtpInputProps) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take the last digit
        setOtp(newOtp);

        // Move focus to the next input
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedData = event.clipboardData.getData("text").trim();
        if (/^\d{4}$/.test(pastedData)) {
            setOtp(pastedData.split(""));
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex justify-center w-full gap-2 mt-4">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    maxLength={1}
                    className="w-12 h-12 border border-blue-800 rounded text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
            ))}
        </div>
    );
};

export default OtpInput;
