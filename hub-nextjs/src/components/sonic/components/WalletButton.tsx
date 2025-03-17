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
        className="px-6 py-3 bg-[#53ADE3] text-white rounded-md transition-all text-base hover:cursor-pointer"
      >
        Disconnect
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-[#53ADE3] text-white rounded-md transition-all text-base hover:cursor-pointer"
      >
        Connect External Wallet
      </button>
      <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
