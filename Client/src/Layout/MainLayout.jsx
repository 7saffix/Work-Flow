import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar  */}
      <TopBar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      {/* Content Below Top bar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`transition-all duration-500 ${
            isSidebarOpen ? "translate-x-0 w-60" : "-translate-x-96 w-0"
          } `}
        >
          <Sidebar />
        </div>

        {/* Main Page */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
