// src/components/HabitCard.jsx

import React, { useState } from "react";
import {
  CheckCircle,
  Circle,
  MoreVertical,
  Trash2,
  Edit,
  Waves,
  AlertTriangle,
  Flame,
  Calendar,
  Target,
  TrendingUp,
  Award,
  Sparkles,
} from "lucide-react";

const HabitCard = ({ habit, onToggle, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Safety check - if habit or habit.completion is undefined
  const completionRate = habit?.completion?.length
    ? (habit.completion.filter(Boolean).length / habit.completion.length) * 100
    : 0;

  const completedToday = habit?.completion?.[new Date().getDay()] || false;
  const completedCount = habit?.completion?.filter(Boolean).length || 0;
  const totalDays = habit?.completion?.length || 7;

  const getGradientColors = (rate) => {
    if (rate >= 80) return "from-emerald-400 to-teal-500";
    if (rate >= 50) return "from-cyan-400 to-blue-500";
    if (rate >= 25) return "from-amber-400 to-orange-500";
    return "from-rose-400 to-pink-500";
  };

  const getProgressColor = (rate) => {
    if (rate >= 80) return "text-emerald-400";
    if (rate >= 50) return "text-cyan-400";
    if (rate >= 25) return "text-amber-400";
    return "text-rose-400";
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "wellness":
        return <Waves size={14} />;
      case "fitness":
        return <Flame size={14} />;
      case "learning":
        return <Sparkles size={14} />;
      case "productivity":
        return <TrendingUp size={14} />;
      default:
        return <Target size={14} />;
    }
  };

  const handleDelete = () => {
    if (onDelete) onDelete(habit._id);
    setShowDeleteConfirm(false);
  };

  // If habit is undefined, don't render
  if (!habit) return null;

  return (
    <div
      className='group relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowDropdown(false);
      }}
    >
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className='absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20 animate-fadeIn'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-xl max-w-xs text-center transform scale-95 group-hover:scale-100 transition-all'>
            <div className='relative mb-4'>
              <div className='absolute inset-0 bg-red-500/20 rounded-full blur-xl'></div>
              <AlertTriangle
                className='text-red-500 mx-auto relative z-10'
                size={40}
              />
            </div>
            <h3 className='font-bold text-gray-800 dark:text-white mb-2'>
              Delete Habit?
            </h3>
            <p className='text-gray-600 dark:text-gray-400 text-sm mb-6'>
              Are you sure you want to delete "{habit.name || "this habit"}"?
              This action cannot be undone.
            </p>
            <div className='flex space-x-3'>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className='flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='flex-1 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div
        className={`relative bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-gray-700/50 overflow-hidden ${
          isHovered ? "scale-[1.02] -translate-y-1" : ""
        }`}
      >
        {/* Animated Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getGradientColors(
            completionRate,
          )} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}
        />

        {/* Top Accent Bar with Live Progress */}
        <div className='relative h-2 bg-gray-100 dark:bg-gray-700/50 overflow-hidden'>
          <div
            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getGradientColors(
              completionRate,
            )} transition-all duration-1000 ease-out`}
            style={{ width: `${completionRate}%` }}
          >
            <div className='absolute inset-0 bg-white/20 animate-pulse' />
          </div>
        </div>

        <div className='relative p-6'>
          {/* Header Section */}
          <div className='flex justify-between items-start mb-4'>
            <div className='flex-1'>
              <div className='flex items-center space-x-3 mb-2'>
                {/* Icon with animated background */}
                <div
                  className={`relative p-2.5 rounded-xl bg-gradient-to-br ${getGradientColors(
                    completionRate,
                  )} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className='absolute inset-0 bg-white/20 rounded-xl blur-sm group-hover:blur-md transition-all'></div>
                  <Target
                    className={`relative z-10 ${getProgressColor(
                      completionRate,
                    )}`}
                    size={20}
                  />
                </div>
                <div>
                  <h3 className='font-bold text-lg text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500 transition-all'>
                    {habit.name || "Unnamed Habit"}
                  </h3>
                  {habit.description && (
                    <p className='text-sm text-gray-500 dark:text-gray-400 line-clamp-1'>
                      {habit.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Category Tag */}
              <div className='flex items-center space-x-2'>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getGradientColors(
                    completionRate,
                  )} bg-opacity-10 text-gray-700 dark:text-gray-300 border border-current/20`}
                >
                  {getCategoryIcon(habit.category)}
                  <span className='ml-1'>{habit.category || "General"}</span>
                </span>
                {completedToday && (
                  <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'>
                    <CheckCircle size={12} className='mr-1' />
                    Done Today
                  </span>
                )}
              </div>
            </div>

            {/* Dropdown Menu */}
            <div className='relative'>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className='p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all'
              >
                <MoreVertical size={18} />
              </button>

              {/* Dropdown Panel */}
              {showDropdown && (
                <>
                  <div
                    className='fixed inset-0 z-30'
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-40 overflow-hidden animate-slideDown'>
                    <button
                      onClick={() => {
                        if (onEdit) onEdit(habit);
                        setShowDropdown(false);
                      }}
                      className='w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 flex items-center space-x-2 transition-all group'
                    >
                      <Edit size={16} className='text-cyan-500' />
                      <span>Edit Habit</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(true);
                        setShowDropdown(false);
                      }}
                      className='w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 dark:hover:from-red-900/20 dark:hover:to-rose-900/20 flex items-center space-x-2 transition-all group'
                    >
                      <Trash2 size={16} className='text-red-500' />
                      <span>Delete Habit</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-4 gap-2 mb-4'>
            <div className='text-center p-2 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg backdrop-blur-sm group-hover:bg-gray-50 dark:group-hover:bg-gray-700/50 transition-all'>
              <div className='flex items-center justify-center mb-1'>
                <Flame size={14} className='text-orange-500' />
              </div>
              <div className='text-sm font-bold text-gray-800 dark:text-white'>
                {habit.currentStreak || 0}
              </div>
              <div className='text-[10px] text-gray-500 dark:text-gray-400'>
                Current
              </div>
            </div>

            <div className='text-center p-2 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg backdrop-blur-sm group-hover:bg-gray-50 dark:group-hover:bg-gray-700/50 transition-all'>
              <div className='flex items-center justify-center mb-1'>
                <Award size={14} className='text-purple-500' />
              </div>
              <div className='text-sm font-bold text-gray-800 dark:text-white'>
                {habit.longestStreak || 0}
              </div>
              <div className='text-[10px] text-gray-500 dark:text-gray-400'>
                Best
              </div>
            </div>

            <div className='text-center p-2 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg backdrop-blur-sm group-hover:bg-gray-50 dark:group-hover:bg-gray-700/50 transition-all'>
              <div className='flex items-center justify-center mb-1'>
                <Target size={14} className='text-green-500' />
              </div>
              <div className='text-sm font-bold text-gray-800 dark:text-white'>
                {completedCount}/{totalDays}
              </div>
              <div className='text-[10px] text-gray-500 dark:text-gray-400'>
                This Week
              </div>
            </div>

            <div className='text-center p-2 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg backdrop-blur-sm group-hover:bg-gray-50 dark:group-hover:bg-gray-700/50 transition-all'>
              <div className='flex items-center justify-center mb-1'>
                <Calendar size={14} className='text-cyan-500' />
              </div>
              <div className='text-sm font-bold text-gray-800 dark:text-white capitalize'>
                {habit.frequency?.slice(0, 3) || "Daily"}
              </div>
              <div className='text-[10px] text-gray-500 dark:text-gray-400'>
                Frequency
              </div>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='text-xs font-medium text-gray-500 dark:text-gray-400'>
                Weekly Progress
              </span>
              <span
                className={`text-xs font-bold ${getProgressColor(completionRate)}`}
              >
                {Math.round(completionRate)}%
              </span>
            </div>
            <div className='flex space-x-1.5'>
              {(habit.completion || []).map((completed, index) => {
                const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
                return (
                  <button
                    key={`${habit._id}-day-${index}`}
                    onClick={() => onToggle(habit._id, index)}
                    className='group/day relative flex-1'
                  >
                    {/* Day Indicator */}
                    <div className='text-[8px] text-center text-gray-400 dark:text-gray-500 mb-1'>
                      {dayNames[index]}
                    </div>
                    {/* Progress Circle */}
                    <div
                      className={`relative aspect-square rounded-lg transition-all duration-300 transform group-hover/day:scale-110 group-hover/day:-translate-y-1 ${
                        completed
                          ? `bg-gradient-to-br ${getGradientColors(
                              completionRate,
                            )} shadow-lg`
                          : "bg-gray-200 dark:bg-gray-700 group-hover/day:bg-gray-300 dark:group-hover/day:bg-gray-600"
                      }`}
                    >
                      {completed && (
                        <>
                          <div className='absolute inset-0 bg-white/20 rounded-lg animate-pulse'></div>
                          <CheckCircle
                            size={12}
                            className='absolute inset-0 m-auto text-white'
                          />
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Motivational Message */}
          {completionRate >= 80 && (
            <div className='mt-4 pt-3 border-t border-gray-200 dark:border-gray-700'>
              <div className='flex items-center space-x-2 text-xs'>
                <Sparkles size={14} className='text-yellow-500 animate-pulse' />
                <span className='text-gray-600 dark:text-gray-400'>
                  {completionRate === 100
                    ? "Perfect week! You're on fire! 🔥"
                    : "Great progress! Keep it up! 💪"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
