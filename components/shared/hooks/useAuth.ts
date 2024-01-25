"use client";

import { Axios } from "@/utils/AxiosConfig";
import Cookies from "js-cookie";

export const useAuth = async () => {
  // useDispatch

  // get token from cookies
  const token = Cookies.get("ds-admin-auth");

  const headers = {
    "disaster-admin-token": token,
  };

  // try catch block

  try {
    const isAuth = await Axios.get("/admin/token", {
      headers,
    });

    const data = await isAuth.data;

    return data;
  } catch (error) {
    return { verified: false };
  }
};
