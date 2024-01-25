import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineLibraryBooks,
  MdAccountBalance,
  MdOutlineBugReport,
  MdSearch,
  MdOutlineSettings,
} from "react-icons/md";

export const SideNavData = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: <LuLayoutDashboard />,
  },
  {
    title: "Comics",
    link: "/comics",
    icon: <MdOutlineLibraryBooks />,
  },
  {
    title: "Accounts",
    link: "/accounts",
    icon: <MdAccountBalance />,
    gap: true,
  },
  {
    title: "Reports",
    link: "/reports",
    icon: <MdOutlineBugReport />,
  },
  {
    title: "Search",
    link: "/search",
    icon: <MdSearch />,
  },
  {
    title: "Settings",
    link: "/settings",
    icon: <MdOutlineSettings />,
    gap: true,
  },
];
