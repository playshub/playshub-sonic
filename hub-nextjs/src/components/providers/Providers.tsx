"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import NotificationProvider from "@/components/providers/NotificationProvider";
import { PropsWithChildren } from "react";
import { SolWalletProvider } from "./SolanaWalletProvider";
import { SOLANA_RPC_URL } from "@/utils/constants";
import CreateWalletTutorialProvider from "./CreateWalletTutorialProvider";
import ImportWalletTutorialProvider from "./ImportWalletTutorialProvider";
import LetAirdropTutorialProvider from "./LetAirdropTutorialProvider";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
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
                    {children}
                  </LetAirdropTutorialProvider>
                </CreateWalletTutorialProvider>
              </ImportWalletTutorialProvider>
            </SolWalletProvider>
          </ConfigProvider>
        </NotificationProvider>
      </TonConnectUIProvider>
    </QueryClientProvider>
  );
}
