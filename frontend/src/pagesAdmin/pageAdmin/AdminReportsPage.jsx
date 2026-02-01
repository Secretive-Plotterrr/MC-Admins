// src/pagesAdmin/pageAdmin/AdminReports.jsx
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock system-wide data (replace with real API later)
const mockAdminReportData = {
  totalEvents: 156,
  totalApproved: 112,
  totalPending: 18,
  totalDeclined: 26,
  upcomingEvents: 22,
  totalOrganizations: 38,
  totalUsers: 1245,
  totalAnnouncements: 89,
  eventsByCategory: [
    { name: 'Cultural', value: 42 },
    { name: 'Academic', value: 35 },
    { name: 'Sports', value: 28 },
    { name: 'Seminar', value: 19 },
    { name: 'Others', value: 32 },
  ],
  eventsByOrganization: [
    { name: 'Student Council', value: 18 },
    { name: 'IT Society', value: 14 },
    { name: 'Sports Council', value: 12 },
    { name: 'Performing Arts', value: 11 },
    { name: 'Literature Soc', value: 9 },
    { name: 'Others', value: 92 },
  ],
  approvalRate: [
    { month: 'Oct', approved: 8, pending: 4, declined: 2 },
    { month: 'Nov', approved: 11, pending: 3, declined: 1 },
    { month: 'Dec', approved: 9, pending: 5, declined: 3 },
    { month: 'Jan', approved: 14, pending: 6, declined: 4 },
  ],
  recentEvents: [
    { date: 'Jan 28, 2026', title: 'Cultural Night', org: 'Performing Arts Club', status: 'Approved' },
    { date: 'Jan 25, 2026', title: 'AI in Education Seminar', org: 'IT Society', status: 'Approved' },
    { date: 'Jan 20, 2026', title: 'Intramurals Finals', org: 'Sports Council', status: 'Completed' },
  ],
  recentAnnouncements: [
    { date: 'Jan 29, 2026', title: 'Thesis Deadline Extended', postedBy: 'Research Office', urgent: true },
    { date: 'Jan 27, 2026', title: 'Club Fair Postponed', postedBy: 'Student Affairs', urgent: false },
    { date: 'Jan 25, 2026', title: 'Foundation Week Schedule', postedBy: 'Admin', urgent: false },
  ],
  proposalHistory: [
    { date: 'Jan 28, 2026', title: 'Cultural Night 2026', org: 'Performing Arts', action: 'Approved', by: 'Super Admin' },
    { date: 'Jan 26, 2026', title: 'AI Seminar', org: 'IT Society', action: 'Approved', by: 'Super Admin' },
    { date: 'Jan 24, 2026', title: 'Poetry Reading', org: 'Lit Society', action: 'Declined', by: 'Super Admin', reason: 'Scheduling conflict' },
  ],
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const AdminReports = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState('January');
  const [yearFilter, setYearFilter] = useState('2026');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setReportData(mockAdminReportData);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading system reports...</p>
        </div>
      </div>
    );
  }

  if (!reportData) return null;

  // Filter activity / history
  const filterItems = (items) =>
    items.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.org?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.action?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Header + Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            System Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Comprehensive overview • {monthFilter} {yearFilter}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[2024, 2025, 2026, 2027].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-10">
        {[
          { title: 'Total Events', value: reportData.totalEvents, color: 'blue-600' },
          { title: 'Approved', value: reportData.totalApproved, color: 'green-600' },
          { title: 'Pending', value: reportData.totalPending, color: 'yellow-600' },
          { title: 'Declined', value: reportData.totalDeclined, color: 'red-600' },
          { title: 'Upcoming', value: reportData.upcomingEvents, color: 'purple-600' },
          { title: 'Active Orgs', value: reportData.totalOrganizations, color: 'indigo-600' },
          { title: 'Total Users', value: reportData.totalUsers, color: 'pink-600' },
          { title: 'Announcements', value: reportData.totalAnnouncements, color: 'cyan-600' },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-sm lg:text-base font-medium text-gray-600 dark:text-gray-400">
              {item.title}
            </h3>
            <p className={`text-2xl lg:text-3xl font-bold mt-2 text-${item.color}`}>
              {item.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10">
        {/* Events by Category */}
        <div className="bg-white dark:bg-gray-800 p-5 lg:p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">Events by Category</h2>
          <div className="h-72 lg:h-80">
            <ResponsiveContainer>
              <BarChart data={reportData.eventsByCategory} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" name="Events" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Events by Organization (Top 10) */}
        <div className="bg-white dark:bg-gray-800 p-5 lg:p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">Top Organizations by Events</h2>
          <div className="h-72 lg:h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={reportData.eventsByOrganization}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {reportData.eventsByOrganization.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10">
        {/* Recent Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <div className="p-5 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Events</h2>
          </div>
          <div className="p-5 lg:p-6 max-h-96 overflow-y-auto">
            {reportData.recentEvents.map((item, i) => (
              <div key={i} className="py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.org}</p>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <div className="p-5 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Announcements</h2>
          </div>
          <div className="p-5 lg:p-6 max-h-96 overflow-y-auto">
            {reportData.recentAnnouncements.map((item, i) => (
              <div key={i} className="py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {item.title}
                      {item.urgent && (
                        <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 px-2 py-0.5 rounded-full">
                          Urgent
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Posted by {item.postedBy}</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proposal Approval History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden mb-10">
        <div className="p-5 lg:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Proposal Approval History</h2>
          <input
            type="text"
            placeholder="Search proposals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Proposal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filterItems(reportData.proposalHistory).map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{item.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.org}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        item.action === 'Approved'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                      }`}
                    >
                      {item.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.by}</td>
                </tr>
              ))}
              {filterItems(reportData.proposalHistory).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Section */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => alert('Export to PDF – coming soon')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export PDF
        </button>

        <button
          onClick={() => alert('Export to CSV – coming soon')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-sm flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default AdminReports;