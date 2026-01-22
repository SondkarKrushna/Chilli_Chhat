import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";
import background from "../../public/background.jpg";
import mobileBg from "../../public/mobileBg.jpg";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSendOtp = (e) => {
        e.preventDefault();
        // 🔐 API call for sending OTP will come here
        setOtpSent(true);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        // 🔐 API call for OTP verification will come here
        navigate("/reset-password"); // or login page
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4
                 bg-no-repeat bg-center bg-cover"
            style={{
                backgroundImage: `url(${isMobile ? mobileBg : background})`,
            }}
        >
            <div
                className="
          w-full max-w-xs sm:max-w-md
          p-4 sm:p-8
          bg-white
          rounded-xl sm:rounded-2xl
          shadow-md sm:shadow-lg
        "
            >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                        <FaKey size={isMobile ? 20 : 28} />
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-lg sm:text-2xl font-bold text-center text-gray-800">
                    Reset Password
                </h2>
                <p className="text-xs sm:text-sm text-center text-gray-500 mb-5 sm:mb-6">
                    Enter your registered email to receive OTP
                </p>

                {/* Form */}
                <form className="space-y-4 sm:space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5
                           border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-indigo-500
                           text-sm"
                            />
                            <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Send OTP */}
                    {!otpSent && (
                        <button
                            onClick={handleSendOtp}
                            className="w-full bg-indigo-600 hover:bg-indigo-700
                         text-white py-2 sm:py-2.5
                         rounded-lg font-semibold
                         transition duration-200
                         text-sm"
                        >
                            Send OTP
                        </button>
                    )}

                    {/* OTP Section */}
                    {otpSent && (
                        <>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter 6-digit OTP"
                                    maxLength={6}
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5
                             border border-gray-300 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-indigo-500
                             text-sm tracking-widest text-center"
                                />
                            </div>

                            <button
                                onClick={handleVerifyOtp}
                                className="w-full bg-green-600 hover:bg-green-700
                           text-white py-2 sm:py-2.5
                           rounded-lg font-semibold
                           transition duration-200
                           text-sm"
                            >
                                Verify OTP
                            </button>
                        </>
                    )}
                </form>

                {/* Back to Login */}
                <div className="text-center mt-5 sm:mt-6 text-xs sm:text-sm text-gray-600">
                    Remembered password?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-indigo-600 hover:underline font-semibold cursor-pointer"
                    >
                        Back to Login
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
