// src/pagesAdmin/pageAdmin/AdminSettingsPage.jsx
import React, { useState, useEffect } from 'react';

function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState('light');

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      setTheme('light');
    }
  }, []);

  // Apply theme to <html> and save to localStorage
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">System Settings</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Manage super admin account and campus-wide preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-5">
        <div className="flex gap-1 p-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('account')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${
              activeTab === 'account'
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Account
          </button>

          <button
            onClick={() => setActiveTab('campus')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${
              activeTab === 'campus'
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Campus
          </button>

          <button
            onClick={() => setActiveTab('appearance')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${
              activeTab === 'appearance'
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Appearance
          </button>
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        {activeTab === 'account' && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Super Admin Account</h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-5">
              Update your personal information and password
            </p>

            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Super Administrator"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="superadmin@mabinicolleges.edu.ph"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Change Password</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-md transition flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'campus' && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Campus Information</h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-5">
              Update campus-wide details used in announcements and reports
            </p>

            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Campus Name</label>
                <input
                  type="text"
                  defaultValue="Mabini Colleges - Main Campus"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Campus Address</label>
                <input
                  type="text"
                  defaultValue="Poblacion, Lucban, Quezon"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Number</label>
                <input
                  type="text"
                  defaultValue="+63 42 710-1234"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Official Email</label>
                <input
                  type="email"
                  defaultValue="info@mabinicolleges.edu.ph"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">System Notification Email</label>
                <input
                  type="email"
                  defaultValue="admin@mabinicolleges.edu.ph"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-md transition flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Appearance</h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-5">
              Choose between light and dark mode for the admin panel
            </p>

            <div className="space-y-6 max-w-lg">
              <div>
                <h3 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Theme</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={theme === 'light'}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Light Mode</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={theme === 'dark'}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Light mode is suitable for daytime use, while dark mode reduces eye strain in low-light environments.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Preview</h3>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 space-y-3">
                  <div className="h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded"></div>
                  <div className="h-6 bg-white dark:bg-gray-800 rounded shadow-sm"></div>
                  <div className="h-6 bg-blue-50 dark:bg-gray-900 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSettingsPage;