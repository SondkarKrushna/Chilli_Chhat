import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import background from "../../public/background.jpg";
import mobileBg from "../../public/mobileBg.jpg";

// RTK Query
import { useRegisterUserMutation } from "../store/api/registerApi";

const RegisterPage = () => {

  useEffect(() => {
    document.title = "Register Page | Restaurant Management System";
  }, []);

  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setError("Please select a role.");
      return;
    }

    if (!strongPassword.test(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number and symbol."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    setError("");

    const payload = {
      name: fullName,
      email,
      password,
      role,
    };

    try {
      await registerUser(payload).unwrap();
      navigate("/");
    } catch (err) {
      setError(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${isMobile ? mobileBg : background})`,
      }}
    >
      <div className="w-full max-w-xs sm:max-w-md p-4 sm:p-8 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
            <FaUserPlus size={26} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Register to get started
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="waiter">Waiter</option>
            <option value="chef">Chef</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <span
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
