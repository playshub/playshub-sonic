import { getWallet } from "@/apis/account/wallet";
import { useQuery } from "@tanstack/react-query";

export default function useApiWallet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
  });
}
