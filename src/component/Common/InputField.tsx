import React, { useState, useEffect, forwardRef } from "react";

interface InputFieldProps {

    id: string;
    label: string;
    type?: string;
    readOnly?: boolean;
    value?: string;
    hasError?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    IsdValue?: string;
}

const InputField = forwardRef<HTMLInputElement,InputFieldProps>(
    (
        {
            id,
            label,
            type = "text",
            readOnly = false,
            value = "",
            hasError = false,
            onChange,
            onBlur,
            IsdValue = "+91",
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const [isFilled, setIsFilled] = useState(!!value);

        const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;

            // Allow only numbers in a telephone input
            if (type === "tel" && !/^\d*$/.test(inputValue)) {
                return;
            }

            // Allow only letters, spaces, hyphens, apostrophes, and dots in names
            if (
                (id === "firstName" || id === "lastName") &&
                !/^[a-zA-Z\s\-\'\.]*$/.test(inputValue)
            ) {
                return;
            }

            if (onChange) onChange(e);
            setIsFilled(inputValue !== "");
        };

        useEffect(() => {
            setIsFilled(value !== "");
        }, [value]);

        return (
            <div className="relative flex items-center w-full">
                <div
                    className={`relative flex items-center w-full border rounded transition-all duration-200 ${hasError
                        ? "border-red-500"
                        : isFocused && !readOnly
                            ? "border-blue-900"
                            : "border-gray-300"
                        }`}
                >
                    {type === "tel" && (
                        <span className="bg-white text-gray-700 text-sm px-4 border-r border-gray-300">
                            {IsdValue}
                        </span>
                    )}
                    <input
                        type={type}
                        id={id}
                        value={value}
                        readOnly={readOnly}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                            if (onBlur) onBlur(e);
                            setIsFocused(false);
                            setIsFilled(e.target.value !== "");
                        }}
                        className={`h-12 border-none outline-none transition-all duration-200 w-full text-sm tracking-wider rounded ${type === "tel" ? "px-4" : "px-5"
                            } ${readOnly ? "bg-gray-200 text-gray-500" : "text-gray-700"}`}
                        ref={ref}
                    />
                </div>
                <label
                    htmlFor={id}
                    className={`absolute left-4 px-1 bg-white text-sm tracking-wider transition-all duration-200 ${isFocused || isFilled
                        ? "-translate-y-6 text-xs rounded"
                        : "translate-y-0"
                        } ${hasError
                            ? "text-red-500"
                            : isFocused && !readOnly
                                ? "text-blue-900"
                                : "text-gray-500"
                        }`}
                >
                    {label}
                </label>
            </div>
        );
    }
);

export default InputField;
