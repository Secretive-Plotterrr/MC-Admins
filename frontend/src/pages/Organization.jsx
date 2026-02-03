// src/pages/Organizations.jsx
import React, { useState } from 'react';

const mockOrganizations = [
  {
    id: 1,
    name: 'Supreme Student Council (SSC)',
    acronym: 'SSC',
    type: 'Student Government',
    advisor: 'Dr. Maria Santos',
    status: 'Active',
    members: 28,
    eventsThisMonth: 4,
    pendingProposals: 2,
  },
  {
    id: 2,
    name: 'College of Business Student Society',
    acronym: 'CBSS',
    type: 'Academic',
    advisor: 'Prof. Juan Dela Cruz',
    status: 'Active',
    members: 65,
    eventsThisMonth: 1,
    pendingProposals: 0,
  },
  {
    id: 3,
    name: 'Cultural Dance Troupe',
    acronym: 'CDT',
    type: 'Cultural',
    advisor: 'Ms. Ana Reyes',
    status: 'Active',
    members: 22,
    eventsThisMonth: 3,
    pendingProposals: 1,
  },
  {
    id: 4,
    name: 'Engineering Innovators Club',
    acronym: 'EIC',
    type: 'Academic',
    advisor: 'Engr. Pedro Lim',
    status: 'Probation',
    members: 41,
    eventsThisMonth: 0,
    pendingProposals: 1,
  },
  {
    id: 5,
    name: 'Environmental Awareness Group',
    acronym: 'EAG',
    type: 'Advocacy',
    advisor: 'Prof. Clara Gomez',
    status: 'Inactive',
    members: 15,
    eventsThisMonth: 0,
    pendingProposals: 0,
  },
];

const Organizations = () => {
  const [organizations, setOrganizations] = useState(mockOrganizations);
  const [searchTerm, setSearchTerm] = useState('');

  // Form modal (add / edit)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [currentOrg, setCurrentOrg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    acronym: '',
    type: 'Academic',
    advisor: '',
    status: 'Active',
    members: '',
  });

  // Notification toast
  const [notification, setNotification] = useState(null);

  // View details modal
  const [viewModalOrg, setViewModalOrg] = useState(null);

  const filteredOrgs = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ────────────────────────────────────────────────
  //  Form Modal Handlers (Add / Edit)
  // ────────────────────────────────────────────────
  const openAddModal = () => {
    setCurrentOrg(null);
    setFormData({
      name: '',
      acronym: '',
      type: 'Academic',
      advisor: '',
      status: 'Active',
      members: '',
    });
    setIsFormModalOpen(true);
  };

  const openEditModal = (org) => {
    setCurrentOrg(org);
    setFormData({
      name: org.name,
      acronym: org.acronym,
      type: org.type,
      advisor: org.advisor,
      status: org.status,
      members: org.members.toString(),
    });
    setIsFormModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'members' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.acronym.trim()) {
      setNotification({ type: 'error', message: 'Organization Name and Acronym are required!' });
      return;
    }

    let message = '';
    if (currentOrg) {
      // Edit existing
      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === currentOrg.id
            ? { ...org, ...formData, members: Number(formData.members) || 0 }
            : org
        )
      );
      message = `"${formData.name}" has been updated successfully!`;
    } else {
      // Add new
      const newId = Math.max(...organizations.map((o) => o.id), 0) + 1;
      const newOrg = {
        id: newId,
        ...formData,
        members: Number(formData.members) || 0,
        eventsThisMonth: 0,
        pendingProposals: 0,
      };
      setOrganizations((prev) => [...prev, newOrg]);
      message = `New organization "${formData.name}" added successfully!`;
    }

    setNotification({ type: 'success', message });
    setIsFormModalOpen(false);

    // Auto-dismiss notification
    setTimeout(() => setNotification(null), 2800);
  };

  // ────────────────────────────────────────────────
  //  View Details Modal
  // ────────────────────────────────────────────────
  const openViewModal = (org) => {
    setViewModalOrg(org);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Organizations</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage student organizations, clubs, and departments
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Register New Organization
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, acronym, or type..."
          className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
          <option value="">All Types</option>
          <option value="Student Government">Student Government</option>
          <option value="Academic">Academic</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Advocacy">Advocacy</option>
          <option value="Religious">Religious</option>
        </select>
      </div>

      {/* Table / Empty State */}
      {filteredOrgs.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {searchTerm ? 'No matching organizations found.' : 'No organizations registered yet.'}
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Organization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Advisor</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Members</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Events (This Month)</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pending</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrgs.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{org.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{org.acronym}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{org.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{org.advisor || '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600 dark:text-gray-400">{org.members}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600 dark:text-gray-400">{org.eventsThisMonth}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600 dark:text-gray-400">{org.pendingProposals}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          org.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                            : org.status === 'Probation'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                        }`}
                      >
                        {org.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <button
                        onClick={() => openViewModal(org)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openEditModal(org)}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div
            className={`px-6 py-3 rounded-lg shadow-2xl text-white font-medium text-center transition-all duration-300 ${
              notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}

      {/* Form Modal (Add/Edit) */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {currentOrg ? 'Edit Organization' : 'Register New Organization'}
                </h2>
                <button
                  onClick={() => setIsFormModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Acronym / Short Name *
                    </label>
                    <input
                      type="text"
                      name="acronym"
                      value={formData.acronym}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="Student Government">Student Government</option>
                      <option value="Academic">Academic</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Sports">Sports</option>
                      <option value="Advocacy">Advocacy</option>
                      <option value="Religious">Religious</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Advisor</label>
                    <input
                      type="text"
                      name="advisor"
                      value={formData.advisor}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="Active">Active</option>
                      <option value="Probation">Probation</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Number of Members
                    </label>
                    <input
                      type="number"
                      name="members"
                      value={formData.members}
                      onChange={handleFormChange}
                      min="0"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormModalOpen(false)}
                    className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow-sm"
                  >
                    {currentOrg ? 'Save Changes' : 'Add Organization'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewModalOrg && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setViewModalOrg(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-200 dark:border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">
              {viewModalOrg.name} ({viewModalOrg.acronym})
            </h2>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                  <p className="font-medium">{viewModalOrg.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Advisor</p>
                  <p className="font-medium">{viewModalOrg.advisor || 'Not assigned'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <p className="font-medium">{viewModalOrg.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Members</p>
                  <p className="font-medium">{viewModalOrg.members}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Events this month</p>
                    <p className="font-medium text-green-600 dark:text-green-400">
                      {viewModalOrg.eventsThisMonth}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pending proposals</p>
                    <p className="font-medium text-yellow-600 dark:text-yellow-400">
                      {viewModalOrg.pendingProposals}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setViewModalOrg(null)}
                className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Organizations;