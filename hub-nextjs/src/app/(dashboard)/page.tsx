"use client";

import {
  Avatar,
  Button,
  Col,
  Flex,
  Image,
  List,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../apis/account/profile";
import {
  GAME_CAT_BATTLE_URL,
  GAME_CAT_CHALLENGE_URL,
  GAME_CAT_LUCKY_URL,
  PLAY_HUBS_URL,
  SARA_URL,
} from "../../utils/constants";
import { useEffect, useState } from "react";
import { useCreateWalletTutorial } from "@/components/providers/CreateWalletTutorialProvider";

import StartAirdropTaskModal from "@/components/modals/StartAirdropTaskModal";
import { useOpenCatLuckyLink } from "@/hooks/useOpenCatLuckyLink";
import { useOpenCatBattleLink } from "@/hooks/useOpenCatBattleLink";
import { setApp } from "@/utils/storage";

function App() {
  const { playGameAreaRef, tourActive, setRun } = useCreateWalletTutorial();
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { link: catLuckyLink } = useOpenCatLuckyLink();
  const { link: catBattleLink } = useOpenCatBattleLink();

  const games = [
    {
      name: "Cat Battle",
      image: "/icons/play/catbattle-icon.png",
      description: "Defense against alien invasion",
      link: catBattleLink,
    },
    {
      name: "Cat Lucky",
      image: "/icons/play/lucky-icon.png",
      description: "Get Big Rewards in Tower",
      link: catLuckyLink,
    },
    // {
    //   name: "SARA",
    //   image: "/icons/play/sara-icon.png",
    //   description: "The AI Assistant",
    //   link: `${SARA_URL}/#${serializeLaunchParams(lp)}`,
    // },
    {
      name: "Cat Challenge",
      image: "/icons/play/pvp-icon.png",
      description: "Play Realtime PvP with others",
      link: null,
    },
    {
      name: "NFTs Marketplace",
      image: "/icons/play/market-icon.png",
      description: "Sell & Buy Cat NFTs",
      link: null,
    },
  ];

  const play = async ({ link, name }: { link: string; name: string }) => {
    setApp(name === "Cat Battle" ? "cat-battle" : "cat-lucky");
    window.location.reload();
  };

  useEffect(() => {
    if (tourActive) {
      setTimeout(() => {
        setRun(true);
      }, 1000);
    }
  }, [tourActive]);

  return (
    <div>
      <div style={{ padding: "10px 0px" }}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Flex vertical style={{ alignItems: "center" }}>
              <div style={{ padding: 10 }}>
                <Image
                  src="/icons/play/$plays-coin.png"
                  preview={false}
                  width={80}
                  alt=""
                />
              </div>
              <div
                style={{
                  background: "#DBDBDB",
                  padding: "5px 40px",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Spin spinning={isLoading}>
                  <Typography.Text
                    style={{
                      fontWeight: "bold",
                      fontFamily: "myriadpro-bold",
                      fontSize: 19,
                      marginRight: 5,
                    }}
                  >
                    {data?.currency?.plays || 0}
                  </Typography.Text>
                </Spin>
                <Typography.Text
                  style={{ color: "#01BEED", fontFamily: "myriadpro-bold" }}
                >
                  $wPLAYS
                </Typography.Text>
              </div>
            </Flex>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginBottom: 10,
          borderRadius: 10,
          display: "flex",
          padding: 10,
          backgroundImage: "url(/images/banner.png)",
          aspectRatio: 3.2,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div style={{ background: "white", padding: "10px", borderRadius: 10 }}>
        <List
          ref={playGameAreaRef}
          header={
            <Flex>
              <Typography.Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#57A8E5",
                  fontFamily: "myriadpro-bold",
                }}
              >
                Play to Earn More
              </Typography.Text>
              <Button style={{ marginLeft: "auto" }} type="text">
                See All
              </Button>
            </Flex>
          }
          itemLayout="horizontal"
          dataSource={games}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  key={item.name}
                  disabled={!item.link}
                  type={item.link ? "primary" : "default"}
                  onClick={() => play({ link: item.link!, name: item.name })}
                >
                  PLAY
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image} shape="square" size={70} />}
                title={
                  <Typography.Text
                    className="ant-list-item-meta-title"
                    style={{ fontSize: 16 }}
                  >
                    {item.name}
                  </Typography.Text>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
      <StartAirdropTaskModal />
    </div>
  );
}

export default App;
