import { PublicKey } from "@solana/web3.js";

export const formatAddress = (address: string) => {
  if (!address) {
    return "";
  }
  if (address?.length < 10) {
    return address;
  }
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

export const isSolanaWallet = (
  address?: string | null | undefined
): boolean => {
  if (!address) {
    return false;
  }

  try {
    // Attempt to create a PublicKey instance; if it fails, it's invalid
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
};
