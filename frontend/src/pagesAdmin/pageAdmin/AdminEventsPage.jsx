// src/pagesAdmin/pageAdmin/AdminEvents.jsx
import React, { useState } from 'react';

function AdminEvents() {
  // Mock data - all events in the system
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "College Foundation Week",
      date: "2026-02-10",
      time: "08:00 AM - 05:00 PM",
      location: "Main Campus Grounds",
      organizer: "Student Council",
      description: "Week-long celebration with games, performances, and exhibits.",
      status: "Approved",
      submittedBy: "sc.president@mabinicolleges.edu.ph",
      submittedAt: "2026-01-15",
    },
    {
      id: 2,
      title: "Seminar on Artificial Intelligence",
      date: "2026-02-18",
      time: "01:00 PM - 04:00 PM",
      location: "Auditorium",
      organizer: "IT Society",
      description: "Guest speakers from industry leaders discussing AI in education.",
      status: "Pending",
      submittedBy: "itsociety@mabinicolleges.edu.ph",
      submittedAt: "2026-01-28",
    },
    {
      id: 3,
      title: "Intramurals Basketball Tournament",
      date: "2026-03-05",
      time: "09:00 AM onwards",
      location: "Gymnasium",
      organizer: "Sports Council",
      description: "Inter-department basketball competition with prizes.",
      status: "Approved",
      submittedBy: "sports.council@mabinicolleges.edu.ph",
      submittedAt: "2026-01-20",
    },
    {
      id: 4,
      title: "Cultural Night 2026",
      date: "2026-03-15",
      time: "06:00 PM - 10:00 PM",
      location: "Open Field",
      organizer: "Performing Arts Club",
      description: "Showcase of Filipino culture through dance, music and food.",
      status: "Pending",
      submittedBy: "pac.club@mabinicolleges.edu.ph",
      submittedAt: "2026-01-30",
    },
    {
      id: 5,
      title: "Thesis Defense Schedule Release",
      date: "2026-02-25",
      time: "All Day",
      location: "Online / Campus",
      organizer: "Research Office",
      description: "Announcement of thesis defense dates for graduating students.",
      status: "Declined",
      submittedBy: "research@mabinicolleges.edu.ph",
      submittedAt: "2026-01-10",
      declineReason: "Overlaps with foundation week events",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All'); // All, Pending, Approved, Declined

  // Filter events by tab and search
  const filteredEvents = events.filter((event) => {
    const matchesTab =
      activeTab === 'All' ||
      event.status.toLowerCase() === activeTab.toLowerCase();

    if (!searchTerm.trim()) return matchesTab;

    const term = searchTerm.toLowerCase();
    return (
      matchesTab &&
      (event.title.toLowerCase().includes(term) ||
        event.organizer.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term) ||
        event.submittedBy?.toLowerCase().includes(term))
    );
  });

  const handleApprove = (id) => {
    if (!window.confirm("Approve this event proposal?")) return;

    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, status: "Approved" } : ev
      )
    );
    alert("Event approved successfully.");
  };

  const handleDecline = (id) => {
    const reason = window.prompt("Reason for declining (optional):");
    if (reason === null) return; // canceled

    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id
          ? { ...ev, status: "Declined", declineReason: reason || "No reason provided" }
          : ev
      )
    );
    alert("Event declined.");
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Event Proposals & Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
              Review, approve or decline event proposals submitted by organizations
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-5 flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
          {['All', 'Pending', 'Approved', 'Declined'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-700 dark:text-blue-400 dark:border-blue-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab}
              {tab !== 'All' && (
                <span className="ml-1.5 px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-700">
                  {events.filter(e => e.status === tab).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mt-5">
          <div className="relative max-w-xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, organizer, email, location..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className="py-12 text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg">No {activeTab.toLowerCase() !== 'all' ? activeTab.toLowerCase() : ''} events found</p>
          <p className="mt-2">Try adjusting the search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {event.title}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                      event.status === 'Approved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                        : event.status === 'Declined'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <div className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.organizer}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {event.submittedBy}
                  </p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                  {event.description}
                </p>

                {/* Admin Actions - only for Pending */}
                {event.status === 'Pending' && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleApprove(event.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium transition shadow-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(event.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition shadow-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Decline
                    </button>
                  </div>
                )}

                {/* Decline reason if declined */}
                {event.status === 'Declined' && event.declineReason && (
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-medium text-red-700 dark:text-red-400">Decline Reason:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {event.declineReason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminEvents;