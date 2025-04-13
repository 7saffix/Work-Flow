import {
  ChartNoAxesCombined,
  CircleX,
  FolderKanban,
  Newspaper,
  ShieldCheck,
  SquarePen,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarItem = [
    { title: "Dashboard", icon: <FolderKanban />, path: "/" },
    { title: "Create New", icon: <SquarePen />, path: "/create" },
    { title: "New Task", icon: <Newspaper />, path: "/all-new" },
    { title: "In Progress", icon: <ChartNoAxesCombined />, path: "/progress" },
    { title: "Completed", icon: <ShieldCheck />, path: "/completed" },
    { title: "Canceled", icon: <CircleX />, path: "/canceled" },
  ];

  return (
    <div className="space-y-3 mt-4">
      {sidebarItem.map((item, i) => (
        <NavLink
          to={item.path}
          key={i}
          className={({ isActive }) =>
            `${isActive ? "bg-amber-100" : "hover:bg-amber-100"} flex p-3 gap-2`
          }
        >
          <p>{item.icon}</p>
          <h1>{item.title}</h1>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
