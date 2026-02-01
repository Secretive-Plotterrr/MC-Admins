// src/pagesAdmin/componentsAdmin/LayoutAdmin.jsx
import React, { useState } from 'react';
import SidebarAdmin from './SidebarAdmin';
import HeaderAdmin from './HeaderAdmin';

function LayoutAdmin({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // closed by default on mobile

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <SidebarAdmin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64 transition-all duration-300">
        <HeaderAdmin toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-0">
          {children}
        </main>
      </div>

      {/* Mobile overlay to close sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

export default LayoutAdmin;