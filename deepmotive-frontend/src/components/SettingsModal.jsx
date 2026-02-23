import React, { useState, useEffect } from "react";
import {
  X,
  Bell,
  Lock,
  Globe,
  Palette,
  Volume2,
  Shield,
  Moon,
  Sun,
} from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

const SettingsModal = ({ isOpen, onClose }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    autoSave: true,
    language: "en",
    privacyMode: false,
    soundEnabled: true,
    focusMode: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Load saved settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error("Error loading settings:", e);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
  }, [settings]);

  if (!isOpen) return null;

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelect = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    // Show success message
    setShowSuccess(true);

    // Apply settings to the app
    if (settings.language) {
      // You can implement language change logic here
      console.log("Language changed to:", settings.language);
    }

    // Close success message after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1500);
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
        checked ? "bg-cyan-500" : "bg-gray-300 dark:bg-gray-600"
      }`}
      role='switch'
      aria-checked={checked}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
      <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto transform transition-all'>
        {/* Success Toast */}
        {showSuccess && (
          <div className='absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slideDown z-10'>
            Settings saved successfully! ✨
          </div>
        )}

        {/* Modal Header */}
        <div className='sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center rounded-t-2xl'>
          <div>
            <h2 className='text-xl font-bold text-gray-800 dark:text-white'>
              Account Settings
            </h2>
            <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
              Customize your experience
            </p>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group'
            aria-label='Close settings'
          >
            <X
              size={20}
              className='text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
            />
          </button>
        </div>

        {/* Settings Content */}
        <div className='p-6 space-y-8'>
          {/* Appearance Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700 pb-2'>
              <div className='p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg'>
                <Palette
                  className='text-purple-600 dark:text-purple-400'
                  size={20}
                />
              </div>
              <h3 className='font-semibold text-gray-800 dark:text-white text-lg'>
                Appearance
              </h3>
            </div>

            <div className='space-y-4 pl-2'>
              {/* Dark Mode Toggle - Connected to global dark mode */}
              <div className='flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
                <div className='flex items-center space-x-3'>
                  <div className='p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg'>
                    {isDarkMode ? (
                      <Sun
                        size={18}
                        className='text-amber-600 dark:text-amber-400'
                      />
                    ) : (
                      <Moon
                        size={18}
                        className='text-blue-600 dark:text-blue-400'
                      />
                    )}
                  </div>
                  <div>
                    <span className='text-gray-700 dark:text-gray-300 font-medium'>
                      Dark Mode
                    </span>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      Switch between light and dark themes
                    </p>
                  </div>
                </div>
                <ToggleSwitch checked={isDarkMode} onChange={toggleDarkMode} />
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700 pb-2'>
              <div className='p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg'>
                <Bell className='text-blue-600 dark:text-blue-400' size={20} />
              </div>
              <h3 className='font-semibold text-gray-800 dark:text-white text-lg'>
                Notifications
              </h3>
            </div>

            <div className='space-y-4 pl-2'>
              <div className='flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl'>
                <div>
                  <span className='text-gray-700 dark:text-gray-300 font-medium'>
                    Push Notifications
                  </span>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    Get daily reminders for your habits
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings.notifications}
                  onChange={() => handleToggle("notifications")}
                />
              </div>

              <div className='flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl'>
                <div>
                  <span className='text-gray-700 dark:text-gray-300 font-medium'>
                    Email Notifications
                  </span>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    Receive weekly progress reports
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle("emailNotifications")}
                />
              </div>

              <div className='flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl'>
                <div className='flex items-center space-x-3'>
                  <Volume2
                    size={18}
                    className='text-green-600 dark:text-green-400'
                  />
                  <div>
                    <span className='text-gray-700 dark:text-gray-300 font-medium'>
                      Sound Effects
                    </span>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      Play sounds when completing habits
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={settings.soundEnabled}
                  onChange={() => handleToggle("soundEnabled")}
                />
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700 pb-2'>
              <div className='p-2 bg-red-100 dark:bg-red-900/30 rounded-lg'>
                <Shield className='text-red-600 dark:text-red-400' size={20} />
              </div>
              <h3 className='font-semibold text-gray-800 dark:text-white text-lg'>
                Privacy
              </h3>
            </div>

            <div className='space-y-4 pl-2'>
              <div className='flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl'>
                <div>
                  <span className='text-gray-700 dark:text-gray-300 font-medium'>
                    Private Mode
                  </span>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    Hide habit details from dashboard preview
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings.privacyMode}
                  onChange={() => handleToggle("privacyMode")}
                />
              </div>

              <div className='flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl'>
                <div>
                  <span className='text-gray-700 dark:text-gray-300 font-medium'>
                    Auto-save
                  </span>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    Automatically save your progress
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings.autoSave}
                  onChange={() => handleToggle("autoSave")}
                />
              </div>

              <div className='flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl'>
                <div className='flex items-center space-x-3'>
                  <Lock
                    size={18}
                    className='text-amber-600 dark:text-amber-400'
                  />
                  <div>
                    <span className='text-gray-700 dark:text-gray-300 font-medium'>
                      Focus Mode
                    </span>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      Minimize distractions while tracking
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={settings.focusMode}
                  onChange={() => handleToggle("focusMode")}
                />
              </div>
            </div>
          </div>

          {/* Language Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700 pb-2'>
              <div className='p-2 bg-green-100 dark:bg-green-900/30 rounded-lg'>
                <Globe
                  className='text-green-600 dark:text-green-400'
                  size={20}
                />
              </div>
              <h3 className='font-semibold text-gray-800 dark:text-white text-lg'>
                Language & Region
              </h3>
            </div>

            <div className='pl-2'>
              <select
                value={settings.language}
                onChange={(e) => handleSelect("language", e.target.value)}
                className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all'
              >
                <option value='en'>🇺🇸 English (US)</option>
                <option value='es'>🇪🇸 Español</option>
                <option value='fr'>🇫🇷 Français</option>
                <option value='de'>🇩🇪 Deutsch</option>
                <option value='ja'>🇯🇵 日本語</option>
                <option value='zh'>🇨🇳 中文</option>
              </select>
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>
                More languages coming soon!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex space-x-3 pt-4'>
            <button
              onClick={onClose}
              className='flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium'
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className='flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all hover:scale-[1.02] hover:shadow-lg'
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
