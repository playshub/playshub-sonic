import axios from "axios";
import api from "../axios";
import { HUB_BLOCKCHAIN_SERVICE_URL } from "@/utils/constants";

export const connectWallet = (walletAddress: string) =>
  api.post("/account/connect_wallet", {
    wallet_type: "SOL",
    wallet_address: walletAddress,
  });

export const getWallet = async (): Promise<string | null> => {
  const response = await api.post("/account/get_wallet", {
    wallet_type: "SOL",
  });
  return response.data.wallet;
};

export const deleteWallet = () =>
  api.post("/account/delete_wallet", {
    wallet_type: "SOL",
  });

export const onboardNewUser = (signedTransactionRaw: string) =>
  axios.post(`${HUB_BLOCKCHAIN_SERVICE_URL}/new-user`, {
    signedTransactionRaw,
  });
