//src/components/HeaderTemp.jsx

import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  User,
  Moon,
  Sun,
  Waves,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import ProfileModal from "./ProfileModal";
import SettingsModal from "./SettingsModal";
import NotificationsModal from "./NotificationsModal";
import LogoutModal from "./LogoutModal";
import { useNavigate } from "react-router-dom";
import PageTransition from "./PageTransition";

const Header = ({ setIsAuthenticated, isSidebarOpen, setIsSidebarOpen }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userName, setUserName] = useState("Captain");
  const [userEmail, setUserEmail] = useState("captain@deepmotive.com");
  const [showLogoutTransition, setShowLogoutTransition] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Initial load of user data
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserName(parsedUser.name || parsedUser.email || "Captain");
        setUserEmail(parsedUser.email || "No email provided");
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    } else {
      setUserName("Captain");
      setUserEmail("captain@deepmotive.com");
    }
  }, []);

  // ✅ Listen for profile updates
  useEffect(() => {
    const handleProfileUpdate = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUserName(parsedUser.name || parsedUser.email || "Captain");
          setUserEmail(parsedUser.email || "No email provided");
          console.log("🔄 Header updated with new user data:", parsedUser);
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  // ✅ Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setShowLogoutTransition(true);

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (setIsAuthenticated) {
        setIsAuthenticated(false);
      }

      navigate("/login");
    }, 1500);
  };

  const notificationCount = 3;

  return (
    <>
      <header className='sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Left side */}
            <div className='flex items-center space-x-4'>
              {/* Menu button with animation */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className='group p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95'
                aria-label='Toggle menu'
              >
                <Menu
                  size={22}
                  className='text-gray-600 dark:text-gray-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors'
                />
              </button>

              {/* Logo & Title */}
              <div className='hidden sm:flex items-center space-x-3'>
                <div className='relative group'>
                  <div className='absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity'></div>
                  <div className='relative w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center'>
                    <Waves className='text-white' size={20} />
                  </div>
                </div>
                <div>
                  <h1 className='text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent'>
                    DeepMotive
                  </h1>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    Dive deeper every day
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className='flex items-center space-x-2'>
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className='group relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95'
                aria-label='Toggle dark mode'
              >
                <div className='relative'>
                  {isDarkMode ? (
                    <Sun
                      size={20}
                      className='text-amber-500 group-hover:rotate-45 transition-transform duration-300'
                    />
                  ) : (
                    <Moon
                      size={20}
                      className='text-gray-600 dark:text-gray-400 group-hover:-rotate-12 transition-transform duration-300'
                    />
                  )}
                </div>
              </button>

              {/* Notifications Button */}
              <button
                onClick={() => setShowNotificationsModal(true)}
                className='group relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95'
                aria-label='Notifications'
              >
                <Bell
                  size={20}
                  className='text-gray-600 dark:text-gray-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 group-hover:animate-wiggle transition-colors'
                />
                {notificationCount > 0 && (
                  <span className='absolute top-1 right-1 flex h-5 w-5'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75'></span>
                    <span className='relative inline-flex items-center justify-center h-5 w-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold'>
                      {notificationCount}
                    </span>
                  </span>
                )}
              </button>

              {/* Divider */}
              <div className='hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-700'></div>

              {/* User Profile Dropdown */}
              <div className='relative' ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className='flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95 group'
                >
                  <div className='relative'>
                    <div className='absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity'></div>
                    <div className='relative w-9 h-9 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-900'>
                      <User size={18} className='text-white' />
                    </div>
                  </div>
                  <div className='hidden sm:block text-left'>
                    <p className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
                      {userName}
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      Captain
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className='absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fade-in'>
                    {/* User Info Header */}
                    <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-700'>
                      <p className='text-sm font-semibold text-gray-900 dark:text-white'>
                        {userName}
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate'>
                        {userEmail}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className='py-2'>
                      <button
                        onClick={() => {
                          setShowProfileModal(true);
                          setIsDropdownOpen(false);
                        }}
                        className='w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center space-x-3 group'
                      >
                        <div className='p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/40 transition-colors'>
                          <User
                            size={16}
                            className='text-cyan-600 dark:text-cyan-400'
                          />
                        </div>
                        <div>
                          <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                            My Profile
                          </p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            View and edit profile
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setShowSettingsModal(true);
                          setIsDropdownOpen(false);
                        }}
                        className='w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center space-x-3 group'
                      >
                        <div className='p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors'>
                          <Settings
                            size={16}
                            className='text-blue-600 dark:text-blue-400'
                          />
                        </div>
                        <div>
                          <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                            Settings
                          </p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            Preferences & privacy
                          </p>
                        </div>
                      </button>

                      {/* Home button commented out as per your code */}
                    </div>

                    <div className='border-t border-gray-200 dark:border-gray-700 my-2'></div>

                    <button
                      onClick={() => {
                        setShowLogoutModal(true);
                        setIsDropdownOpen(false);
                      }}
                      className='w-full px-4 py-2.5 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-3 group'
                    >
                      <div className='p-2 rounded-lg bg-red-50 dark:bg-red-900/20 group-hover:bg-red-100 dark:group-hover:bg-red-900/40 transition-colors'>
                        <LogOut
                          size={16}
                          className='text-red-600 dark:text-red-400'
                        />
                      </div>
                      <div>
                        <p className='text-sm font-medium text-red-600 dark:text-red-400'>
                          Logout
                        </p>
                        <p className='text-xs text-red-500 dark:text-red-400/70'>
                          Sign out of account
                        </p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      <NotificationsModal
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
      />

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />

      {/* Logout Transition Animation */}
      {showLogoutTransition && (
        <PageTransition message='Logging out... Fair winds, Captain!' />
      )}
    </>
  );
};

export default Header;
