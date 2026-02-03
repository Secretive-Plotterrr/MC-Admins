// src/pages/Reports.jsx
import React, { useState } from 'react';
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

// Mock data (you can later replace with real API fetch)
const mockReportData = {
  totalEvents: 42,
  approvedThisMonth: 12,
  pendingProposals: 5,
  upcomingEvents: 7,
  activeOrganizations: 18,
  byCategory: [
    { name: 'Cultural', value: 15 },
    { name: 'Academic', value: 12 },
    { name: 'Sports', value: 8 },
    { name: 'Seminar', value: 5 },
    { name: 'Others', value: 2 },
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
  const [reportData] = useState(mockReportData);
  const [monthFilter, setMonthFilter] = useState('January');
  const [yearFilter, setYearFilter] = useState('2026');
  const [searchActivity, setSearchActivity] = useState('');

  // Filter activity log
  const filteredActivity = reportData.recentActivity.filter(
    (item) =>
      item.event.toLowerCase().includes(searchActivity.toLowerCase()) ||
      item.org.toLowerCase().includes(searchActivity.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 transition-colors duration-300">
      {/* Header + Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Event and activity overview • {monthFilter} {yearFilter}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
              (m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              )
            )}
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            {[2024, 2025, 2026, 2027].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Total Events</h3>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{reportData.totalEvents}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Approved This Month</h3>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{reportData.approvedThisMonth}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Pending</h3>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{reportData.pendingProposals}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Upcoming</h3>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{reportData.upcomingEvents}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition col-span-2 sm:col-span-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">Active Organizations</h3>
          <p className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">{reportData.activeOrganizations}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100">Events by Category</h2>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={reportData.byCategory}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                stroke="#6b7280"
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f3f4f6',
                }}
                formatter={(value) => [`${value} events`, 'Count']}
              />
              <Legend wrapperStyle={{ color: '#9ca3af' }} />
              <Bar dataKey="value" fill="#3b82f6" name="Events" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Recent Activity Log</h2>
          <input
            type="text"
            placeholder="Search events or organizations..."
            value={searchActivity}
            onChange={(e) => setSearchActivity(e.target.value)}
            className="w-full sm:w-64 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {filteredActivity.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            {searchActivity ? 'No matching activities found.' : 'No recent activities.'}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-900/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Event / Proposal</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Organization</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredActivity.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{item.date}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.event}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{item.org}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Approved'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                            : item.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
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

      {/* Export Button */}
      <div className="mt-8">
        <button
          onClick={() => alert('Export to PDF/CSV feature coming soon!')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition"
        >
          Export Report (PDF / CSV)
        </button>
      </div>
    </div>
  );
};

export default Reports;