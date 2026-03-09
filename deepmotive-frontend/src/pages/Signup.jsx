//src/pages/Signup.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ship, Mail, Lock, User, UserPlus } from "lucide-react";
// import axios from "axios";
import api from "../axios";
import PageTransition from "../components/PageTransition";

const Signup = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/signup", {
  name: formData.name,
  email: formData.email,
  password: formData.password,
});

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Show transition animation
      setShowTransition(true);

      // Wait for animation, then navigate
      setTimeout(() => {
        setIsAuthenticated(true);
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create account. Please try again.",
      );
      setLoading(false);
    }
  };

  if (showTransition) {
    return <PageTransition message='Setting up your voyage, Captain!' />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6 transition-all duration-500'>
      <div className='max-w-md w-full animate-fade-in'>
        {/* Logo */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center mb-4'>
            <div className='relative group'>
              <div className='w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-xl'></div>
              <Ship
                size={40}
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'
              />
            </div>
          </div>
          <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400'>
            DeepMotive
          </h1>
        </div>

        {/* Signup Card */}
        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-cyan-500/20 hover:shadow-2xl transition-shadow duration-300'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'>
            <UserPlus className='mr-2 text-cyan-500' size={24} />
            Create Account
          </h2>

          {error && (
            <div className='mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm animate-shake'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Full Name
              </label>
              <div className='relative'>
                <User
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={18}
                />
                <input
                  type='text'
                  name='name'
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200'
                  placeholder='Captain Hook'
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Email Address
              </label>
              <div className='relative'>
                <Mail
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={18}
                />
                <input
                  type='email'
                  name='email'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200'
                  placeholder='captain@deepmotive.com'
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Password
              </label>
              <div className='relative'>
                <Lock
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={18}
                />
                <input
                  type='password'
                  name='password'
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200'
                  placeholder='••••••••'
                  disabled={loading}
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Confirm Password
              </label>
              <div className='relative'>
                <Lock
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={18}
                />
                <input
                  type='password'
                  name='confirmPassword'
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200'
                  placeholder='••••••••'
                  disabled={loading}
                  minLength={6}
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:scale-105 active:scale-95'
            >
              {loading ? (
                <>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <Ship size={18} className='mr-2' />
                  Sign Up
                </>
              )}
            </button>
          </form>

          <p className='mt-6 text-center text-gray-600 dark:text-gray-400'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='text-cyan-600 dark:text-cyan-400 font-medium hover:underline transition-colors'
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
