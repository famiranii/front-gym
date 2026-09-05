"use client";

import { useAppDispatch } from "@/store/hook";
import { GetMeApi } from "@/store/slices/getMeSlice";
import { useEffect } from "react";

export default function GetMe() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getMe = async () => {
      await dispatch(GetMeApi());
    };
    getMe();
  }, []);
  return <></>;
}
