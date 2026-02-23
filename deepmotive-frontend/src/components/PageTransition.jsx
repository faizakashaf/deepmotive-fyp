//src/components/PageTransition.jsx

import React from "react";
import { Ship, Waves } from "lucide-react";

const PageTransition = ({ message = "Loading..." }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800'>
      <div className='text-center'>
        {/* Animated Ship */}
        <div className='relative mb-8'>
          {/* Water Waves */}
          <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
            <Waves
              className='text-cyan-400 animate-bounce'
              size={24}
              style={{ animationDelay: "0ms" }}
            />
            <Waves
              className='text-cyan-500 animate-bounce'
              size={24}
              style={{ animationDelay: "150ms" }}
            />
            <Waves
              className='text-cyan-600 animate-bounce'
              size={24}
              style={{ animationDelay: "300ms" }}
            />
          </div>

          {/* Rotating Ship Container */}
          <div className='relative'>
            {/* Glow Effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-50 animate-pulse'></div>

            {/* Ship */}
            <div className='relative w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center animate-float shadow-2xl'>
              <Ship size={48} className='text-white animate-wiggle' />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4 animate-pulse'>
          {message}
        </h2>

        {/* Progress Dots */}
        <div className='flex justify-center space-x-2 mb-8'>
          <div
            className='w-3 h-3 bg-cyan-500 rounded-full animate-bounce'
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className='w-3 h-3 bg-cyan-500 rounded-full animate-bounce'
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className='w-3 h-3 bg-cyan-500 rounded-full animate-bounce'
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>

        {/* Loading Bar */}
        <div className='w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
          <div className='h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-loading-bar'></div>
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
