import { TelegramAuthData } from "@telegram-auth/react";

export const getJwtToken = () => {
  return localStorage.getItem("jwt_token");
};

export const setJwtToken = (token: string) => {
  localStorage.setItem("jwt_token", token);
};

export const setUser = (user: TelegramAuthData) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): TelegramAuthData | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getPvKey = (): string | null => {
  return localStorage.getItem("pv_key");
};
