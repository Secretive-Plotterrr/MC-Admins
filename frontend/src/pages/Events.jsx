// src/pages/Events.jsx
import React, { useState, useEffect } from 'react';

function Events() {
  // Mock data - existing events, added attachments and a declined one
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
      attachments: [], // example
      comments: "",
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
      attachments: [],
      comments: "",
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
      attachments: [],
      comments: "",
    },
    {
      id: 4,
      title: "Sample Declined Event",
      date: "2026-02-20",
      time: "10:00 AM - 12:00 PM",
      location: "Conference Room",
      organizer: "Debate Club",
      description: "Debate on current issues.",
      status: "Declined",
      attachments: [{ name: "poster.jpg", type: "image/jpeg" }],
      comments: "Conflicts with another event; please reschedule.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // create/edit modal
  const [detailModal, setDetailModal] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [conflictModal, setConflictModal] = useState(false);
  const [editId, setEditId] = useState(null); // if set, modal is in edit mode

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    description: '',
  });

  const [attachments, setAttachments] = useState([]); // { file, preview?, name, type }

  const hasInput =
    formData.title.trim() !== '' ||
    formData.date !== '' ||
    formData.time.trim() !== '' ||
    formData.location.trim() !== '' ||
    formData.organizer.trim() !== '' ||
    formData.description.trim() !== '' ||
    attachments.length > 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);

    const newAttachments = files.map((file) => {
      const isImage = file.type.startsWith('image/');
      return {
        file,
        name: file.name,
        type: file.type,
        preview: isImage ? URL.createObjectURL(file) : null,
      };
    });

    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => {
      const updated = [...prev];
      const removed = updated[index];

      if (removed.preview) {
        URL.revokeObjectURL(removed.preview);
      }

      updated.splice(index, 1);
      return updated;
    });
  };

  const checkConflict = (date, time, excludeId = null) => {
    return events.some(
      (event) =>
        event.id !== excludeId &&
        event.date === date &&
        event.time === time &&
        ['Approved', 'Pending'].includes(event.status)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.date) {
      alert('Title and Date are required fields.');
      return;
    }

    if (checkConflict(formData.date, formData.time, editId)) {
      setConflictModal(true);
      return;
    }

    const eventAttachments = attachments.map((a) => ({
      name: a.name,
      type: a.type,
    }));

    if (editId) {
      // Edit mode
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editId
            ? {
                ...event,
                ...formData,
                attachments: [...(event.attachments || []), ...eventAttachments],
                status: 'Pending',
                comments: '', // Clear comments on resubmit
              }
            : event
        )
      );
    } else {
      // Create mode
      const newEvent = {
        id: events.length + 1,
        ...formData,
        status: 'Pending',
        attachments: eventAttachments,
        comments: '',
      };
      setEvents([newEvent, ...events]);
    }

    // Cleanup
    attachments.forEach((a) => {
      if (a.preview) URL.revokeObjectURL(a.preview);
    });

    resetForm();
    setSuccessModal(true);
  };

  const resetForm = () => {
    setModalOpen(false);
    setEditId(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      organizer: '',
      description: '',
    });
    setAttachments([]);
  };

  const openEditModal = (event) => {
    setEditId(event.id);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      organizer: event.organizer,
      description: event.description,
    });
    setAttachments([]); // Start with no new attachments; existing shown in detail
    setModalOpen(true);
    setDetailModal(null); // Close detail if open
  };

  // Cleanup previews when modal closes
  useEffect(() => {
    return () => {
      attachments.forEach((a) => {
        if (a.preview) URL.revokeObjectURL(a.preview);
      });
    };
  }, [modalOpen, attachments]);

  // Sort events – newest date first
  const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Filter after sorting
  const filteredEvents = sortedEvents.filter((event) => {
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
                        : event.status === 'Declined'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
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

      {/* CREATE/EDIT Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editId ? 'Edit Event Proposal' : 'Propose New Event'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Organizer</label>
                <input
                  type="text"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Attachments (images, posters, flyers, PDFs...)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
                {attachments.length > 0 && (
                  <div className="mt-2">
                    {attachments.map((att, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span>{att.name}</span>
                        <button type="button" onClick={() => removeAttachment(index)} className="text-red-500">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={resetForm}
                  className={`px-4 py-2 rounded-md transition ${
                    hasInput
                      ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!hasInput}
                  className={`px-5 py-2 rounded-md transition font-medium ${
                    hasInput
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {editId ? 'Resubmit Proposal' : 'Submit Proposal'}
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
            className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-5">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-8">
                {detailModal.title}
              </h2>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  detailModal.status === 'Approved'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                    : detailModal.status === 'Declined'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                }`}
              >
                {detailModal.status}
              </span>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6">
              <p><strong>Date:</strong> {detailModal.date}</p>
              <p><strong>Time:</strong> {detailModal.time}</p>
              <p><strong>Location:</strong> {detailModal.location}</p>
              <p><strong>Organizer:</strong> {detailModal.organizer}</p>
              <p><strong>Description:</strong> {detailModal.description}</p>
              {detailModal.attachments && detailModal.attachments.length > 0 && (
                <div>
                  <strong>Attachments:</strong>
                  <ul>
                    {detailModal.attachments.map((att, index) => (
                      <li key={index}>{att.name} ({att.type})</li>
                    ))}
                  </ul>
                </div>
              )}
              {detailModal.status === 'Declined' && detailModal.comments && (
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/50 rounded-md">
                  <strong>Decline Reason:</strong> {detailModal.comments}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              {detailModal.status === 'Declined' && (
                <button
                  onClick={() => openEditModal(detailModal)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
                >
                  Edit & Resubmit
                </button>
              )}
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

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Success!</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Your event proposal has been {editId ? 'resubmitted' : 'submitted'} successfully.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setSuccessModal(false)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conflict Warning Modal */}
      {conflictModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Booking Conflict</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              There is already an event scheduled at the same date and time. Please choose a different time.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setConflictModal(false)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;