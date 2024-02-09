"use client";

import { ModeToggle } from "@/components/theme/themeToggle.";
import SideNav from "@/components/shared/SideNav";
import { useAuth } from "@/components/shared/hooks/useAuth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/slices/authSlice";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { RootState } from "@/store/store";
import Loading from "@/components/shared/Loading";

const AuithLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // loading state

  const [loading, setLoading] = useState(true);

  // router

  const Router = useRouter();

  // get pathname

  const pathname = usePathname();

  // declare dispatch

  const dispatch = useDispatch();

  // get the open state

  const open = useSelector((state: RootState) => state.nav.open);

  // check if Logged In

  const checkIfLoggedIn = async () => {
    const vaild: User = await useAuth();

    if (vaild.verified) {
      setLoading(false);
      return dispatch(
        setUser({ email: vaild.email, userName: vaild.userName })
      );
    } else {
      return Router.replace("/");
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, [pathname]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="h-screen fixed">
        <SideNav />
      </div>
      <div
        className={`${
          open ? "ml-72" : "ml-20"
        } duration-300 text-2xl flex-1 h-screen`}
      >
        <ModeToggle />
        {children}
      </div>
    </>
  );
};

export default AuithLayout;
