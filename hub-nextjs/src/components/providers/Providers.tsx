"use client";

import { ConfigProvider } from "antd";
import NotificationProvider from "@/components/providers/NotificationProvider";
import { PropsWithChildren } from "react";
import { SolWalletProvider } from "./SolanaWalletProvider";
import { SOLANA_RPC_URL } from "@/utils/constants";
import CreateWalletTutorialProvider from "./CreateWalletTutorialProvider";
import ImportWalletTutorialProvider from "./ImportWalletTutorialProvider";
import LetAirdropTutorialProvider from "./LetAirdropTutorialProvider";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { ToastProvider } from "./ToastProvider";
import { NetworkProvider } from "../sonic/contexts/NetworkContext";
import { WalletProvider } from "../sonic/components/WalletProvider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <TonConnectUIProvider manifestUrl="https://playshub.io/tonconnect-manifest.json">
      <NotificationProvider>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "myriadpro-regular",
            },
          }}
        >
          <SolWalletProvider rpcUrl={SOLANA_RPC_URL}>
            <ImportWalletTutorialProvider>
              <CreateWalletTutorialProvider>
                <LetAirdropTutorialProvider>
                  <NetworkProvider>
                    <WalletProvider>
                      <ToastProvider />
                      {children}
                    </WalletProvider>
                  </NetworkProvider>
                </LetAirdropTutorialProvider>
              </CreateWalletTutorialProvider>
            </ImportWalletTutorialProvider>
          </SolWalletProvider>
        </ConfigProvider>
      </NotificationProvider>
    </TonConnectUIProvider>
  );
}
