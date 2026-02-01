// src/pages/Events.jsx
import React, { useState } from 'react';

function Events() {
  // Mock data - existing events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "College Foundation Week",
      date: "2026-02-10",
      time: "08:00 AM - 05:00 PM",
      location: "Main Campus Grounds",
      organizer: "Student Council",
      description: "Week-long celebration of Mabini Colleges' foundation anniversary.\n\nHighlights:\n• Daily department booths & exhibits\n• Cultural performances every evening\n• Game shows and raffle draws\n• Grand alumni homecoming on Feb 14",
      status: "Approved",
    },
    {
      id: 2,
      title: "Seminar on Artificial Intelligence",
      date: "2026-02-18",
      time: "01:00 PM - 04:00 PM",
      location: "Auditorium",
      organizer: "IT Society",
      description: "A half-day seminar featuring industry experts discussing current trends in AI.\n\nTopics include:\n• Generative AI in education\n• Ethical considerations in AI deployment\n• Career opportunities in AI & machine learning\nOpen to all students & faculty. Registration required.",
      status: "Pending",
    },
    {
      id: 3,
      title: "Intramurals Basketball Tournament",
      date: "2026-03-05",
      time: "09:00 AM onwards",
      location: "Gymnasium",
      organizer: "Sports Council",
      description: "Annual inter-department 3×3 and 5×5 basketball tournament.\n\nCategories:\n• Men's Open\n• Women's Open\n• Faculty & Staff Exhibition Game\nTrophies and cash prizes await the champions!",
      status: "Approved",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);           // create modal
  const [detailModal, setDetailModal] = useState(null);        // view details modal

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    description: '',
  });

  const hasInput = Object.values(formData).some(value => value.trim() !== '');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.date) {
      alert("Title and Date are required fields.");
      return;
    }

    const newEvent = {
      id: events.length + 1,
      ...formData,
      status: "Pending",
    };

    // Add to top (newest first)
    setEvents([newEvent, ...events]);
    setModalOpen(false);

    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      organizer: '',
      description: '',
    });

    alert("Event proposal submitted successfully! It is now pending approval.");
  };

  // Sort events – newest date first
  const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Filter after sorting
  const filteredEvents = sortedEvents.filter(event => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      event.title.toLowerCase().includes(term) ||
      event.organizer.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term) ||
      event.description.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header & Search */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Events</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
              Create and view upcoming events & activities at Mabini Colleges
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Propose New Event
          </button>
        </div>

        <div className="relative max-w-xl mx-auto sm:mx-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events by title, organizer, location..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No events found matching "{searchTerm}"
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Try different keywords or clear the search
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setDetailModal(event)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            >
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {event.title}
                  </h3>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                      event.status === 'Approved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM6 5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {event.organizer}
                  </p>
                </div>

                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {event.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Propose New Event</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Fill in the details. Your proposal will be reviewed by the administrator.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Cultural Night 2026"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 1:00 PM - 4:00 PM"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location / Venue
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Gymnasium, Auditorium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Organizer / Club
                  </label>
                  <input
                    type="text"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. IT Society, Student Council"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the event, objectives, expected participants, etc."
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-5 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className={`px-6 py-2.5 rounded-lg font-medium transition order-2 sm:order-1 ${
                    hasInput
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-600'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`px-6 py-2.5 rounded-lg font-medium transition shadow-sm order-1 sm:order-2 ${
                    hasInput
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 hover:bg-gray-400 text-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-300 cursor-not-allowed'
                  }`}
                  disabled={!hasInput}
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL Modal */}
      {detailModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={() => setDetailModal(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-5">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white pr-10">
                {detailModal.title}
              </h2>
              <span
                className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                  detailModal.status === 'Approved'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                }`}
              >
                {detailModal.status}
              </span>
            </div>

            <div className="space-y-4 text-gray-700 dark:text-gray-300 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-medium">{detailModal.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                    <p className="font-medium">{detailModal.time || "Not specified"}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-medium">{detailModal.location || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM6 5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Organizer</p>
                    <p className="font-medium">{detailModal.organizer}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {detailModal.description}
              </p>
            </div>

            <div className="flex justify-end">
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

export default Events;