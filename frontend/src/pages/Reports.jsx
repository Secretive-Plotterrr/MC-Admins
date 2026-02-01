// src/pages/Reports.jsx
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data — later replace with real API fetch
const mockReportData = {
  totalEvents: 42,
  approvedThisMonth: 12,
  pendingProposals: 5,
  upcomingEvents: 7,
  activeOrganizations: 18,
  byCategory: [
    { name: 'Cultural', value: 5 },
    { name: 'Academic', value: 4 },
    { name: 'Sports', value: 3.5 },
    { name: 'Seminar', value: 2 },
    { name: 'Others', value: 3 },
  ],
  recentActivity: [
    { date: 'Jan 28, 2026', event: 'Cultural Night', org: 'CDT', status: 'Approved' },
    { date: 'Jan 25, 2026', event: 'Seminar on AI', org: 'EIC', status: 'Pending' },
    { date: 'Jan 20, 2026', event: 'Basketball Tournament', org: 'SSC', status: 'Approved' },
    { date: 'Jan 15, 2026', event: 'Leadership Workshop', org: 'CBSS', status: 'Approved' },
    { date: 'Jan 10, 2026', event: 'Tree Planting', org: 'EAG', status: 'Completed' },
  ],
};

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState('January');
  const [yearFilter, setYearFilter] = useState('2026');
  const [searchActivity, setSearchActivity] = useState('');

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setReportData(mockReportData);
      setLoading(false);
    }, 1200);
  }, []);

  // Filter activity log
  const filteredActivity = reportData?.recentActivity.filter(item =>
    item.event.toLowerCase().includes(searchActivity.toLowerCase()) ||
    item.org.toLowerCase().includes(searchActivity.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading reports...</p>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen text-center">
        <p className="text-xl text-gray-600">No report data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header + Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">
            Event and activity overview • {monthFilter} {yearFilter}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={monthFilter}
            onChange={e => setMonthFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[2024, 2025, 2026, 2027].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards - responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">Total Events</h3>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">{reportData.totalEvents}</p>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">Approved</h3>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">{reportData.approvedThisMonth}</p>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">Pending</h3>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-600 mt-2">{reportData.pendingProposals}</p>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">Upcoming</h3>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-2">{reportData.upcomingEvents}</p>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-md transition col-span-2 sm:col-span-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">Active Orgs</h3>
          <p className="text-2xl sm:text-3xl font-bold text-indigo-600 mt-2">{reportData.activeOrganizations}</p>
        </div>
      </div>

      {/* Bar Chart - fully responsive */}
      <div className="bg-white p-5 sm:p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 text-gray-800">Events by Category</h2>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={reportData.byCategory}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} events`, 'Count']} />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="Events" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recent Activity Log</h2>
          <input
            type="text"
            placeholder="Search events or organizations..."
            value={searchActivity}
            onChange={e => setSearchActivity(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredActivity.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No matching activities found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event / Proposal</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredActivity.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.event}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.org}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Export */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => alert('Export to PDF/CSV feature coming soon! (Use jsPDF or PapaParse)')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow transition"
        >
          Export Report (PDF/CSV)
        </button>
        {/* You can add more buttons: Print, Share, etc. */}
      </div>
    </div>
  );
};

export default Reports;