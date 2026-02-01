// src/pages/Proposal.jsx
import React, { useState } from 'react';

function Proposal() {
  const [proposals, setProposals] = useState([
    {
      id: 101,
      title: "Cultural Night 2026",
      organization: "Performing Arts Club",
      submittedBy: "Juan Dela Cruz",
      submittedDate: "2026-01-27",
      submittedTo: "Student Affairs Office",
      eventDate: "2026-02-20",
      eventTime: "6:00 PM - 10:00 PM",
      location: "Main Campus Quadrangle",
      description:
        "A night of cultural performances featuring traditional Filipino dances, modern interpretations, singing contests, and fashion show showcasing regional attire.\n\nExpected participants: 500+ students and guests\nObjectives: Promote cultural awareness and unity among departments",
      status: "Pending",
      attachments: [],
    },
    {
      id: 102,
      title: "Seminar on AI in Education",
      organization: "IT Society",
      submittedBy: "Maria Santos",
      submittedDate: "2026-01-26",
      submittedTo: "VP for Academic Affairs",
      eventDate: "2026-03-05",
      eventTime: "1:00 PM - 4:00 PM",
      location: "Auditorium",
      description:
        "Half-day seminar with industry speakers discussing how artificial intelligence is transforming teaching and learning.\n\nTopics:\n• AI tools for personalized learning\n• Ethical use of AI in academic settings\n• Case studies from Philippine universities\nTarget audience: Faculty, students (IT, Education, all departments)",
      status: "Approved",
      attachments: ["agenda.pdf", "speaker-bios.jpg"],
    },
    {
      id: 103,
      title: "Intramurals Basketball Tournament",
      organization: "Sports Council",
      submittedBy: "Pedro Reyes",
      submittedDate: "2026-01-25",
      submittedTo: "Sports Development Office",
      eventDate: "2026-02-15",
      eventTime: "8:00 AM onwards",
      location: "Gymnasium & Covered Courts",
      description:
        "3-day inter-department basketball tournament (men's & women's divisions).\n\nFormat: Elimination rounds → Semifinals → Finals\nPrizes: Trophies + cash for champions and runners-up\nOpen to all departments and faculty/staff exhibition game",
      status: "Pending",
      attachments: ["tournament-rules.pdf"],
    },
    {
      id: 104,
      title: "Book Launch & Signing",
      organization: "Literature Society",
      submittedBy: "Ana Lim",
      submittedDate: "2026-01-20",
      submittedTo: "Library Services",
      eventDate: "2026-02-10",
      eventTime: "3:00 PM - 6:00 PM",
      location: "Library Function Room",
      description:
        "Launch of the anthology 'Voices from Mabini' – collection of poems, short stories, and essays by students and alumni.\n\nProgram:\n• Reading performances\n• Author signing session\n• Open forum with contributors",
      status: "Approved",
      attachments: ["cover-design.jpg", "program-flow.pdf"],
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    description: '',
    eventDate: '',
    eventTime: '',
    location: '',
    submittedBy: '',
    submittedTo: 'Student Affairs Office', // default – can be changed in form
  });

  const [attachments, setAttachments] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Sort by submitted date – newest first
  const sortedProposals = [...proposals].sort(
    (a, b) => new Date(b.submittedDate) - new Date(a.submittedDate)
  );

  // Filter proposals
  const filteredProposals = sortedProposals
    .filter((p) => {
      if (activeTab === 'pending') return p.status === 'Pending';
      if (activeTab === 'approved') return p.status === 'Approved';
      return true;
    })
    .filter((p) =>
      searchQuery.trim() === ''
        ? true
        : [p.title, p.organization, p.submittedBy, p.submittedTo || '', p.description || '']
            .join(' ')
            .toLowerCase()
            .includes(searchQuery.toLowerCase().trim())
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);

    const previews = files
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (
      !formData.title ||
      !formData.organization ||
      !formData.description ||
      !formData.eventDate ||
      !formData.submittedBy
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    const newProposal = {
      id: Math.max(...proposals.map((p) => p.id), 0) + 1,
      ...formData,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      attachments: attachments.map((f) => f.name),
    };

    setProposals((prev) => [...prev, newProposal]);
    setSuccess('Proposal submitted successfully! It is now pending approval.');

    // Reset form
    setFormData({
      title: '',
      organization: '',
      description: '',
      eventDate: '',
      eventTime: '',
      location: '',
      submittedBy: '',
      submittedTo: 'Student Affairs Office',
    });
    setAttachments([]);
    setImagePreviews([]);
    setShowForm(false);
  };

  const clearSearch = () => setSearchQuery('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Event Proposals
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-sm whitespace-nowrap flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Proposal
          </button>
        </div>

        {/* Tabs + Search */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="border-b border-gray-200 dark:border-gray-700 flex space-x-6">
            {['all', 'pending', 'approved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search proposals..."
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Proposals Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Organization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Submitted By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Submitted To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Event Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProposals.length > 0 ? (
                  filteredProposals.map((prop) => (
                    <tr key={prop.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {prop.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                        {prop.organization}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                        {prop.submittedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                        {prop.submittedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(prop.eventDate).toLocaleDateString('en-PH', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                            prop.status === 'Approved'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                          }`}
                        >
                          {prop.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedProposal(prop)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      {searchQuery.trim()
                        ? 'No matching proposals found.'
                        : `No ${activeTab === 'all' ? '' : activeTab} proposals yet.`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Proposal Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Proposal</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>

                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-lg">{error}</div>}
                {success && <div className="mb-4 p-3 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-lg">{success}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization *</label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Date *</label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Time</label>
                      <input
                        type="text"
                        name="eventTime"
                        value={formData.eventTime}
                        onChange={handleInputChange}
                        placeholder="e.g. 2:00 PM - 5:00 PM"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name *</label>
                      <input
                        type="text"
                        name="submittedBy"
                        value={formData.submittedBy}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Submit To</label>
                      <select
                        name="submittedTo"
                        value={formData.submittedTo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Student Affairs Office">Student Affairs Office</option>
                        <option value="VP for Academic Affairs">VP for Academic Affairs</option>
                        <option value="Sports Development Office">Sports Development Office</option>
                        <option value="Library Services">Library Services</option>
                        <option value="Cultural Affairs Office">Cultural Affairs Office</option>
                        <option value="Dean’s Office">Dean’s Office</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Attachments (optional)
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-900 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300 dark:hover:file:bg-blue-900/50"
                    />

                    {attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {attachments.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg"
                          >
                            <span className="text-sm truncate flex-1">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeAttachment(idx)}
                              className="ml-3 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {imagePreviews.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {imagePreviews.map((src, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={src}
                              alt="preview"
                              className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition"
                    >
                      Submit Proposal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* View Proposal Detail Modal */}
        {selectedProposal && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProposal(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-10">
                  {selectedProposal.title}
                </h2>
                <span
                  className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                    selectedProposal.status === 'Approved'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                  }`}
                >
                  {selectedProposal.status}
                </span>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-gray-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Organization</p>
                    <p className="font-medium">{selectedProposal.organization}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Submitted By</p>
                    <p className="font-medium">{selectedProposal.submittedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Submitted To</p>
                    <p className="font-medium">{selectedProposal.submittedTo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Submitted Date</p>
                    <p className="font-medium">
                      {new Date(selectedProposal.submittedDate).toLocaleDateString('en-PH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Event Date & Time</p>
                    <p className="font-medium">
                      {new Date(selectedProposal.eventDate).toLocaleDateString('en-PH', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      {selectedProposal.eventTime ? ` • ${selectedProposal.eventTime}` : ''}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-medium">{selectedProposal.location || 'Not specified'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                  <p className="whitespace-pre-line leading-relaxed">{selectedProposal.description}</p>
                </div>

                {selectedProposal.attachments?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Attachments</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedProposal.attachments.map((file, idx) => (
                        <li key={idx} className="text-blue-600 dark:text-blue-400">
                          {file}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Proposal;