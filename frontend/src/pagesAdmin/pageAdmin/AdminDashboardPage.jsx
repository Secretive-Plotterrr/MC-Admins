// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DashboardPage() {
  // Mock data – focused on events, proposals, announcements
  // Expanded with full events array for modal details (including next month for demo)
  const dashboardData = {
    totalEvents: 42,
    upcomingEventsCount: 7,
    pendingProposals: 5,
    approvedThisMonth: 12,
    recentAnnouncements: [
      {
        title: "College Foundation Week Schedule Released",
        date: "2026-01-28",
        postedBy: "Student Affairs Office",
        urgent: true,
      },
      {
        title: "Club Fair – February 12 @ Gymnasium",
        date: "2026-01-27",
        postedBy: "SC President",
        urgent: false,
      },
      {
        title: "Thesis Proposal Deadline Extended",
        date: "2026-01-25",
        postedBy: "Research Coordinator",
        urgent: true,
      },
      {
        title: "Reminder: Submit Event Proposals by Feb 5",
        date: "2026-01-24",
        postedBy: "Admin",
        urgent: false,
      },
    ],
    pendingRequests: [
      {
        id: 101,
        title: "Cultural Night 2026",
        org: "Performing Arts Club",
        submittedBy: "Juan Dela Cruz",
        submittedDate: "2026-01-27",
        status: "Pending",
      },
      {
        id: 102,
        title: "Seminar on AI in Education",
        org: "IT Society",
        submittedBy: "Maria Santos",
        submittedDate: "2026-01-26",
        status: "Pending",
      },
      {
        id: 103,
        title: "Intramurals Basketball Tournament",
        org: "Sports Council",
        submittedBy: "Pedro Reyes",
        submittedDate: "2026-01-25",
        status: "Pending",
      },
    ],
    events: [
      // Current month (January 2026)
      { id: 1, title: "Workshop on Public Speaking", fullDate: new Date(2026, 0, 3), time: "10:00 AM - 12:00 PM", org: "Debate Club", location: "Auditorium", description: "Improve your communication skills." },
      { id: 2, title: "Coding Bootcamp Session 1", fullDate: new Date(2026, 0, 8), time: "2:00 PM - 5:00 PM", org: "IT Society", location: "Computer Lab", description: "Intro to programming." },
      { id: 3, title: "Art Exhibition Opening", fullDate: new Date(2026, 0, 12), time: "9:00 AM - 4:00 PM", org: "Arts Club", location: "Gallery Hall", description: "Student artworks on display." },
      { id: 4, title: "Sports Day Practice", fullDate: new Date(2026, 0, 15), time: "4:00 PM - 6:00 PM", org: "Sports Council", location: "Field", description: "Prepare for intramurals." },
      { id: 5, title: "Seminar on Mental Health", fullDate: new Date(2026, 0, 18), time: "1:00 PM - 3:00 PM", org: "Guidance Office", location: "Conference Room", description: "Awareness and tips." },
      { id: 6, title: "Book Club Meeting", fullDate: new Date(2026, 0, 22), time: "3:00 PM - 5:00 PM", org: "Literature Society", location: "Library", description: "Discuss latest reads." },
      { id: 7, title: "Cultural Dance Rehearsal", fullDate: new Date(2026, 0, 28), time: "5:00 PM - 7:00 PM", org: "Performing Arts Club", location: "Gym", description: "Practice for festival." },
      // Next month (February 2026) - for demo
      { id: 8, title: "Valentine's Day Event", fullDate: new Date(2026, 1, 14), time: "6:00 PM - 9:00 PM", org: "Student Council", location: "Campus Grounds", description: "Fun activities and music." },
      { id: 9, title: "Career Fair", fullDate: new Date(2026, 1, 20), time: "9:00 AM - 3:00 PM", org: "Career Services", location: "Multi-Purpose Hall", description: "Meet employers." },
    ],
  };

  const d = dashboardData;

  // ── Events by Category Chart ───────────────────────────────────────────────
  const eventsByCategoryData = {
    labels: ['Cultural', 'Academic', 'Sports', 'Seminar', 'Others'],
    datasets: [
      {
        label: "Events This Month",
        data: [5, 4, 3, 2, 3],
        backgroundColor: "rgba(59, 130, 246, 0.75)",   // Light blue / blue-500 with opacity
        borderColor: "rgba(37, 99, 235, 0.9)",         // Slightly darker blue border
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const eventsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: 'Events by Category - January 2026',
        font: { size: 16 },
        padding: { top: 10, bottom: 20 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { color: '#4b5563' },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#4b5563' },
      },
    },
  };

  // Calendar state
  const currentDate = new Date();
  const [viewedYear, setViewedYear] = useState(currentDate.getFullYear());
  const [viewedMonth, setViewedMonth] = useState(currentDate.getMonth());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Calendar logic
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const firstDay = new Date(viewedYear, viewedMonth, 1).getDay();
  const daysInMonth = new Date(viewedYear, viewedMonth + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ empty: true });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(viewedYear, viewedMonth, day);
    const hasEvent = d.events.some(e => e.fullDate.toDateString() === dayDate.toDateString());
    calendarDays.push({ day, hasEvent, fullDate: dayDate });
  }

  // Handle month navigation
  const handlePrevMonth = () => {
    let newMonth = viewedMonth - 1;
    let newYear = viewedYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setViewedMonth(newMonth);
    setViewedYear(newYear);
  };

  const handleNextMonth = () => {
    let newMonth = viewedMonth + 1;
    let newYear = viewedYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setViewedMonth(newMonth);
    setViewedYear(newYear);
  };

  // Handle day click
  const handleDayClick = (slot) => {
    if (slot.hasEvent) {
      const dayEvents = d.events.filter(e => e.fullDate.toDateString() === slot.fullDate.toDateString());
      setSelectedEvents(dayEvents);
      setModalOpen(true);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Event & Activity Overview • {currentDate.toLocaleDateString("en-PH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Events"
          value={d.totalEvents.toLocaleString("en-PH")}
          subtitle="All registered activities"
          iconColor="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />

        <StatCard
          title="Upcoming Events"
          value={d.upcomingEventsCount}
          subtitle="Next 7 days"
          iconColor="amber"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />

        <StatCard
          title="Pending Proposals"
          value={d.pendingProposals}
          subtitle="Awaiting super admin approval"
          iconColor="yellow"
          valueColor="text-yellow-600 dark:text-yellow-400"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatCard
          title="Approved This Month"
          value={d.approvedThisMonth}
          subtitle="Events green-lit in Jan"
          iconColor="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Charts & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Events by Category" subtitle="January 2026">
          <div className="h-80">
            <Bar data={eventsByCategoryData} options={eventsOptions} />
          </div>
        </ChartCard>

        <ChartCard title={`${monthNames[viewedMonth]} ${viewedYear}'s Calendar`} subtitle="Event indicators (dots)">
          <div className="flex justify-between mb-4">
            <button onClick={handlePrevMonth} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              &lt; Prev Month
            </button>
            <button onClick={handleNextMonth} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              Next Month &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((wd) => (
              <div key={wd} className="font-medium text-gray-500 dark:text-gray-400 py-2">
                {wd}
              </div>
            ))}

            {calendarDays.map((slot, idx) => (
              <div
                key={idx}
                onClick={() => !slot.empty && handleDayClick(slot)}
                className={`p-2 rounded-lg min-h-[60px] flex flex-col items-center justify-center border ${
                  slot.empty
                    ? 'border-transparent'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                } ${slot.hasEvent ? 'relative' : ''}`}
              >
                {slot.day && (
                  <>
                    <span className="font-medium">{slot.day}</span>
                    {slot.hasEvent && (
                      <div className="mt-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Announcements */}
        <TableCard title="Recent Announcements" subtitle="Latest posted notices">
          {d.recentAnnouncements.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Posted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {d.recentAnnouncements.map((ann, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {ann.title}
                      {ann.urgent && (
                        <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
                          Urgent
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(ann.date).toLocaleDateString("en-PH")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {ann.postedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">No recent announcements</div>
          )}
        </TableCard>

        {/* Pending Approval Requests */}
        <TableCard title="Pending Approval Requests" subtitle="Proposals awaiting super admin review">
          {d.pendingRequests.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Event Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Organization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {d.pendingRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{req.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{req.org}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(req.submittedDate).toLocaleDateString("en-PH")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg font-medium">No pending requests ✓</p>
            </div>
          )}
        </TableCard>
      </div>

      {/* Event Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Events on {selectedEvents[0]?.fullDate.toLocaleDateString("en-PH")}</h2>
            <div className="space-y-4">
              {selectedEvents.map((event) => (
                <div key={event.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Time: {event.time}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Organization: {event.org}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Location: {event.location}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
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

// ── Reusable Components ───────────────────────────────────────────────────────
function StatCard({ title, value, subtitle, icon, iconColor = "blue", valueColor = "" }) {
  const colorMap = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
    amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[iconColor] || colorMap.blue}`}>
          {icon}
        </div>
      </div>
      <p className={`text-3xl font-bold ${valueColor || "text-gray-900 dark:text-white"}`}>{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{subtitle}</p>
      {children}
    </div>
  );
}

function TableCard({ title, subtitle, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

export default DashboardPage;