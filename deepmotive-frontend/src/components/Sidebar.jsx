//src/components/Sidebar.jsx

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Calendar,
  BarChart3,
  BookOpen,
  Trophy,
  Bot,
  Ship,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/setup", icon: PlusCircle, label: "Habit Setup" },
    { path: "/streak", icon: Calendar, label: "Streak Tracker" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/journal", icon: BookOpen, label: "Reflection Journal" },
    { path: "/challenges", icon: Trophy, label: "Challenges" },
    { path: "/ai-coach", icon: Bot, label: "AI Coach" },
  ];

  return (
    <>
      {/* Overlay - only on mobile when sidebar is open */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white h-screen fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className='h-full overflow-y-auto p-6 flex flex-col'>
          {/* Close button - visible on all screens */}
          <button
            onClick={() => setIsOpen(false)}
            className='absolute top-4 right-4 p-2 hover:bg-blue-700 rounded-lg transition-colors'
            aria-label='Close sidebar'
          >
            <X size={20} />
          </button>

          {/* Submarine Header */}
          <div className='mb-8'>
            <div className='flex items-center justify-center mb-4'>
              <div className='w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-3'>
                <Ship size={24} className='text-white' />
              </div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
                DeepMotive
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className='space-y-1 flex-1'>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-600 shadow-lg"
                      : "text-blue-200 hover:bg-blue-700 hover:text-white"
                  }`}
                >
                  <Icon size={20} className={isActive ? "text-cyan-300" : ""} />
                  <span className={isActive ? "font-semibold" : ""}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Submarine Status Footer */}
          <div className='mt-auto pt-4'>
            <div className='bg-blue-700 rounded-lg p-3 border border-blue-600 text-center'>
              <div className='flex items-center justify-center'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2'></div>
                <span className='text-xs text-blue-300'>
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
