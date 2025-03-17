"use client";
import { useSolWallet } from "@/components/providers/SolanaWalletProvider";
import WalletInitialize from "@/components/wallet/WalletInitialize";
import EmbedWalletConnected from "@/components/wallet/EmbedWalletConnected";
import { useWallet } from "@solana/wallet-adapter-react";
import ExternalWalletConnected from "@/components/wallet/ExternalWalletConnected";
export default function Wallet() {
  const { isInitialized } = useSolWallet();
  const { connected } = useWallet();

  if (connected) {
    return <ExternalWalletConnected />;
  }

  if (!isInitialized) {
    return <WalletInitialize />;
  }

  return <EmbedWalletConnected />;
}
