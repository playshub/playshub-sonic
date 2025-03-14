"use client";
import { Layout, Menu } from "antd";
import MenuItem from "../../components/MenuItem/MenuItem";
import PlayIcon from "../../components/MenuItem/PlayIcon";
import EarnIcon from "../../components/MenuItem/EarnIcon";
import RankIcon from "../../components/MenuItem/RankIcon";
import WalletIcon from "../../components/MenuItem/WalletIcon";
import InviteIcon from "../../components/MenuItem/InviteIcon";
import { PropsWithChildren, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { Providers } from "@/components/providers/Providers";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/apis/account/profile";
import Loading from "@/components/spin/Loading";
import { useOpenCatLuckyLink } from "@/hooks/useOpenCatLuckyLink";
import { useOpenCatBattleLink } from "@/hooks/useOpenCatBattleLink";
import { useApp } from "@/components/providers/AppProvider";

const { Content, Footer } = Layout;

export default function Dashboard({ children }: PropsWithChildren) {
  const { link: catLuckyLink } = useOpenCatLuckyLink();
  const { link: catBattleLink } = useOpenCatBattleLink();
  const { app } = useApp();
  const { isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const router = useRouter();
  const pathname = usePathname();

  const activeKey = pathname.split("/")[1] || "play";

  const onSelect = async ({ key }: { key: string }) => {
    switch (key) {
      case "wallet":
        router.push("/wallet");
        break;
      case "play":
        router.push("/");
        break;
      case "earn":
        router.push("/earn");
        break;
      case "rank":
        router.push("/rank");
        break;
      case "invite":
        router.push("/invite");
        break;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (app === "cat-battle") {
    return (
      <iframe
        src={catBattleLink}
        style={{ width: "100%", height: "100vh" }}
      ></iframe>
    );
  }

  if (app === "cat-lucky") {
    return (
      <iframe
        src={catLuckyLink}
        style={{ width: "100%", height: "100vh" }}
      ></iframe>
    );
  }

  return (
    <div>
      <Providers>
        <Layout>
          <Content
            className="scroll-hidden"
            style={{
              padding: "10px 10px",
              minHeight: "100vh",
              paddingBottom: 0,
              maxHeight: "100vh",
              overflow: "scroll",
            }}
          >
            <DashboardContent>{children}</DashboardContent>
            <div style={{ height: 78 }} />
          </Content>
          <Footer
            style={{
              padding: " 0px",
              position: "fixed",
              width: "100%",
              bottom: 0,
              maxWidth: 450,
              margin: "0 auto",
            }}
          >
            <Menu
              disabledOverflow
              onSelect={onSelect}
              style={{ width: "100%" }}
              mode="horizontal"
              items={[
                {
                  key: "wallet",
                  label: (
                    <MenuItem
                      active={activeKey === "wallet"}
                      title="Wallet"
                      icon={<WalletIcon active={activeKey === "wallet"} />}
                    />
                  ),
                },
                {
                  key: "earn",
                  label: (
                    <MenuItem
                      active={activeKey === "earn"}
                      title="Earn"
                      icon={<EarnIcon active={activeKey === "earn"} />}
                    />
                  ),
                },
                {
                  key: "play",
                  label: (
                    <MenuItem
                      active={activeKey === "play"}
                      title="Play"
                      icon={<PlayIcon active={activeKey === "play"} />}
                    />
                  ),
                },
                {
                  key: "invite",
                  label: (
                    <MenuItem
                      active={activeKey === "invite"}
                      title="Invite"
                      icon={<InviteIcon active={activeKey === "invite"} />}
                    />
                  ),
                },
                {
                  key: "rank",
                  label: (
                    <MenuItem
                      active={activeKey === "rank"}
                      title="Rank"
                      icon={<RankIcon active={activeKey === "rank"} />}
                    />
                  ),
                },
              ]}
            ></Menu>
          </Footer>
        </Layout>
      </Providers>
    </div>
  );
}
