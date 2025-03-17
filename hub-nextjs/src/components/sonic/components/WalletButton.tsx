"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { WalletModal } from "./WalletModal";

export function WalletButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { publicKey, disconnect } = useWallet();

  if (publicKey) {
    return (
      <button
        onClick={() => disconnect()}
        className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-md hover:from-cyan-500 hover:to-purple-500 transition-all font-mono border border-cyan-400/20 shadow-lg shadow-cyan-500/20 flex items-center gap-2"
      >
        <span className="border-white/20 pl-2 text-center w-full">
          Disconnect
        </span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-md hover:from-cyan-500 hover:to-purple-500 transition-all font-mono border border-cyan-400/20 shadow-lg shadow-cyan-500/20"
      >
        Connect External Wallet
      </button>
      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
