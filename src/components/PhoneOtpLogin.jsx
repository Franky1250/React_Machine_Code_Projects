// src/components/PhoneOtpLogin.jsx
import React, { useState } from "react";
import OtpInput from "./OtpInput";

function PhoneOtpLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    const regex = /[^0-9]/g;

    // 10 digit hona chahiye & sirf numbers
    if (phoneNumber.length !== 10 || regex.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // yaha normally API call karoge OTP send karne ke liye
    // demo ke liye sirf UI change kar rahe
    setShowOtpInput(true);
  };

  const handleOtpSubmit = (otp) => {
    console.log("Login Successful with OTP:", otp);
    alert("Login Successful ✅");
    // yaha aage ka login logic (API call, token save, etc.)
  };

  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
          />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <div>
          <p>
            OTP sent to <b>{phoneNumber}</b>
          </p>
          <OtpInput length={6} onOtpSubmit={handleOtpSubmit} />
        </div>
      )}
    </div>
  );
}

export default PhoneOtpLogin;
