"use client";

import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef } from "react";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { select, wallets } = useWallet();
  const modalRef = useRef<HTMLDivElement>(null);

  const supportedWalletNames = ["Backpack", "Nightly"];
  const filteredWallets = wallets.filter(
    (wallet) =>
      supportedWalletNames.includes(wallet.adapter.name) &&
      wallet.readyState === WalletReadyState.Installed
  );

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close modal with ESC key
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white border border-gray-200 rounded-lg p-6 w-full max-w-md shadow-lg text-black"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl">Connect Wallet</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {filteredWallets.length > 0 ? (
          <div className="space-y-4">
            {filteredWallets.map((wallet) => (
              <button
                key={wallet.adapter.name}
                onClick={() => {
                  select(wallet.adapter.name);
                  onClose();
                }}
                className="w-full py-3 px-4 from-cyan-600 to-purple-600 text-white rounded-md  transition-all  flex items-center gap-3 px-6 py-3 bg-[#53ADE3] text-white rounded-md transition-all text-base hover:cursor-pointer"
              >
                <img
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  className="w-6 h-6"
                />
                Connect with {wallet.adapter.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4">No supported wallets found</p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  window.open("https://www.backpack.app/", "_blank");
                }}
                className="w-full py-3 px-4 from-cyan-600 to-purple-600 text-white rounded-md  transition-all  flex items-center gap-3 px-6 py-3 bg-[#53ADE3] text-white rounded-md transition-all text-base hover:cursor-pointer"
              >
                Install Backpack
              </button>
              <button
                onClick={() => {
                  window.open("https://nightly.app/", "_blank");
                }}
                className="w-full py-3 px-4 from-cyan-600 to-purple-600 text-white rounded-md  transition-all  flex items-center gap-3 px-6 py-3 bg-[#53ADE3] text-white rounded-md transition-all text-base hover:cursor-pointer"
              >
                Install Nightly
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
