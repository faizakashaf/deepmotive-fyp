import React from "react";
import { useHabits } from "../hooks/useHabits";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Calendar, Target, BarChart3 } from "lucide-react";

const Analytics = () => {
  const { habits } = useHabits();

  // Check if habits is empty or undefined
  if (!habits || habits.length === 0) {
    return (
      <div className='p-6'>
        <p className='text-gray-600 dark:text-gray-400'>
          No habits data available yet.
        </p>
      </div>
    );
  }

  // Calculate completion rate data for bar chart
  const completionData = habits.map((habit) => ({
    id: habit._id || habit.id,
    name: habit.name,
    completion:
      (habit.completion.filter(Boolean).length / habit.completion.length) * 100,
    currentStreak: habit.currentStreak,
  }));

  // Calculate category distribution for pie chart
  const categoryData = habits.reduce((acc, habit) => {
    const existing = acc.find((item) => item.name === habit.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: habit.category, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#8B5CF6",
    "#EF4444",
    "#F59E0B",
    "#6366F1",
  ];

  // Calculate overall statistics
  const totalCompletion =
    (habits.reduce((total, habit) => {
      return (
        total +
        habit.completion.filter(Boolean).length / habit.completion.length
      );
    }, 0) /
      habits.length) *
      100 || 0;

  const averageStreak =
    habits.reduce((sum, habit) => sum + habit.currentStreak, 0) /
      habits.length || 0;
  const consistencyRate =
    (habits.filter((habit) => habit.currentStreak > 0).length / habits.length) *
      100 || 0;

  return (
    <div className='p-6 space-y-6'>
      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center'>
              <BarChart3
                className='text-blue-600 dark:text-blue-400'
                size={20}
              />
            </div>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
              Overall Completion
            </h3>
          </div>
          <p className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
            {Math.round(totalCompletion)}%
          </p>
        </div>

        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center'>
              <TrendingUp
                className='text-green-600 dark:text-green-400'
                size={20}
              />
            </div>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
              Avg. Streak
            </h3>
          </div>
          <p className='text-3xl font-bold text-green-600 dark:text-green-400'>
            {Math.round(averageStreak)} days
          </p>
        </div>

        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center'>
              <Target
                className='text-purple-600 dark:text-purple-400'
                size={20}
              />
            </div>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
              Consistency Rate
            </h3>
          </div>
          <p className='text-3xl font-bold text-purple-600 dark:text-purple-400'>
            {Math.round(consistencyRate)}%
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800 dark:text-white'>
            Habit Completion Rates
          </h3>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={completionData}>
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='#374151'
                opacity={0.5}
              />
              <XAxis
                dataKey='name'
                stroke='#6B7280'
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis
                stroke='#6B7280'
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F3F4F6",
                }}
                formatter={(value) => [`${Math.round(value)}%`, "Completion"]}
                labelStyle={{ color: "#F3F4F6" }}
              />
              <Bar dataKey='completion' fill='#3B82F6' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800 dark:text-white'>
            Habit Categories
          </h3>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx='50%'
                cy='50%'
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={{ stroke: "#6B7280", strokeWidth: 1 }}
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
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F3F4F6",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Insights */}
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700'>
        <h3 className='text-lg font-semibold mb-4 text-gray-800 dark:text-white'>
          Performance Insights
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {habits
            .sort((a, b) => {
              const aRate =
                a.completion.filter(Boolean).length / a.completion.length;
              const bRate =
                b.completion.filter(Boolean).length / b.completion.length;
              return aRate - bRate;
            })
            .slice(0, 3)
            .map((habit) => (
              <div
                key={habit._id || habit.id}
                className='p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow bg-gray-50 dark:bg-gray-700/30'
              >
                <h4 className='font-medium mb-2 text-gray-800 dark:text-white'>
                  {habit.name}
                </h4>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
                  Completion rate:{" "}
                  {Math.round(
                    (habit.completion.filter(Boolean).length /
                      habit.completion.length) *
                      100,
                  )}
                  %
                </p>
                <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5'>
                  <div
                    className='bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-500'
                    style={{
                      width: `${
                        (habit.completion.filter(Boolean).length /
                          habit.completion.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                {habit.currentStreak > 0 && (
                  <p className='text-xs text-orange-500 dark:text-orange-400 mt-2'>
                    🔥 {habit.currentStreak} day streak
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
