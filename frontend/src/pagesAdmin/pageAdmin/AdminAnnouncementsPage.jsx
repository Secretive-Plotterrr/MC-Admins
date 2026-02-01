// src/pagesAdmin/pageAdmin/AdminAnnouncementsPage.jsx
import React, { useState } from 'react';

function AdminAnnouncementsPage() {
  // Mock data – all announcements in the system
  const [announcements] = useState([
    {
      id: 1,
      title: "College Foundation Week Schedule Released",
      content: "The official schedule for Foundation Week (February 10–14, 2026) is now available. Please check the calendar and prepare accordingly. Activities include cultural shows, sports events, and academic exhibits.",
      postedBy: "Student Affairs Office",
      postedByEmail: "studentaffairs@mabinicolleges.edu.ph",
      date: "2026-01-28",
      departments: ["All Departments"],
      urgent: true,
      postedToFB: true,
      views: 1245,
    },
    {
      id: 2,
      title: "Club Fair – February 12 @ Gymnasium",
      content: "All students are invited to the annual Club Fair on February 12 from 9 AM to 3 PM at the Gymnasium. Discover new organizations, join activities, and meet fellow students.",
      postedBy: "SC President",
      postedByEmail: "sc.president@mabinicolleges.edu.ph",
      date: "2026-01-27",
      departments: ["Student Organizations", "All Students"],
      urgent: false,
      postedToFB: true,
      views: 856,
    },
    {
      id: 3,
      title: "Thesis Proposal Deadline Extended to Feb 5",
      content: "Due to numerous requests, the thesis proposal submission deadline has been extended to February 5, 2026. All submissions must be made through the online portal. Late submissions will not be accepted.",
      postedBy: "Research Coordinator",
      postedByEmail: "research@mabinicolleges.edu.ph",
      date: "2026-01-25",
      departments: ["Research Department", "Graduating Students"],
      urgent: true,
      postedToFB: false,
      views: 632,
    },
    {
      id: 4,
      title: "Reminder: Submit Event Proposals by Feb 5",
      content: "This is a friendly reminder that all event proposals for the second semester must be submitted by February 5. Late proposals will be reviewed only after priority processing of early submissions.",
      postedBy: "Admin",
      postedByEmail: "admin@mabinicolleges.edu.ph",
      date: "2026-01-24",
      departments: ["Student Organizations"],
      urgent: false,
      postedToFB: true,
      views: 419,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterUrgent, setFilterUrgent] = useState('all'); // 'all', 'urgent', 'normal'
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  // Filtered list
  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesSearch = !searchTerm.trim() ||
      ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.postedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUrgent =
      filterUrgent === 'all' ||
      (filterUrgent === 'urgent' && ann.urgent) ||
      (filterUrgent === 'normal' && !ann.urgent);

    return matchesSearch && matchesUrgent;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Manage Announcements
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          View, review and monitor all system-wide announcements
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80 lg:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, content, or poster..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Urgent Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterUrgent('all')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              filterUrgent === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterUrgent('urgent')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              filterUrgent === 'urgent'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Urgent Only
          </button>
          <button
            onClick={() => setFilterUrgent('normal')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
              filterUrgent === 'normal'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Non-urgent
          </button>
        </div>
      </div>

      {/* Announcements Grid */}
      {filteredAnnouncements.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg">No announcements found</p>
          <p className="mt-2">Try changing the filter or search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              onClick={() => setSelectedAnnouncement(ann)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
                  {ann.title}
                </h3>
                {ann.urgent && (
                  <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 rounded-full whitespace-nowrap">
                    Urgent
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                {ann.content}
              </p>

              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>Posted by: {ann.postedBy}</p>
                <p>Date: {ann.date}</p>
                <p>Departments: {ann.departments.join(', ')}</p>
                <p>FB Post: {ann.postedToFB ? 'Yes' : 'No'}</p>
                <p className="mt-2">Views: {ann.views.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Announcement Details
              </h2>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-3xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedAnnouncement.title}
                </h3>
                {selectedAnnouncement.urgent && (
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 rounded-full mb-3">
                    URGENT
                  </span>
                )}
              </div>

              <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {selectedAnnouncement.content}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-medium text-gray-600 dark:text-gray-400">Posted by</p>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedAnnouncement.postedBy} ({selectedAnnouncement.postedByEmail})
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-600 dark:text-gray-400">Posted on</p>
                  <p className="mt-1 text-gray-900 dark:text-white">{selectedAnnouncement.date}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600 dark:text-gray-400">Target Departments</p>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedAnnouncement.departments.join(', ')}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-600 dark:text-gray-400">Posted to Facebook</p>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedAnnouncement.postedToFB ? 'Yes' : 'No'}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-600 dark:text-gray-400">Views</p>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedAnnouncement.views.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition font-medium"
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

export default AdminAnnouncementsPage;