import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const location = useLocation();

  // Use your zustand or other store logic for logging in
  const { login, isLoggingIn } = useAuthStore();

  // Handle success message from redirect (e.g., after registration)
  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccess(location.state.successMessage);
      window.history.replaceState({}, document.title); // remove state so it doesn't persist
    }
    setFormData({ email: '', password: '' });
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // You may need to modify this if your login returns errors via store
    try {
      await login(formData); // if login throws, will be caught below
    } catch (err) {
      setError(
        err?.message ||
        typeof err === "string"
          ? err
          : "An error occurred during login."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4 selection:bg-teal-500/20">
      <div className="w-full max-w-md bg-gray-800/20 backdrop-filter backdrop-blur-lg border border-teal-500/20 rounded-2xl p-8 shadow-2xl">

        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          {/* You can replace the SVG below if you wish */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h6l2-2h2l-2 2z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16H5a2 2 0 01-2-2V8a2 2 0 012-2h2v4l2 2-2 2v4z"></path>
          </svg>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Welcome Back!</h2>
          <p className="text-gray-400 mt-2">Sign in to continue</p>
        </div>

        {/* Success / Error Alerts */}
        {success && (
          <p className="mb-4 text-sm text-center text-green-400 bg-green-900/20 p-3 rounded-md">{success}</p>
        )}
        {error && (
          <p className="mb-4 text-sm text-center text-red-400">{error}</p>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {/* Mail Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              id="email-address"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Email address"
              className="block w-full rounded-md border-0 bg-white/5 py-3 pl-10 pr-3 text-white ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/*   Input */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {/* Lock SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              autoComplete="current-password"
              placeholder="Password"
              className="block w-full rounded-md border-0 bg-white/5 py-3 pl-10 pr-10 text-white ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
            {/* Show/hide password button */}
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              tabIndex={-1}
              onClick={() => setShowPassword(show => !show)}
            >
              {showPassword ? (
                // eye-off SVG
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.94 17.94A10.06 10.06 0 0112 20c-5 0-9.27-3.11-11-7.35C2.73 8.11 7 5 12 5a10.06 10.06 0 015.61 1.65" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M1 1l22 22" />
                </svg>
              ) : (
                // eye SVG
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="3" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.05 12a10 10 0 0119.9 0 10 10 0 01-19.9 0z" />
                </svg>
              )}
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isLoggingIn && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </span>
              {isLoggingIn ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200">
            Create An Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
