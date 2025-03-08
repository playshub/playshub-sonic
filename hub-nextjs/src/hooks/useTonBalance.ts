import {
  Address,
  TonClient,
  WalletContractV4,
  fromNano,
  internal,
} from "@ton/ton";
import { useTonAddress } from "@tonconnect/ui-react";
import { useEffect, useMemo, useState } from "react";

export default function useTonBalance() {
  const [balance, setBalance] = useState(BigInt(0));
  const address = useTonAddress();

  const client = useMemo(
    () =>
      new TonClient({
        endpoint: "https://toncenter.com/api/v2/jsonRPC",
      }),
    []
  );

  useEffect(() => {
    (async () => {
      if (!address) {
        setBalance(BigInt(0));
        return;
      }
      setBalance(await client.getBalance(Address.parse(address)));
    })();
  }, [address, client]);

  return fromNano(balance);
}
