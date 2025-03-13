"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import bs58 from "bs58";
import { useMutation } from "@tanstack/react-query";
import {
  connectWallet,
  deleteWallet as deleteWalletApi,
  onboardNewUser as onboardNewUserApi,
} from "@/apis/account/wallet";
import { SOL_CHECKED_IN_ADDRESS } from "@/utils/constants";

export interface SolWallet {
  privateKey: string;
  publicKey: string;
}

export interface SolWalletContextType {
  isInitialized: boolean;
  wallet: SolWallet | null;
  balance: number;
  generateWallet: () => void;
  importWallet: (privateKey: string) => void;
  deleteWallet: () => void;
  transferSol: (to: string, lamports: number, memo?: string) => Promise<void>;
  refetchBalance: () => Promise<void>;
}

const SolWalletContext = createContext<SolWalletContextType>({
  isInitialized: false,
  wallet: null,
  generateWallet: () => {},
  importWallet: () => {},
  deleteWallet: () => {},
  balance: 0,
  transferSol: async (to: string, lamports: number, memo?: string) => {},
  refetchBalance: async () => {},
});

export const SolWalletProvider = ({
  rpcUrl,
  children,
}: PropsWithChildren<{ rpcUrl: string }>) => {
  const connection = useMemo(
    () => new Connection(rpcUrl, "confirmed"),
    [rpcUrl]
  );
  const connectWalletMutation = useMutation({
    mutationFn: (walletAddress: string) => connectWallet(walletAddress),
  });
  const deleteWalletMutation = useMutation({
    mutationFn: () => deleteWalletApi(),
  });
  const onboardNewUserMutation = useMutation({
    mutationFn: (signedTransactionRaw: string) =>
      onboardNewUserApi(signedTransactionRaw),
  });

  const [wallet, setWallet] = useState<SolWallet | null>(null);
  const [balance, setBalance] = useState<number>(0);

  const isInitialized = !!localStorage.getItem("pv_key");

  const generateWallet = () => {
    const keyPair = Keypair.generate();

    const publicKey = keyPair.publicKey.toBase58();
    const privateKey = bs58.encode(keyPair.secretKey);

    localStorage.setItem("pv_key", privateKey);
    setWallet({ publicKey, privateKey });

    connectWalletMutation.mutate(publicKey);
    onboardNewUser(privateKey, publicKey);
  };

  const importWallet = (privateKey: string) => {
    const keyPair = Keypair.fromSecretKey(bs58.decode(privateKey));

    const publicKey = keyPair.publicKey.toBase58();

    localStorage.setItem("pv_key", privateKey);
    setWallet({ publicKey, privateKey });

    connectWalletMutation.mutate(publicKey);
    onboardNewUser(privateKey, publicKey);
  };

  const deleteWallet = () => {
    localStorage.removeItem("pv_key");
    setWallet(null);

    deleteWalletMutation.mutate();
  };

  const transferSol = async (to: string, sol: number, memo?: string) => {
    if (!wallet) {
      throw new Error("Wallet is not initialized");
    }

    const keyPair = Keypair.fromSecretKey(bs58.decode(wallet.privateKey));

    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keyPair.publicKey,
        toPubkey: new PublicKey(to),
        lamports: LAMPORTS_PER_SOL * sol,
      })
    );

    if (memo) {
      transferTransaction.add(
        new TransactionInstruction({
          keys: [
            { pubkey: keyPair.publicKey, isSigner: true, isWritable: true },
          ],
          data: Buffer.from(memo, "utf-8"),
          programId: new PublicKey(
            "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
          ),
        })
      );
    }

    await sendAndConfirmTransaction(connection, transferTransaction, [keyPair]);
  };

  const onboardNewUser = async (privateKey: string, publicKey: string) => {
    const keyPair = Keypair.fromSecretKey(bs58.decode(privateKey));

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash("finalized");

    const transaction = new Transaction({
      blockhash,
      lastValidBlockHeight,
      feePayer: new PublicKey(SOL_CHECKED_IN_ADDRESS),
    });

    transaction.add(
      new TransactionInstruction({
        keys: [
          {
            pubkey: new PublicKey(publicKey),
            isSigner: true,
            isWritable: true,
          },
        ],
        data: Buffer.from("Welcome to Playshub", "utf-8"),
        programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      })
    );

    transaction.partialSign(keyPair);

    const signedTransactionRaw = transaction
      .serialize({ requireAllSignatures: false })
      .toString("base64");

    onboardNewUserMutation.mutate(signedTransactionRaw);
  };

  const refetchBalance = async () => {
    if (!wallet?.publicKey) return;

    const publicKey = new PublicKey(wallet?.publicKey!);
    const balance = await connection.getBalance(publicKey);

    setBalance(balance / LAMPORTS_PER_SOL);
  };

  useEffect(() => {
    const privateKey = localStorage.getItem("pv_key");

    if (privateKey) {
      const keyPair = Keypair.fromSecretKey(bs58.decode(privateKey));

      const publicKey = keyPair.publicKey.toBase58();

      localStorage.setItem("pv_key", privateKey);
      setWallet({ publicKey, privateKey });
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!wallet?.publicKey) return;

      const publicKey = new PublicKey(wallet?.publicKey!);
      const balance = await connection.getBalance(publicKey);

      setBalance(balance / LAMPORTS_PER_SOL);
    })();
  }, [wallet?.publicKey, connection]);

  return (
    <SolWalletContext.Provider
      value={{
        wallet,
        isInitialized,
        generateWallet,
        importWallet,
        deleteWallet,
        balance,
        transferSol,
        refetchBalance,
      }}
    >
      {children}
    </SolWalletContext.Provider>
  );
};

export const useSolWallet = () => useContext(SolWalletContext);
