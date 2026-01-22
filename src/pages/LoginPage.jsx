import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginUserMutation } from "../store/api/loginApi";
import background from "../../public/background.jpg";
import mobileBg from "../../public/mobileBg.jpg";

const LoginPage = () => {
  const navigate = useNavigate();

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Form state
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  // RTK Query mutation
  const [loginUser, { isLoading, error, isSuccess }] =
    useLoginUserMutation();

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(formData).unwrap();

      // ✅ SINGLE SOURCE OF TRUTH
      const role = formData.role;

      localStorage.setItem("role", role);

      if (role === "waiter") {
        navigate("/waiter");
      } else if (role === "chef") {
        navigate("/chief");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${isMobile ? mobileBg : background})`,
      }}
    >
      <div className="w-full max-w-xs sm:max-w-md p-4 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
            <FaUserTie size={isMobile ? 20 : 28} />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-lg sm:text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-xs sm:text-sm text-center text-gray-500 mb-6">
          Please login to your account
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm text-center mb-3">
            {error?.data?.message || "Invalid credentials"}
          </p>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login As
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="waiter">Waiter</option>
              <option value="chef">Chef</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <span
              className="text-sm text-indigo-600 hover:underline cursor-pointer"
              onClick={() => navigate("/forgot-pass")}
            >
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-semibold transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <div className="text-center mt-6 text-sm text-gray-600">
          New user?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline font-semibold">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
