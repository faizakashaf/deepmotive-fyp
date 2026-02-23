// src/pages/HabitSetup.jsx
import React, { useState } from "react";
import { useHabits } from "../hooks/useHabits";
import HabitCard from "../components/HabitCard"; // Import the HabitCard component
import {
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  Target,
  Clock,
  TrendingUp,
  Flame,
  Award,
  Waves,
} from "lucide-react";

const HabitSetup = () => {
  const {
    habits,
    addHabit,
    deleteHabit,
    toggleHabitCompletion,
    loading,
    error: habitsError,
  } = useHabits();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    frequency: "daily",
    goal: 7,
    category: "Wellness",
    color: "bg-blue-500",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = [
    "Wellness",
    "Fitness",
    "Learning",
    "Productivity",
    "Social",
    "Other",
  ];

  const colors = [
    {
      name: "Blue",
      value: "bg-blue-500",
      border: "border-blue-500",
      text: "text-blue-500",
    },
    {
      name: "Green",
      value: "bg-green-500",
      border: "border-green-500",
      text: "text-green-500",
    },
    {
      name: "Purple",
      value: "bg-purple-500",
      border: "border-purple-500",
      text: "text-purple-500",
    },
    {
      name: "Red",
      value: "bg-red-500",
      border: "border-red-500",
      text: "text-red-500",
    },
    {
      name: "Yellow",
      value: "bg-yellow-500",
      border: "border-yellow-500",
      text: "text-yellow-500",
    },
    {
      name: "Indigo",
      value: "bg-indigo-500",
      border: "border-indigo-500",
      text: "text-indigo-500",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Habit name is required");
      return;
    }

    try {
      await addHabit(formData);
      setSuccess(`Habit "${formData.name}" created successfully!`);

      // Reset form
      setFormData({
        name: "",
        description: "",
        frequency: "daily",
        goal: 7,
        category: "Wellness",
        color: "bg-blue-500",
      });

      setIsModalOpen(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError("Failed to create habit. Please try again.");
      console.error("Error creating habit:", err);
    }
  };

  const handleDelete = async (habitId) => {
    try {
      await deleteHabit(habitId);
      setSuccess("Habit deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete habit. Please try again.");
    }
  };

  const handleEdit = (habit) => {
    // Implement edit functionality if needed
    console.log("Edit habit:", habit);
  };

  const handleToggle = async (habitId, dayIndex) => {
    if (!habitId) {
      console.error("Invalid habit ID:", habitId);
      return;
    }
    await toggleHabitCompletion(habitId, dayIndex);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Calculate completion stats
  const totalHabits = habits.length;
  const activeStreaks = habits.filter((h) => h.currentStreak > 0).length;
  const totalCompletionsThisWeek = habits.reduce((acc, habit) => {
    return acc + (habit.completion?.filter(Boolean).length || 0);
  }, 0);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8'>
      {/* Success/Error Messages */}
      {success && (
        <div className='mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 rounded-lg flex items-center shadow-lg animate-shake'>
          <CheckCircle className='mr-2 flex-shrink-0' size={20} />
          <span className='text-sm sm:text-base'>{success}</span>
        </div>
      )}

      {(error || habitsError) && (
        <div className='mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg flex items-center shadow-lg animate-shake'>
          <AlertCircle className='mr-2 flex-shrink-0' size={20} />
          <span className='text-sm sm:text-base'>{error || habitsError}</span>
        </div>
      )}

      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div>
            <h1 className='text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white flex items-center'>
              <Waves className='mr-3 text-cyan-500' size={32} />
              Habit Setup
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mt-2'>
              Create and manage your habits
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className='bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-cyan-500/50 flex items-center space-x-2 w-full sm:w-auto justify-center'
            disabled={loading}
          >
            <Plus size={20} />
            <span>Add New Habit</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6'>
          <div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md'>
            <div className='flex items-center justify-between mb-2'>
              <Target className='text-cyan-500' size={20} />
            </div>
            <p className='text-2xl font-bold text-gray-800 dark:text-white'>
              {totalHabits}
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Total Habits
            </p>
          </div>

          <div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md'>
            <div className='flex items-center justify-between mb-2'>
              <Flame className='text-orange-500' size={20} />
            </div>
            <p className='text-2xl font-bold text-gray-800 dark:text-white'>
              {activeStreaks}
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Active Streaks
            </p>
          </div>

          <div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md'>
            <div className='flex items-center justify-between mb-2'>
              <Award className='text-purple-500' size={20} />
            </div>
            <p className='text-2xl font-bold text-gray-800 dark:text-white'>
              {totalCompletionsThisWeek}
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Weekly Completions
            </p>
          </div>

          <div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md'>
            <div className='flex items-center justify-between mb-2'>
              <TrendingUp className='text-green-500' size={20} />
            </div>
            <p className='text-2xl font-bold text-gray-800 dark:text-white'>
              {habits.length > 0
                ? Math.round(
                    (totalCompletionsThisWeek / (habits.length * 7)) * 100,
                  )
                : 0}
              %
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Completion Rate
            </p>
          </div>
        </div>
      </div>

      {/* Habits Grid - Using HabitCard component */}
      {loading ? (
        <div className='flex items-center justify-center min-h-[400px]'>
          <div className='relative w-20 h-20'>
            <div className='absolute inset-0 border-4 border-cyan-200 dark:border-cyan-900 rounded-full'></div>
            <div className='absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin'></div>
          </div>
        </div>
      ) : habits.length === 0 ? (
        <div className='text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-dashed border-gray-300 dark:border-gray-700'>
          <div className='relative w-24 h-24 mx-auto mb-6'>
            <div className='absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-10'></div>
            <Target
              className='absolute inset-0 m-auto text-cyan-500'
              size={48}
            />
          </div>
          <h3 className='text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3'>
            No habits yet
          </h3>
          <p className='text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto'>
            Start your journey by creating your first habit
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className='bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all shadow-lg inline-flex items-center space-x-2'
          >
            <Plus size={20} />
            <span>Create Your First Habit</span>
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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

      {/* Create Habit Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-6 sticky top-0 bg-white dark:bg-gray-800 z-10'>
              <h3 className='text-xl font-bold text-gray-800 dark:text-white'>
                Create New Habit
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setError("");
                }}
                disabled={loading}
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
              >
                <X size={20} className='text-gray-500 dark:text-gray-400' />
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Habit Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                  required
                  disabled={loading}
                  placeholder='e.g., Morning Meditation'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Description
                </label>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                  rows={3}
                  disabled={loading}
                  placeholder='Describe your habit (optional)'
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                    Frequency
                  </label>
                  <select
                    name='frequency'
                    value={formData.frequency}
                    onChange={handleChange}
                    className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                    disabled={loading}
                  >
                    <option value='daily'>Daily</option>
                    <option value='weekly'>Weekly</option>
                    <option value='monthly'>Monthly</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                    Goal (per week)
                  </label>
                  <input
                    type='number'
                    name='goal'
                    value={formData.goal}
                    onChange={handleChange}
                    min='1'
                    max='7'
                    className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Category
                </label>
                <select
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                  disabled={loading}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
                  Color Theme
                </label>
                <div className='flex flex-wrap gap-3'>
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      type='button'
                      onClick={() =>
                        setFormData({ ...formData, color: color.value })
                      }
                      className={`w-10 h-10 rounded-xl ${color.value} flex items-center justify-center transition-all hover:scale-110 ${
                        formData.color === color.value
                          ? "ring-2 ring-offset-2 ring-cyan-500 dark:ring-offset-gray-800 scale-110"
                          : ""
                      }`}
                      disabled={loading}
                      title={color.name}
                    >
                      {formData.color === color.value && (
                        <CheckCircle size={18} className='text-white' />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className='flex justify-end space-x-3 pt-6 sticky bottom-0 bg-white dark:bg-gray-800'>
                <button
                  type='button'
                  onClick={() => {
                    setIsModalOpen(false);
                    setError("");
                  }}
                  className='px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium'
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:scale-105 transition-all shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={loading}
                >
                  {loading ? (
                    <span className='flex items-center'>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                      Creating...
                    </span>
                  ) : (
                    "Create Habit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitSetup;
