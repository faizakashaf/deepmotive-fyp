//src/components/NotificationsModal.jsx

import React, { useState, useEffect } from "react";
import { X, Bell, CheckCircle, Info, AlertCircle, Flame } from "lucide-react";

const NotificationsModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);

  // Load notifications from localStorage on mount
  useEffect(() => {
    loadNotifications();
  }, []);

  // Load notifications when modal opens
  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  const loadNotifications = () => {
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      try {
        // Parse the saved notifications
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed);
      } catch (e) {
        console.error("Error parsing notifications:", e);
        initializeDefaultNotifications();
      }
    } else {
      initializeDefaultNotifications();
    }
  };

  const initializeDefaultNotifications = () => {
    const initialNotifications = [
      {
        id: 1,
        type: "success",
        title: "Habit Completed!",
        message: "You completed 'Morning Meditation' today. Keep it up!",
        time: "2 hours ago",
        color: "green",
        timestamp: Date.now() - 2 * 60 * 60 * 1000,
      },
      {
        id: 2,
        type: "streak",
        title: "7-Day Streak!",
        message: "You're on fire! 7 days streak for 'Daily Exercise'",
        time: "5 hours ago",
        color: "orange",
        timestamp: Date.now() - 5 * 60 * 60 * 1000,
      },
      {
        id: 3,
        type: "info",
        title: "New Feature Available",
        message: "Check out our new analytics dashboard!",
        time: "1 day ago",
        color: "blue",
        timestamp: Date.now() - 24 * 60 * 60 * 1000,
      },
      {
        id: 4,
        type: "reminder",
        title: "Don't Break Your Streak",
        message: "Complete 'Reading' today to maintain your 12-day streak",
        time: "2 days ago",
        color: "purple",
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
      },
    ];
    setNotifications(initialNotifications);
    localStorage.setItem("notifications", JSON.stringify(initialNotifications));
  };

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  const handleClearAll = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  const handleRemoveNotification = (id) => {
    const updatedNotifications = notifications.filter((n) => n.id !== id);
    setNotifications(updatedNotifications);
    if (updatedNotifications.length === 0) {
      localStorage.removeItem("notifications");
    }
  };

  // Function to get the appropriate icon based on notification type
  const getNotificationIcon = (type, color) => {
    const iconProps = {
      size: 20,
      className: `text-${color}-600 dark:text-${color}-400`,
    };

    switch (type) {
      case "success":
        return <CheckCircle {...iconProps} />;
      case "streak":
        return <Flame {...iconProps} />;
      case "info":
        return <Info {...iconProps} />;
      case "reminder":
        return <AlertCircle {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  if (!isOpen) return null;

  const getColorClasses = (color) => {
    const colors = {
      green: {
        bg: "bg-green-50 dark:bg-green-900/20",
        icon: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
        border: "border-green-200 dark:border-green-800",
        hover: "hover:bg-green-100 dark:hover:bg-green-900/30",
      },
      orange: {
        bg: "bg-orange-50 dark:bg-orange-900/20",
        icon: "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400",
        border: "border-orange-200 dark:border-orange-800",
        hover: "hover:bg-orange-100 dark:hover:bg-orange-900/30",
      },
      blue: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        icon: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
        hover: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        icon: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-800",
        hover: "hover:bg-purple-100 dark:hover:bg-purple-900/30",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in'>
      <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden'>
        {/* Header */}
        <div className='relative bg-gradient-to-r from-cyan-500 to-blue-600 p-6'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 p-2 rounded-lg hover:bg-white/20 transition-colors'
          >
            <X size={20} className='text-white' />
          </button>
          <h2 className='text-2xl font-bold text-white flex items-center'>
            <Bell className='mr-3' size={28} />
            Notifications
          </h2>
          <div className='flex items-center justify-between mt-1'>
            <p className='text-white/80 text-sm'>
              {notifications.length}{" "}
              {notifications.length === 1 ? "notification" : "notifications"}
            </p>
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className='text-sm text-white/80 hover:text-white underline transition-colors'
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className='overflow-y-auto max-h-[calc(90vh-140px)] p-6'>
          {notifications.length === 0 ? (
            <div className='text-center py-12'>
              <Bell size={48} className='mx-auto text-gray-400 mb-4' />
              <p className='text-gray-500 dark:text-gray-400'>
                No notifications yet
              </p>
              <p className='text-sm text-gray-400 dark:text-gray-500 mt-2'>
                Check back later for updates on your progress!
              </p>
            </div>
          ) : (
            <div className='space-y-3'>
              {notifications.map((notification) => {
                const colorClasses = getColorClasses(notification.color);
                return (
                  <div
                    key={notification.id}
                    className={`${colorClasses.bg} ${colorClasses.border} border p-4 rounded-xl hover:shadow-md transition-all group relative`}
                  >
                    {/* Close button for individual notification */}
                    <button
                      onClick={() => handleRemoveNotification(notification.id)}
                      className='absolute top-3 right-3 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all'
                      aria-label='Remove notification'
                    >
                      <X
                        size={14}
                        className='text-gray-500 dark:text-gray-400'
                      />
                    </button>

                    <div className='flex items-start space-x-4'>
                      <div
                        className={`${colorClasses.icon} p-3 rounded-xl flex-shrink-0`}
                      >
                        {getNotificationIcon(
                          notification.type,
                          notification.color,
                        )}
                      </div>
                      <div className='flex-1 min-w-0 pr-6'>
                        <h3 className='font-semibold text-gray-800 dark:text-white mb-1'>
                          {notification.title}
                        </h3>
                        <p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
                          {notification.message}
                        </p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Clear All Button (alternative at bottom) */}
          {notifications.length > 0 && (
            <div className='mt-6 text-center border-t border-gray-200 dark:border-gray-700 pt-4'>
              <button
                onClick={handleClearAll}
                className='px-6 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium'
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
