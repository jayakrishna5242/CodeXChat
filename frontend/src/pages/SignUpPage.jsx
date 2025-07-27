import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern"; // If you want right-side image
// import toast from "react-hot-toast"; // NOT used, errors shown in-form

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signup, isSigningUp } = useAuthStore();

  // Form validation without toast, show error below form
  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email format.";
    if (!formData.password) return "Password is required.";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = validateForm();
    if (errMsg) {
      setError(errMsg);
      return;
    }
    setError("");
    try {
      await signup(formData); // If signup throws, error will be caught
      // Optionally, redirect or show a success here
    } catch (err) {
      setError(
        err?.message ||
          typeof err === "string"
            ? err
            : "An error occurred during registration."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4 selection:bg-teal-500/20">
      <div className="w-full max-w-md bg-gray-800/20 backdrop-filter backdrop-blur-lg border border-teal-500/20 rounded-2xl p-8 shadow-2xl">

        {/* SVG Avatar */}
        <div className="flex justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h6l2-2h2l-2 2z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16H5a2 2 0 01-2-2V8a2 2 0 012-2h2v4l2 2-2 2v4z"></path>
          </svg>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Create an Account</h2>
          <p className="text-gray-400 mt-2">Join our CodeXChat today!</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {/* User SVG */}
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-3 pl-10 pr-3 text-white ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm"
              placeholder="Full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {/* Mail icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-3 pl-10 pr-3 text-white ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {/* Lock SVG */}
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-3 pl-10 pr-10 text-white ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {error && <p className="text-sm text-center text-red-400">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isSigningUp}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isSigningUp && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </span>
              {isSigningUp ? "Creating account..." : "Create Account"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUpPage;
