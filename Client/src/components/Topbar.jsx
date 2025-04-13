import React, { useState } from "react";
import { AlignLeft, CircleArrowOutUpRight, CircleUser } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const TopBar = ({ toggleSidebar }) => {
  const [hover, setHover] = useState(false);
  const { logout } = useAuthStore();
  let navigate = useNavigate();

  const handleLogOut = async () => {
    await logout();
    navigate("/signin");
  };

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex justify-between p-4 shadow-md relative">
      <div
        onClick={toggleSidebar}
        className="flex items-center gap-1 text-purple-700"
      >
        <AlignLeft />
        <h1 className="font-medium text-xl">Work-Flow</h1>
      </div>
      <div className="flex items-center gap-1 text-purple-700">
        <h1 className="text-sm">Hello {user.username}</h1>
        <div className="relative" onClick={() => setHover((prev) => !prev)}>
          <CircleUser size={32} className="cursor-pointer" />

          {/* dropdown */}
          <div
            className={`transition-all duration-500 ${
              hover ? "translate-y-0" : "-translate-y-96"
            } `}
          >
            <div className="absolute top-10 right-0 w-60 rounded shadow-md p-4 ">
              <div className="flex flex-col space-y-2">
                <h1 className="font-semibold p-1">{user.fullName}</h1>
                <Link
                  to="/profile"
                  className="p-1 hover:bg-purple-500 hover:text-white rounded"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogOut}
                  className="text-red-600 text-left hover:bg-red-500 hover:text-white p-1 rounded flex items-center gap-2 "
                >
                  <CircleArrowOutUpRight size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
