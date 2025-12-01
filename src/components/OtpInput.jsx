import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 6, onOtpSubmit = () => {} }) => {
  const [otpValues, setOtpValues] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // console.log(inputRefs);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return; // Only allow numeric input

    const newOtpValues = [...otpValues];

    //allow only one character per input
    newOtpValues[index] = value.substring(value.length - 1);
    setOtpValues(newOtpValues);

    //submit Trigger
    const combibinedOtp = newOtpValues.join("");
    if (combibinedOtp.length === length) onOtpSubmit(combibinedOtp);

    //Move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    //optional
    if (index > 0 && !otpValues[index - 1]) {
      inputRefs.current[otpValues.indexOf(" ")].focus();
    }
  };

  //Move to previous input on backspace
  const handelKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  return (
    <div>
      {otpValues.map((value, index) => (
        <input
          key={index}
          type="text"
          ref={(input) => (inputRefs.current[index] = input)}
          value={value}
          onChange={(e) => {
            handleChange(e, index);
          }}
          onClick={() => {
            handleClick(index);
          }}
          onKeyDown={(e) => {
            handelKeyDown(e, index);
          }}
          className="otpInput"
        />
      ))}
    </div>
  );
};

export default OtpInput;
