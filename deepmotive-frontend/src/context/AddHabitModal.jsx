//src/components/AddHabitModal.jsx

import React, { useState } from "react";
import { X, Target, Tag, Calendar, Info } from "lucide-react";
import api from "../api/axios";

const AddHabitModal = ({ isOpen, onClose, onHabitAdded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Wellness",
    goal: 30,
  });

  const categories = [
    "Wellness",
    "Fitness",
    "Learning",
    "Productivity",
    "Health",
    "Mindfulness",
    "Social",
    "Career",
    "Creativity",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/habits", {
        ...formData,
        completion: Array(7).fill(false),
        currentStreak: 0,
        longestStreak: 0,
      });

      console.log("✅ Habit created:", response.data);

      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "Wellness",
        goal: 30,
      });

      // Call parent callback to refresh habits
      if (onHabitAdded) {
        onHabitAdded();
      }

      // Close modal
      onClose();
    } catch (err) {
      console.error("❌ Error creating habit:", err);
      setError(err.response?.data?.message || "Failed to create habit");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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
            <Target className='mr-3' size={28} />
            Create New Habit
          </h2>
          <p className='text-white/80 text-sm mt-1'>
            Start building a better you, one habit at a time
          </p>
        </div>

        {/* Content */}
        <div className='overflow-y-auto max-h-[calc(90vh-120px)] p-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Error Message */}
            {error && (
              <div className='p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm'>
                {error}
              </div>
            )}

            {/* Habit Name */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                Habit Name *
              </label>
              <div className='relative'>
                <Target
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={20}
                />
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='e.g., Morning Meditation'
                  className='w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all'
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                Description
              </label>
              <div className='relative'>
                <Info
                  className='absolute left-3 top-3 text-gray-400'
                  size={20}
                />
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  placeholder='What does this habit involve?'
                  rows={3}
                  className='w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all resize-none'
                />
              </div>
            </div>

            {/* Category & Goal */}
            <div className='grid md:grid-cols-2 gap-4'>
              {/* Category */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                  Category *
                </label>
                <div className='relative'>
                  <Tag
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={20}
                  />
                  <select
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    className='w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all appearance-none cursor-pointer'
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                  Goal (days) *
                </label>
                <div className='relative'>
                  <Calendar
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={20}
                  />
                  <input
                    type='number'
                    name='goal'
                    value={formData.goal}
                    onChange={handleChange}
                    min='1'
                    max='365'
                    placeholder='30'
                    className='w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all'
                    required
                  />
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className='bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800'>
              <p className='text-sm text-cyan-800 dark:text-cyan-300 font-medium mb-2'>
                💡 Tips for Success:
              </p>
              <ul className='text-sm text-cyan-700 dark:text-cyan-400 space-y-1 ml-4 list-disc'>
                <li>Start small and be specific</li>
                <li>Choose a realistic goal</li>
                <li>Track daily for best results</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700'>
              <button
                type='button'
                onClick={onClose}
                disabled={loading}
                className='px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 font-medium'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={loading}
                className='px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl'
              >
                {loading ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Target size={20} />
                    <span>Create Habit</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHabitModal;
