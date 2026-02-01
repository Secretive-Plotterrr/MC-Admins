// src/pagesAdmin/pageAdmin/AdminProposals.jsx
import React, { useState } from 'react';

function AdminProposals() {
  // Mock data – all proposals in the system
  const [proposals, setProposals] = useState([
    {
      id: 101,
      title: "Cultural Night 2026",
      organization: "Performing Arts Club",
      submittedBy: "Juan Dela Cruz",
      submittedEmail: "juan.delacruz@mabinicolleges.edu.ph",
      submittedDate: "2026-01-27",
      eventDate: "2026-02-20",
      eventTime: "6:00 PM - 10:00 PM",
      location: "Open Field / Gym",
      description:
        "Annual cultural showcase featuring traditional dances, music performances, and Filipino cuisine booths. Expected attendees: 800+ students and faculty.",
      status: "Pending",
      attachments: ["proposal.pdf", "budget.xlsx", "poster_concept.jpg"],
    },
    {
      id: 102,
      title: "Seminar on AI in Education",
      organization: "IT Society",
      submittedBy: "Maria Santos",
      submittedEmail: "maria.santos@mabinicolleges.edu.ph",
      submittedDate: "2026-01-26",
      eventDate: "2026-03-05",
      eventTime: "1:00 PM - 4:00 PM",
      location: "Auditorium",
      description:
        "Invited speakers from tech industry to discuss applications of AI in modern education. Target audience: IT students and faculty.",
      status: "Approved",
      attachments: ["seminar_proposal.pdf", "speaker_list.docx"],
    },
    {
      id: 103,
      title: "Intramurals Basketball Tournament",
      organization: "Sports Council",
      submittedBy: "Pedro Reyes",
      submittedEmail: "pedro.reyes@mabinicolleges.edu.ph",
      submittedDate: "2026-01-25",
      eventDate: "2026-02-15",
      eventTime: "9:00 AM onwards",
      location: "Gymnasium",
      description:
        "Annual inter-department basketball tournament with 12 participating teams. Includes opening ceremony and awards.",
      status: "Pending",
      attachments: ["tournament_rules.pdf", "team_list.xlsx"],
    },
    {
      id: 104,
      title: "Book Launch & Signing",
      organization: "Literature Society",
      submittedBy: "Ana Lim",
      submittedEmail: "ana.lim@mabinicolleges.edu.ph",
      submittedDate: "2026-01-20",
      eventDate: "2026-02-10",
      eventTime: "3:00 PM - 6:00 PM",
      location: "Library Function Room",
      description:
        "Launch of student-published anthology with author signing and poetry reading. Open to public.",
      status: "Approved",
      attachments: ["book_cover.jpg", "program_flow.pdf"],
    },
  ]);

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProposal, setSelectedProposal] = useState(null);

  // Filter proposals
  const filteredProposals = proposals.filter((p) => {
    const matchesTab =
      activeTab === 'All' ||
      p.status.toLowerCase() === activeTab.toLowerCase();

    if (!searchQuery.trim()) return matchesTab;

    const term = searchQuery.toLowerCase();
    return (
      matchesTab &&
      (p.title.toLowerCase().includes(term) ||
        p.organization.toLowerCase().includes(term) ||
        p.submittedBy.toLowerCase().includes(term) ||
        p.submittedEmail.toLowerCase().includes(term))
    );
  });

  const handleApprove = (id) => {
    if (!window.confirm("Approve this proposal?")) return;

    setProposals((prev) =>
      prev.map((prop) =>
        prop.id === id ? { ...prop, status: "Approved" } : prop
      )
    );
    setSelectedProposal(null);
    alert("Proposal approved successfully.");
  };

  const handleDecline = (id) => {
    const reason = window.prompt("Reason for declining (optional):");
    if (reason === null) return; // user canceled

    setProposals((prev) =>
      prev.map((prop) =>
        prop.id === id
          ? {
              ...prop,
              status: "Declined",
              declineReason: reason.trim() || "No reason provided",
            }
          : prop
      )
    );
    setSelectedProposal(null);
    alert("Proposal declined.");
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Review Event Proposals
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Approve or decline proposals submitted by student organizations
        </p>
      </div>

      {/* Tabs + Search */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {['All', 'Pending', 'Approved', 'Declined'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-700 dark:border-blue-500 dark:text-blue-400'
                  : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {tab}
              {tab !== 'All' && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-700">
                  {proposals.filter(p => p.status === tab).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72 lg:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, org, name, email..."
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Proposals Grid / List */}
      {filteredProposals.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg">No {activeTab !== 'All' ? activeTab.toLowerCase() : ''} proposals found</p>
          <p className="mt-2">Try changing the filter or search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {filteredProposals.map((prop) => (
            <div
              key={prop.id}
              onClick={() => setSelectedProposal(prop)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all cursor-pointer"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
                    {prop.title}
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                      prop.status === 'Approved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                        : prop.status === 'Declined'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                    }`}
                  >
                    {prop.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {prop.organization}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {prop.submittedBy}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(prop.eventDate).toLocaleDateString('en-PH')}
                  </p>
                </div>

                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {prop.description}
                </p>

                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Submitted: {new Date(prop.submittedDate).toLocaleDateString('en-PH')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Proposal Details
              </h2>
              <button
                onClick={() => setSelectedProposal(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {selectedProposal.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                    {selectedProposal.organization}
                  </p>
                </div>
                <span
                  className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                    selectedProposal.status === 'Approved'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                      : selectedProposal.status === 'Declined'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                  }`}
                >
                  {selectedProposal.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Submitted by</p>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedProposal.submittedBy} ({selectedProposal.submittedEmail})
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Submitted on</p>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {new Date(selectedProposal.submittedDate).toLocaleDateString('en-PH')}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Event Date & Time</p>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {new Date(selectedProposal.eventDate).toLocaleDateString('en-PH')} • {selectedProposal.eventTime || 'TBA'}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Location</p>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {selectedProposal.location || 'Not specified'}
                  </p>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Description</p>
                <p className="text-gray-900 dark:text-white whitespace-pre-line">
                  {selectedProposal.description}
                </p>
              </div>

              {selectedProposal.attachments?.length > 0 && (
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Attachments</p>
                  <div className="flex flex-wrap gap-3">
                    {selectedProposal.attachments.map((file, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm text-gray-800 dark:text-gray-300"
                      >
                        {file}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProposal.declineReason && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <p className="font-medium text-red-800 dark:text-red-300">Decline Reason:</p>
                  <p className="mt-1 text-red-700 dark:text-red-400">
                    {selectedProposal.declineReason}
                  </p>
                </div>
              )}

              {/* Action Buttons - only show if Pending */}
              {selectedProposal.status === 'Pending' && (
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleApprove(selectedProposal.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approve Proposal
                  </button>
                  <button
                    onClick={() => handleDecline(selectedProposal.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Decline Proposal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProposals;