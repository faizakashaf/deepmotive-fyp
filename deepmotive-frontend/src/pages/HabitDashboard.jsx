// src/pages/HabitDashboard.jsx
import React, { useState, useEffect } from "react";
import HabitCard from "../components/HabitCard";
import { useHabits } from "../hooks/useHabits";
import {
  Waves,
  Plus,
  TrendingUp,
  Target,
  Flame,
  Award,
  Calendar,
  Activity,
  Zap,
  Clock,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import AddHabitModal from "../components/AddHabitModal";

const HabitDashboard = () => {
  const [selectedView, setSelectedView] = useState("overview");
  const [userName, setUserName] = useState("Captain");
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);

  // Use the custom hook
  const {
    habits,
    loading,
    error,
    addHabit,
    deleteHabit,
    toggleHabitCompletion,
    refreshHabits,
  } = useHabits();

  // Get user name from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserName(parsedUser.name || "Captain");
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  const handleHabitAdded = async (habitData) => {
    try {
      await addHabit(habitData);
      setShowAddHabitModal(false);
    } catch (err) {
      console.error("Failed to add habit:", err);
      // Re-throw the error so the modal can handle it
      throw err;
    }
  };

  const handleToggle = async (habitId, dayIndex) => {
    if (!habitId) {
      console.error("Invalid habit ID:", habitId);
      return;
    }
    await toggleHabitCompletion(habitId, dayIndex);
  };

  const handleEdit = (habit) => {
    console.log("Edit habit:", habit);
    // Implement edit functionality if needed
  };

  const handleDelete = async (habitId) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      await deleteHabit(habitId);
    }
  };

  // Calculate statistics from habits
  const totalHabits = habits.length;
  const todayCompleted = habits.filter(
    (h) => h.completion?.[new Date().getDay()] || false,
  ).length;
  const longestStreak = Math.max(...habits.map((h) => h.currentStreak || 0), 0);
  const avgCompletion = Math.round(
    habits.reduce((acc, h) => {
      const rate = h.completion?.length
        ? (h.completion.filter(Boolean).length / h.completion.length) * 100
        : 0;
      return acc + rate;
    }, 0) / (habits.length || 1),
  );

  const completionPercentage =
    totalHabits > 0 ? Math.round((todayCompleted / totalHabits) * 100) : 0;

  // Weekly progress data for line chart
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyData = weekDays.map((day, index) => ({
    day,
    completed: habits.filter((h) => h.completion?.[index] || false).length,
    total: habits.length,
    percentage:
      habits.length > 0
        ? Math.round(
            (habits.filter((h) => h.completion?.[index] || false).length /
              habits.length) *
              100,
          )
        : 0,
  }));

  // Category distribution for pie chart
  const categoryData = habits.reduce((acc, habit) => {
    const category = habit.category || "Other";
    const existing = acc.find((item) => item.name === category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = [
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
  ];

  // Radial chart data for completion
  const radialData = [
    {
      name: "Completion",
      value: completionPercentage,
      fill: "#06b6d4",
    },
  ];

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='relative w-24 h-24 mx-auto mb-6'>
            <div className='absolute inset-0 border-4 border-cyan-200 dark:border-cyan-900 rounded-full'></div>
            <div className='absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin'></div>
            <Waves
              className='absolute inset-0 m-auto text-cyan-500'
              size={32}
            />
          </div>
          <p className='text-lg font-medium text-gray-600 dark:text-gray-400'>
            Loading your habit fleet...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-8 pb-8'>
      {/* Hero Header */}
      <div className='relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl'>
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32'></div>
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-48 -mb-48'></div>

        <div className='relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6'>
          <div>
            <div className='flex items-center mb-3'>
              <div className='p-3 bg-white/20 backdrop-blur-sm rounded-2xl mr-4'>
                <Waves className='text-white' size={32} />
              </div>
              <div>
                <h1 className='text-4xl font-bold text-white'>
                  Welcome Back, {userName}
                </h1>
                <p className='text-white/80 mt-1 text-lg'>
                  Ready to make today count?
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className='flex flex-wrap gap-4 mt-6'>
              <div className='flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl'>
                <Target className='text-white' size={18} />
                <span className='text-white font-semibold'>
                  {totalHabits} Habits
                </span>
              </div>
              <div className='flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl'>
                <Flame className='text-white' size={18} />
                <span className='text-white font-semibold'>
                  {longestStreak} Day Streak
                </span>
              </div>
              <div className='flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl'>
                <TrendingUp className='text-white' size={18} />
                <span className='text-white font-semibold'>
                  {avgCompletion}% Average
                </span>
              </div>
            </div>
          </div>

          {/* Add Habit Button */}
          <button
            onClick={() => setShowAddHabitModal(true)}
            className='group relative bg-white hover:bg-gray-50 text-cyan-600 px-6 py-3 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center space-x-2'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity'></div>
            <Plus size={22} />
            <span>Add Habit</span>
          </button>
        </div>
      </div>

      {/* Today's Progress Card */}
      <div className='bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700'>
        <div className='flex flex-col lg:flex-row items-center gap-8'>
          {/* Radial Progress */}
          <div
            className='relative flex-shrink-0'
            style={{ width: 200, height: 200 }}
          >
            <RadialBarChart
              width={200}
              height={200}
              cx={100}
              cy={100}
              innerRadius={60}
              outerRadius={90}
              data={radialData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar dataKey='value' cornerRadius={10} fill='#06b6d4' />
            </RadialBarChart>
            <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
              <p className='text-4xl font-bold text-gray-800 dark:text-white'>
                {completionPercentage}%
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>Today</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className='flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full'>
            <div className='bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1'>
              <div className='flex items-center justify-between mb-2'>
                <Calendar className='text-cyan-500' size={20} />
              </div>
              <p className='text-2xl font-bold text-gray-800 dark:text-white'>
                {todayCompleted}/{totalHabits}
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Completed Today
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1'>
              <div className='flex items-center justify-between mb-2'>
                <Flame className='text-orange-500' size={20} />
              </div>
              <p className='text-2xl font-bold text-gray-800 dark:text-white'>
                {longestStreak}
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Longest Streak
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1'>
              <div className='flex items-center justify-between mb-2'>
                <Award className='text-purple-500' size={20} />
              </div>
              <p className='text-2xl font-bold text-gray-800 dark:text-white'>
                {avgCompletion}%
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Avg Completion
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1'>
              <div className='flex items-center justify-between mb-2'>
                <Activity className='text-green-500' size={20} />
              </div>
              <p className='text-2xl font-bold text-gray-800 dark:text-white'>
                {habits.filter((h) => h.currentStreak > 0).length}
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Active Streaks
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1'>
              <div className='flex items-center justify-between mb-2'>
                <Clock className='text-blue-500' size={20} />
              </div>
              <p className='text-2xl font-bold text-gray-800 dark:text-white'>
                {weeklyData.reduce((acc, day) => acc + day.completed, 0)}
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                This Week
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1'>
              <div className='flex items-center justify-between mb-2'>
                <Zap className='text-yellow-500' size={20} />
              </div>
              <p className='text-2xl font-bold text-gray-800 dark:text-white'>
                {habits.filter((h) => h.currentStreak >= 7).length}
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                7+ Day Streaks
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid lg:grid-cols-2 gap-6'>
        {/* Weekly Progress Chart */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center space-x-3'>
              <div className='p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl'>
                <TrendingUp className='text-white' size={20} />
              </div>
              <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
                Weekly Progress
              </h3>
            </div>
            <div className='px-3 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 rounded-full text-sm font-medium'>
              Last 7 Days
            </div>
          </div>
          <ResponsiveContainer width='100%' height={280}>
            <LineChart data={weeklyData}>
              <defs>
                <linearGradient id='colorCompleted' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#06b6d4' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='#06b6d4' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='#e5e7eb'
                opacity={0.5}
              />
              <XAxis
                dataKey='day'
                stroke='#6b7280'
                style={{ fontSize: "12px", fontWeight: "500" }}
              />
              <YAxis
                stroke='#6b7280'
                style={{ fontSize: "12px", fontWeight: "500" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                }}
              />
              <Line
                type='monotone'
                dataKey='completed'
                stroke='#06b6d4'
                strokeWidth={3}
                dot={{ fill: "#06b6d4", r: 5, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7 }}
                fill='url(#colorCompleted)'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className='bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center space-x-3'>
              <div className='p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl'>
                <BarChart3 className='text-white' size={20} />
              </div>
              <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
                Categories
              </h3>
            </div>
            <div className='px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium'>
              {categoryData.length} Types
            </div>
          </div>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width='100%' height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill='#8884d8'
                  dataKey='value'
                  stroke='none'
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className='h-64 flex flex-col items-center justify-center text-gray-400'>
              <BarChart3 size={48} className='mb-3 opacity-50' />
              <p>No categories yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Daily Completion Bar Chart */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center space-x-3'>
            <div className='p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl'>
              <Activity className='text-white' size={20} />
            </div>
            <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
              Daily Completion Rate
            </h3>
          </div>
        </div>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#e5e7eb'
              opacity={0.5}
            />
            <XAxis
              dataKey='day'
              stroke='#6b7280'
              style={{ fontSize: "12px", fontWeight: "500" }}
            />
            <YAxis
              stroke='#6b7280'
              style={{ fontSize: "12px", fontWeight: "500" }}
              label={{
                value: "Percentage %",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#6b7280", fontSize: "12px" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              }}
            />
            <Bar
              dataKey='percentage'
              fill='#06b6d4'
              radius={[12, 12, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Error Message */}
      {error && (
        <div className='p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-xl text-red-600 dark:text-red-400 flex items-center space-x-3 animate-shake'>
          <div className='p-2 bg-red-100 dark:bg-red-900/40 rounded-full'>
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <span className='font-medium'>{error}</span>
        </div>
      )}

      {/* Habits Grid */}
      <div>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white flex items-center'>
            <Target className='mr-3 text-cyan-500' size={28} />
            Your Habits
          </h2>
          {habits.length > 0 && (
            <span className='px-4 py-2 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 rounded-full text-sm font-semibold'>
              {habits.length} Active
            </span>
          )}
        </div>

        {habits.length === 0 ? (
          <div className='text-center py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700'>
            <div className='relative w-24 h-24 mx-auto mb-6'>
              <div className='absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-10'></div>
              <Waves
                size={48}
                className='absolute inset-0 m-auto text-cyan-500'
              />
            </div>
            <h3 className='text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3'>
              No habits yet
            </h3>
            <p className='text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto'>
              Start your journey to better habits. Create your first habit and
              watch your progress grow!
            </p>
            <button
              onClick={() => setShowAddHabitModal(true)}
              className='bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all shadow-lg hover:shadow-xl inline-flex items-center space-x-2'
            >
              <Plus size={22} />
              <span>Add Your First Habit</span>
            </button>
          </div>
        ) : (
          <div className='grid lg:grid-cols-2 gap-6'>
            {habits.map((habit) => (
              <HabitCard
                key={habit._id}
                habit={habit}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Habit Modal */}
      <AddHabitModal
        isOpen={showAddHabitModal}
        onClose={() => setShowAddHabitModal(false)}
        onAdd={handleHabitAdded}
      />
    </div>
  );
};

export default HabitDashboard;
