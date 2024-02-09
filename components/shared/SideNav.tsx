"use client";

import Image from "next/image";
import Link from "next/link";
import { RiLogoutBoxLine } from "react-icons/ri";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { SideNavData } from "../helper/SideNavData";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "@/slices/navSlice";
import { RootState } from "@/store/store";

const SideNav = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const open = useSelector((state: RootState) => state.nav.open);

  const handleToggle = () => {
    return dispatch(setOpen());
  };

  const handleLogout = () => {
    Cookies.remove("ds-admin-auth");
    router.push("/");
  };

  return (
    <div
      className={`${
        open ? "w-72 pt-8" : "w-20"
      } h-screen font-sans dark:bg-slate-950 duration-300 p-5 bg-slate-200 relative`}
    >
      <Image
        src="/assets/control.png"
        alt="Control to shrink or open it"
        width={35}
        height={35}
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-[#d1cece] dark:border-[#525252] rounded-full ${
          !open && "rotate-180"
        }`}
        onClick={handleToggle}
      />

      <div className="flex items-center gap-x-4">
        <Image
          src="/assets/app_logo.png"
          alt="Disaster Scans logo"
          width={40}
          height={40}
          className={`cursor-pointer duration-500 w-auto ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`origin-left font-semibold text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Disaster <span className="text-yellow-500">Scans</span>
        </h1>
      </div>

      <div className="flex flex-col justify-between h-full pb-10">
        <div>
          <ul className="pt-6">
            {SideNavData.map((navItem, index) => (
              <Link href={navItem.link} key={index}>
                <li
                  className={`flex rounded-md p-2 cursor-pointer dark:hover:bg-lime-100 dark:hover:text-black hover:bg-slate-500 hover:text-white text-lg items-center gap-x-4 ${
                    navItem.gap ? "mt-9" : "mt-2"
                  } ${index === 0 && "bg-light-white"}`}
                >
                  {navItem.icon}{" "}
                  <span
                    className={`${
                      !open && "hidden"
                    } origin-left duration-200 font-semibold`}
                  >
                    {navItem.title}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <button
          className="flex rounded-md p-2 cursor-pointer dark:hover:bg-lime-100 dark:hover:text-black hover:bg-slate-500 hover:text-white text-lg items-center gap-x-4"
          onClick={handleLogout}
        >
          <RiLogoutBoxLine />{" "}
          <span
            className={`${
              !open && "hidden"
            } origin-left duration-200 font-semibold`}
          >
            Log Out
          </span>
        </button>
      </div>
    </div>
  );
};

export default SideNav;
