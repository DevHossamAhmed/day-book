/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';

const UserProfilePage = () => {
  const [name, setName] = useState('Benjamin Canac');
  const [email, setEmail] = useState('ben@nuxtlabs.com');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin');
  const [hasChanges, setHasChanges] = useState(false);

  const handleSaveChanges = () => {
    setHasChanges(false);
    // Show success message
    alert('Changes saved successfully!');
  };

  const handleAvatarUpload = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('File size must be less than 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        //@ts-expect-error:res
        setAvatar(reader.result);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };
//@ts-expect-error:setter
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setHasChanges(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <button
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
              hasChanges
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-blue-400 cursor-not-allowed'
            }`}
          >
            Save changes
          </button>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
          {/* Name Field */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <label className="text-sm font-medium text-gray-700 sm:w-32 pt-3">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={handleInputChange(setName)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <label className="text-sm font-medium text-gray-700 sm:w-32 pt-3">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
              placeholder="Enter your email"
            />
          </div>

          {/* Avatar Field */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="sm:w-32">
              <label className="text-sm font-medium text-gray-700">Avatar</label>
              <p className="text-xs text-gray-500 mt-1">
                JPG, GIF or PNG. 1MB Max.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-1">
              <div className="relative">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  //@ts-expect-error:onchange
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <span className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Save changes
                </span>
              </label>
            </div>
          </div>

          {/* Bio Field */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <label className="text-sm font-medium text-gray-700 sm:w-32 pt-3">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={handleInputChange(setBio)}
              rows={6}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>All fields marked with <span className="text-red-500">*</span> are required</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;