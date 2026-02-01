// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ── Regular Admin ───────────────────────────────────────────────
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import AnnouncementsPage from './pages/Announcements';
import EventsPage from './pages/Events';
import ProposalsPage from './pages/Proposal';
import OrganizationsPage from './pages/Organization';
import ReportsPage from './pages/Reports';
import SettingsPage from './pages/SettingsPage';

// ── Super Admin ─────────────────────────────────────────────────
import LayoutAdmin from './pagesAdmin/componentsAdmin/LayoutAdmin';
import AdminDashboardPage from './pagesAdmin/pageAdmin/AdminDashboardPage';
import AdminEventsPage from './pagesAdmin/pageAdmin/AdminEventsPage';
import AdminProposalsPage from './pagesAdmin/pageAdmin/AdminProposalsPage';
import AdminReportsPage from './pagesAdmin/pageAdmin/AdminReportsPage';
import AdminSettingsPage from './pagesAdmin/pageAdmin/AdminSettingsPage';
import AdminAnnouncementsPage from './pagesAdmin/pageAdmin/AdminAnnouncementsPage';
import AdminAccountsPage from './pagesAdmin/pageAdmin/AdminAccountsPage';     // ← NEW

// ── Auth Pages (no layout) ──────────────────────────────────────
import LoginPage from './auth/LoginPage';
import SignupPage from './auth/SignupPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';

function App() {
  return (
    <Router>
      <Routes>

        {/* Root → redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ── Public / Authentication routes (no layout) ── */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* ── Regular Admin Routes ──────────────────────────────── */}
        <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
        <Route path="/announcements" element={<Layout><AnnouncementsPage /></Layout>} />
        <Route path="/events" element={<Layout><EventsPage /></Layout>} />
        <Route path="/proposals" element={<Layout><ProposalsPage /></Layout>} />
        <Route path="/organizations" element={<Layout><OrganizationsPage /></Layout>} />
        <Route path="/reports" element={<Layout><ReportsPage /></Layout>} />
        <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />

        {/* ── Super Admin Routes (using LayoutAdmin with SidebarAdmin) ── */}
        <Route path="/admin/dashboard" element={<LayoutAdmin><AdminDashboardPage /></LayoutAdmin>} />
        <Route path="/admin/announcements" element={<LayoutAdmin><AdminAnnouncementsPage /></LayoutAdmin>} />
        <Route path="/admin/events" element={<LayoutAdmin><AdminEventsPage /></LayoutAdmin>} />
        <Route path="/admin/proposals" element={<LayoutAdmin><AdminProposalsPage /></LayoutAdmin>} />
        <Route path="/admin/reports" element={<LayoutAdmin><AdminReportsPage /></LayoutAdmin>} />
        <Route path="/admin/settings" element={<LayoutAdmin><AdminSettingsPage /></LayoutAdmin>} />
        <Route path="/admin/accounts" element={<LayoutAdmin><AdminAccountsPage /></LayoutAdmin>} />  {/* ← NEW */}

        {/* Catch-all – redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;