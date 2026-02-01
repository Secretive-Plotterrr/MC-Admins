// src/pages/Organizations.jsx

import React, { useState, useEffect } from 'react';

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
  const [organizations, setOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

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

  // Notification modal
  const [notification, setNotification] = useState(null);
  // View details modal
  const [viewModalOrg, setViewModalOrg] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setOrganizations(mockOrganizations);
      setLoading(false);
    }, 800);
  }, []);

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
      // Edit
      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === currentOrg.id
            ? { ...org, ...formData, members: Number(formData.members) || 0 }
            : org
        )
      );
      message = `"${formData.name}" has been updated successfully!`;
    } else {
      // Add
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

    // Auto-close notification after 2.5s
    setTimeout(() => setNotification(null), 2500);
  };

  // ────────────────────────────────────────────────
  //  View Details Modal
  // ────────────────────────────────────────────────
  const openViewModal = (org) => {
    setViewModalOrg(org);
  };

  // ────────────────────────────────────────────────
  //  Render
  // ────────────────────────────────────────────────
  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Organizations</h1>
          <p className="text-gray-600">Manage student organizations, clubs, and departments</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition"
        >
          + Register New Organization
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, acronym, or type..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Types</option>
          <option value="Student Government">Student Government</option>
          <option value="Academic">Academic</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Advocacy">Advocacy</option>
          <option value="Religious">Religious</option>
        </select>
      </div>

      {/* Table / Loading / Empty */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading organizations...</p>
        </div>
      ) : filteredOrgs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <p className="text-gray-500 text-lg">No organizations found.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advisor</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Events (This Month)</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrgs.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{org.name}</div>
                      <div className="text-sm text-gray-500">{org.acronym}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{org.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{org.advisor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{org.members}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{org.eventsThisMonth}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{org.pendingProposals}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          org.status === 'Active' ? 'bg-green-100 text-green-800' :
                          org.status === 'Probation' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {org.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button onClick={() => openViewModal(org)} className="text-blue-600 hover:text-blue-900">View</button>
                      <button onClick={() => openEditModal(org)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Success / Error Notification Modal (centered, auto-hide) */}
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div
            className={`px-6 py-4 rounded-lg shadow-2xl text-white font-medium text-center transform transition-all duration-300 ${
              notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}

      {/* Form Modal (Add/Edit) */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-5">
                {currentOrg ? 'Edit Organization' : 'Register New Organization'}
              </h2>

              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Acronym / Short Name *</label>
                    <input
                      type="text"
                      name="acronym"
                      value={formData.acronym}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Advisor</label>
                    <input
                      type="text"
                      name="advisor"
                      value={formData.advisor}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Active">Active</option>
                      <option value="Probation">Probation</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Members</label>
                    <input
                      type="number"
                      name="members"
                      value={formData.members}
                      onChange={handleFormChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">{viewModalOrg.name} ({viewModalOrg.acronym})</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Type:</strong> {viewModalOrg.type}</p>
              <p><strong>Advisor:</strong> {viewModalOrg.advisor || 'Not assigned'}</p>
              <p><strong>Status:</strong> {viewModalOrg.status}</p>
              <p><strong>Members:</strong> {viewModalOrg.members}</p>
              <p><strong>Events this month:</strong> {viewModalOrg.eventsThisMonth}</p>
              <p><strong>Pending proposals:</strong> {viewModalOrg.pendingProposals}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewModalOrg(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
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