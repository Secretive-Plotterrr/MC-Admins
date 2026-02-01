// src/pages/Announcements.jsx
import React, { useState } from 'react';

function AnnouncementsPage({ isSuperAdmin = false }) {
  // Mock data – newest announcements should come first in real app (or sort below)
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "College Foundation Week Schedule Released",
      content: "The schedule for the upcoming Foundation Week is now available. Check the calendar for details.\n\nEvent highlights:\n• Feb 10 – Opening Ceremony\n• Feb 11–12 – Department Exhibits\n• Feb 13 – Cultural Night\n• Feb 14 – Closing & Awarding",
      postedBy: "Student Affairs Office",
      date: "2026-01-28",
      departments: ["All Departments"],
      urgent: true,
      postedToFB: true,
    },
    {
      id: 2,
      title: "Club Fair Announcement",
      content: "Join us for the annual Club Fair on February 12 at the Gymnasium.\n\nDiscover new clubs and activities!\nBooths open from 9:00 AM – 4:00 PM.\nFree snacks for early registrants.",
      postedBy: "SC President",
      date: "2026-01-27",
      departments: ["Student Organizations", "IT Department"],
      urgent: false,
      postedToFB: false,
    },
    {
      id: 3,
      title: "Thesis Proposal Deadline Extended",
      content: "Good news for thesis writers!\n\nThe deadline for thesis proposals has been extended to February 5, 2026 (11:59 PM).\nPlease submit your proposals via the online portal.\nLate submissions will no longer be accepted after this date.",
      postedBy: "Research Coordinator",
      date: "2026-01-25",
      departments: ["Research Department", "All Students"],
      urgent: true,
      postedToFB: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);           // create modal
  const [detailModal, setDetailModal] = useState(null);        // selected announcement for view

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    departments: [],
    urgent: false,
    postToFB: false,
  });

  const allDepartments = [
    "All Departments",
    "IT Department",
    "Business Administration",
    "Education Department",
    "Engineering Department",
    "Student Organizations",
    "Research Department",
    "Admin",
  ];

  // Sort announcements – newest first
  const sortedAnnouncements = [...announcements].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAnnouncement(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDepartmentChange = (dept) => {
    setNewAnnouncement(prev => {
      const depts = prev.departments.includes(dept)
        ? prev.departments.filter(d => d !== dept)
        : [...prev.departments, dept];
      return { ...prev, departments: depts };
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) return;

    const newAnn = {
      id: announcements.length + 1,
      ...newAnnouncement,
      postedBy: "Current User",
      date: new Date().toISOString().split('T')[0],
      postedToFB: newAnnouncement.postToFB,
    };

    setAnnouncements(prev => [newAnn, ...prev]); // newest first
    setModalOpen(false);
    setNewAnnouncement({
      title: '',
      content: '',
      departments: [],
      urgent: false,
      postToFB: false,
    });

    if (newAnnouncement.postToFB) {
      console.log('Would post to Facebook:', newAnn);
    }
  };

  // Filter after sorting
  const filteredAnnouncements = sortedAnnouncements.filter(ann => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      ann.title.toLowerCase().includes(term) ||
      ann.content.toLowerCase().includes(term) ||
      ann.postedBy.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header + Add Button + Search */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {isSuperAdmin ? 'System Announcements' : 'Announcements'}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
              {isSuperAdmin
                ? 'View all announcements posted across the system'
                : 'Create and manage announcements for Mabini Colleges departments'}
            </p>
          </div>

          {!isSuperAdmin && (
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Announcement
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto sm:mx-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search announcements by title, content, or poster..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredAnnouncements.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No announcements found matching "{searchTerm}"
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Try different keywords or clear the search
            </p>
          </div>
        ) : (
          filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              onClick={() => setDetailModal(ann)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {ann.title}
                </h3>
                {ann.urgent && (
                  <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 rounded-full whitespace-nowrap">
                    Urgent
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {ann.content}
              </p>

              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>Posted by: {ann.postedBy} • {ann.date}</p>
                <p>Departments: {ann.departments.join(', ')}</p>
                <p>Posted to FB: {ann.postedToFB ? 'Yes' : 'No'}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE Modal – only for regular admin */}
      {!isSuperAdmin && modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Announcement</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newAnnouncement.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                <textarea
                  name="content"
                  value={newAnnouncement.content}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Departments</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {allDepartments.map((dept) => (
                    <label key={dept} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={newAnnouncement.departments.includes(dept)}
                        onChange={() => handleDepartmentChange(dept)}
                        className="text-blue-500 focus:ring-blue-500 rounded"
                      />
                      {dept}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={newAnnouncement.urgent}
                    onChange={handleInputChange}
                    className="text-red-500 focus:ring-red-500 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Mark as Urgent</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="postToFB"
                    checked={newAnnouncement.postToFB}
                    onChange={handleInputChange}
                    className="text-blue-500 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Auto-Post to Facebook</span>
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition font-medium"
                >
                  Create & Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL Modal – shown when clicking any announcement */}
      {detailModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={() => setDetailModal(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-5">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-8">
                {detailModal.title}
              </h2>
              {detailModal.urgent && (
                <span className="px-3 py-1 text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 rounded-full">
                  Urgent
                </span>
              )}
            </div>

            <div className="prose dark:prose-invert max-w-none mb-6">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {detailModal.content}
              </p>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-5">
              <p><strong>Posted by:</strong> {detailModal.postedBy}</p>
              <p><strong>Date:</strong> {detailModal.date}</p>
              <p><strong>Target Departments:</strong> {detailModal.departments.join(', ')}</p>
              <p><strong>Posted to Facebook:</strong> {detailModal.postedToFB ? 'Yes' : 'No'}</p>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setDetailModal(null)}
                className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnnouncementsPage;