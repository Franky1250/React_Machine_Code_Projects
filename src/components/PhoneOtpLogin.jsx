import React, { useState } from "react";
import OtpInput from "./OtpInput";

function PhoneOtpLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value); // Update phone number state
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    // Logic to send OTP to the entered phone number
    const regex = /[^0-9]/g;
    if (phoneNumber.length !== 10 || regex.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    //Call API to send OTP
    //Show OTP input field on success response
    setOtp("true");
  };

  const onOtpSubmit = (otp) => {
    console.log("Login Sucessful", otp);
  };

  return (
    <div>
      {!otp ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          OTP sent to {phoneNumber}
          <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
}

export default PhoneOtpLogin;
