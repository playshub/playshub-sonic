import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Root } from "@/components/Root/Root";
import { I18nProvider } from "@/core/i18n/provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../styles/globals.css";
import "../styles/overrides.css";
import { regularFont } from "@/styles/fonts/font";
import { QueryClient } from "@tanstack/react-query";
import { RootProviders } from "@/components/providers/RootProviders";

export const metadata: Metadata = {
  title: "PLAYS Hub",
  description:
    "Build the web3 game publication and cross promotion platform, leverages blockchain technology and decentralized systems to offer new monetization opportunities for developers, advertisers, and players.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={regularFont.className}>
        <I18nProvider>
          <Root>
            <RootProviders>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: 450,
                  margin: "0 auto",
                }}
              >
                {children}
              </div>
            </RootProviders>
          </Root>
        </I18nProvider>
      </body>
      <GoogleAnalytics gaId="G-B02EDD3XF2" />
    </html>
  );
}
