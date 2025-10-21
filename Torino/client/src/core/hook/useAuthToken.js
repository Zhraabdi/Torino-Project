"use client";
import { getCookie } from "../utils/cookie";

export default function useAuthToken() {
  const token = getCookie("accessToken");
  const hasToken = Boolean(token);
  return { token, hasToken };
}
