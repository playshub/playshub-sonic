import { TelegramAuthData } from "@telegram-auth/react";
import { setJwtToken } from "../../utils/storage";
import api from "../axios";

export const login = async (data: TelegramAuthData) => {
  const response = await api.post("/account/login_with_telegram", {
    validate_data: data,
  });
  const token = response.data.access_token;
  setJwtToken(token);
  return token;
};
