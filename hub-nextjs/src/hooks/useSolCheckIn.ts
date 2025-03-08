import { useSolWallet } from "@/components/providers/SolanaWalletProvider";
import {
  SOL_CHECKED_IN_ADDRESS,
  SOL_CHECKED_IN_AMOUNT,
} from "@/utils/constants";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/apis/account/profile";

export default function useSolCheckIn() {
  const { transferSol } = useSolWallet();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const checkIn = async () => {
    try {
      setLoading(true);
      setSuccess(false);
      await transferSol(
        SOL_CHECKED_IN_ADDRESS,
        parseFloat(SOL_CHECKED_IN_AMOUNT),
        JSON.stringify({
          type: "Check In",
          userId: profileData?.account?.accountId,
        })
      );
      await new Promise((resolve) => setTimeout(resolve, 10000));
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
      throw error;
    }
  };

  return { checkIn, loading, success };
}
