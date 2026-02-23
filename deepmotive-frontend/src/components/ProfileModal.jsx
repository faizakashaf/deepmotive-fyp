//src/components/ProfileModal.jsx

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Calendar,
  Save,
  Camera,
  MapPin,
  Phone,
  Briefcase,
} from "lucide-react";
import api from "../api/axios";

const ProfileModal = ({ isOpen, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    occupation: "",
    joinedDate: "",
  });

  useEffect(() => {
    if (isOpen) {
      loadUserProfile();
    }
  }, [isOpen]);

  const loadUserProfile = () => {
    try {
      const userData = localStorage.getItem("user");
      console.log("📂 Loading user data:", userData);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setProfileData({
          name: parsedUser.name || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
          location: parsedUser.location || "",
          bio: parsedUser.bio || "",
          occupation: parsedUser.occupation || "",
          joinedDate: parsedUser.createdAt || new Date().toISOString(),
        });
        setImagePreview(parsedUser.profileImage || null);
      }
    } catch (err) {
      console.error("❌ Error loading profile:", err);
      setError("Failed to load profile data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`✏️ Changing ${name}:`, value);
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    console.log("🚀 Submitting profile data:", profileData);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please login again.");
        setLoading(false);
        return;
      }

      console.log("🔑 Token:", token.substring(0, 20) + "...");

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("phone", profileData.phone || "");
      formData.append("location", profileData.location || "");
      formData.append("bio", profileData.bio || "");
      formData.append("occupation", profileData.occupation || "");

      if (profileImage) {
        formData.append("profileImage", profileImage);
        console.log("📸 Image attached:", profileImage.name);
      }

      console.log("📤 Sending request to /auth/profile...");

      const response = await api.put("/auth/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Response received:", response.data);

      // ✅ Update localStorage and state
      if (response.data.success && response.data.user) {
        const updatedUser = response.data.user;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        console.log("💾 Updated localStorage:", updatedUser);

        // ✅ Update state immediately to show new data
        setProfileData({
          name: updatedUser.name || "",
          email: updatedUser.email || "",
          phone: updatedUser.phone || "",
          location: updatedUser.location || "",
          bio: updatedUser.bio || "",
          occupation: updatedUser.occupation || "",
          joinedDate: updatedUser.createdAt || new Date().toISOString(),
        });

        if (updatedUser.profileImage) {
          setImagePreview(updatedUser.profileImage);
        }

        setSuccess("Profile updated successfully!");
        setIsEditing(false);
        setProfileImage(null);

        // ✅ Dispatch event to update header
        window.dispatchEvent(new Event("profileUpdated"));

        // ✅ Optional: Close modal after 2 seconds
        setTimeout(() => {
          setSuccess("");
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      console.error("❌ Error response:", err.response?.data);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    loadUserProfile();
    setIsEditing(false);
    setError("");
    setSuccess("");
    setProfileImage(null);
  };

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in'>
      <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden'>
        {/* Header */}
        <div className='relative bg-gradient-to-r from-cyan-500 to-blue-600 p-6'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 p-2 rounded-lg hover:bg-white/20 transition-colors'
          >
            <X size={20} className='text-white' />
          </button>
          <h2 className='text-2xl font-bold text-white'>My Profile</h2>
          <p className='text-white/80 text-sm mt-1'>
            Manage your personal information
          </p>
        </div>

        {/* Content */}
        <div className='overflow-y-auto max-h-[calc(90vh-120px)] p-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Profile Image */}
            <div className='flex flex-col items-center'>
              <div className='relative group'>
                <div className='w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-1'>
                  <div className='w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden'>
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt='Profile'
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <User size={48} className='text-gray-400' />
                    )}
                  </div>
                </div>
                {isEditing && (
                  <label className='absolute bottom-0 right-0 p-2 bg-cyan-500 rounded-full cursor-pointer hover:bg-cyan-600 transition-colors shadow-lg'>
                    <Camera size={18} className='text-white' />
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                      className='hidden'
                    />
                  </label>
                )}
              </div>
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>
                {isEditing ? "Click camera to change photo" : ""}
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className='p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm animate-shake'>
                {error}
              </div>
            )}
            {success && (
              <div className='p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400 text-sm'>
                {success}
              </div>
            )}

            {/* Form Fields */}
            <div className='grid md:grid-cols-2 gap-4'>
              {/* Name */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Full Name
                </label>
                <div className='relative'>
                  <User
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={18}
                  />
                  <input
                    type='text'
                    name='name'
                    value={profileData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all'
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Email Address
                </label>
                <div className='relative'>
                  <Mail
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={18}
                  />
                  <input
                    type='email'
                    name='email'
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all'
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Phone Number
                </label>
                <div className='relative'>
                  <Phone
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={18}
                  />
                  <input
                    type='tel'
                    name='phone'
                    value={profileData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder='+1 (555) 000-0000'
                    className='w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all'
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Location
                </label>
                <div className='relative'>
                  <MapPin
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={18}
                  />
                  <input
                    type='text'
                    name='location'
                    value={profileData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder='City, Country'
                    className='w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all'
                  />
                </div>
              </div>

              {/* Occupation */}
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Occupation
                </label>
                <div className='relative'>
                  <Briefcase
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={18}
                  />
                  <input
                    type='text'
                    name='occupation'
                    value={profileData.occupation}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder='Your job title or profession'
                    className='w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all'
                  />
                </div>
              </div>

              {/* Bio */}
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Bio
                </label>
                <textarea
                  name='bio'
                  value={profileData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  placeholder='Tell us about yourself...'
                  className='w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-all resize-none'
                />
              </div>
            </div>

            {/* Joined Date - Read Only */}
            <div className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg'>
              <Calendar size={16} />
              <span>Member since {formatDate(profileData.joinedDate)}</span>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700'>
              {isEditing ? (
                <>
                  <button
                    type='button'
                    onClick={handleCancel}
                    disabled={loading}
                    className='px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={loading}
                    className='px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center space-x-2'
                  >
                    {loading ? (
                      <>
                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  type='button'
                  onClick={() => setIsEditing(true)}
                  className='px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all'
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
