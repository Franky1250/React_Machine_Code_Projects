// src/components/OtpInput.jsx
import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 6, onOtpSubmit = () => {} }) => {
  const [otpValues, setOtpValues] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  // First input pe auto-focus
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // sirf number allow
    if (isNaN(value)) return;

    const newOtpValues = [...otpValues];

    // sirf last character rakho (agar user ne 12 type/paste kar diya ho)
    newOtpValues[index] = value.substring(value.length - 1);
    setOtpValues(newOtpValues);

    // agar saare boxes fill ho gaye to OTP submit
    const combinedOtp = newOtpValues.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    // next input pe focus
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleClick = (index) => {
    const input = inputRefs.current[index];
    if (input) {
      // cursor ko end pe rakhne ke liye
      input.setSelectionRange(1, 1);
    }
  };

  const handleKeyDown = (e, index) => {
    // backspace pe, agar current empty hai, previous pe jao
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      {otpValues.map((value, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(input) => (inputRefs.current[index] = input)}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="otpInput"
        />
      ))}
    </div>
  );
};

export default OtpInput;
