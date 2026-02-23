// src/components/AddHabitModal.jsx
import React, { useState } from "react";
import { X, CheckCircle } from "lucide-react";

const AddHabitModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    frequency: "daily",
    goal: 7,
    category: "Wellness",
    color: "bg-blue-500",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    if (!formData.name.trim()) {
      setError("Habit name is required");
      setLoading(false);
      return;
    }

    try {
      await onAdd(formData);
      // Reset form
      setFormData({
        name: "",
        description: "",
        frequency: "daily",
        goal: 7,
        category: "Wellness",
        color: "bg-blue-500",
      });
      setError("");
    } catch (err) {
      setError("Failed to create habit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
    // Reset form when closing
    setFormData({
      name: "",
      description: "",
      frequency: "daily",
      goal: 7,
      category: "Wellness",
      color: "bg-blue-500",
    });
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6 sticky top-0 bg-white dark:bg-gray-800 z-10'>
          <h3 className='text-xl font-bold text-gray-800 dark:text-white'>
            Create New Habit
          </h3>
          <button
            onClick={handleClose}
            disabled={loading}
            className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
          >
            <X size={20} className='text-gray-500 dark:text-gray-400' />
          </button>
        </div>

        {error && (
          <div className='mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg flex items-center text-sm'>
            <span>{error}</span>
          </div>
        )}

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
              onClick={handleClose}
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
  );
};

export default AddHabitModal;
