"use client";
import {
  Avatar,
  Button,
  Col,
  Flex,
  Image,
  List,
  Progress,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getQuestStatus } from "../../apis/quest/get-quest-status";

import CheckInDrawer from "../../components/drawers/CheckInDrawer";
import CreateSolWalletDrawer from "../../components/drawers/CreateSolWalletDrawer";
import PlayCatBDrawer from "../../components/drawers/PlayCatBDrawer";
import PlayCatBDrawer2 from "../../components/drawers/PlayCatBDrawer2";
import InviteFriendDrawer from "../../components/drawers/InviteFriendDrawer";
import FollowXDrawer from "../../components/drawers/FollowXDrawer";
import PlayCatLuckyDrawer from "../../components/drawers/PlayCatLuckyDrawer";

import { checkQuest } from "../../apis/quest/check-quest";
import { useNotification } from "@/components/providers/NotificationProvider";
import { useCreateWalletTutorial } from "@/components/providers/CreateWalletTutorialProvider";
import BuyItemTaskDrawer from "@/components/drawers/BuyItemTaskDrawer";
import JoinTelegramChannelTaskDrawer from "@/components/drawers/JoinTelegramChannelTaskDrawer";
import JoinTelegramChatTaskDrawer from "@/components/drawers/JoinTelegramChatTaskDrawer";

import Reward from "@/components/Reward";
import { getProfile } from "@/apis/account/profile";
import { useLetAirdropTutorial } from "@/components/providers/LetAirdropTutorialProvider";
import PlayshubXTaskButton from "./PlayshubXTaskButton";
import CreateSolProfileDrawer from "../drawers/CreateSolProfileDrawer";

export default function PlayshubTasks() {
  const notification = useNotification()!;
  const { refetch: refetchProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  // DAILY TASKS
  const [openCheckInDrawer, setOpenCheckInOpenDrawer] = useState(false);
  const [openBuyItemTaskDrawer, setOpenBuyItemTaskDrawer] = useState(false);
  const [openInviteFriendDrawer, setOpenInviteFriendDrawer] = useState(false);
  const [openPlayCatBDrawer, setOpenPlayCatBDrawer] = useState(false);
  const [openPlayCatLuckyDrawer, setOpenPlayCatLuckyDrawer] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["get_quest_status"],
    queryFn: getQuestStatus,
  });
  const checkQuestCompleteDailyMutation = useMutation({
    mutationFn: () => checkQuest("DAILY", "COMPLETE_DAILY_TASK"),
  });

  const checkInSolWalletDailyTask = data?.find(
    (item) => item.requestType === "CHECK_IN_SOL_WALLET"
  );
  const inviteDailyTask = data?.find((item) => item.requestType === "INVITE");
  const buyItemDailyTask = data?.find(
    (item) => item.requestType === "BUY_ITEM"
  );
  const playCatBattleDailyTask = data?.find(
    (item) => item.requestType === "PLAY_CAT_BATTLE" && item.type === "DAILY"
  );
  const playCatLuckyDailyTask = data?.find(
    (item) => item.requestType === "PLAY_CAT_LUCKY"
  );
  const completeDailyTask = data?.find(
    (item) => item.requestType === "COMPLETE_DAILY_TASK"
  );

  const { earnAreaRef, tourActive, setRun } = useCreateWalletTutorial();

  const dailyTasks = [
    {
      name: "Check-in Solana Wallet",
      image: "/icons/play/solana-icon.png",
      reward: checkInSolWalletDailyTask?.reward,
      done: checkInSolWalletDailyTask?.rewardedStep === 1,
      onclick: () => setOpenCheckInOpenDrawer(true),
    },
    {
      name: inviteDailyTask?.description,
      image: "/icons/earn/invite.png",
      reward: inviteDailyTask?.reward,
      done: inviteDailyTask?.rewardedStep === 1,
      onclick: () => {
        setOpenInviteFriendDrawer(true);
      },
    },
    {
      name: buyItemDailyTask?.description,
      image: "/icons/earn/buy-item.png",
      reward: buyItemDailyTask?.reward,
      done: buyItemDailyTask?.rewardedStep === 1,
      onclick: () => {
        setOpenBuyItemTaskDrawer(true);
      },
    },
    {
      name: playCatBattleDailyTask?.description,
      image: "/icons/earn/play.png",
      reward: playCatBattleDailyTask?.reward,
      done: playCatBattleDailyTask?.rewardedStep === 1,
      onclick: () => {
        setOpenPlayCatBDrawer(true);
      },
    },
    {
      name: playCatLuckyDailyTask?.description,
      image: "/icons/earn/play-cat-lucky.png",
      reward: playCatLuckyDailyTask?.reward,
      done: playCatLuckyDailyTask?.rewardedStep === 1,
      onclick: () => {
        setOpenPlayCatLuckyDrawer(true);
      },
    },
  ];

  // TASKS
  const [openFollowXDrawer, setOpenFollowXDrawer] = useState(false);
  useState(false);
  const [
    openJoinTelegramChannelTaskDrawer,
    setOpenJoinTelegramChannelTaskDrawer,
  ] = useState(false);
  const [openJoinTelegramChatTaskDrawer, setOpenJoinTelegramChatTaskDrawer] =
    useState(false);
  const [openPlayCatBattleTaskDrawer, setOpenPlayCatBattleTaskDrawer] =
    useState(false);
  const [openCreateSolWalletTaskDrawer, setOpenCreateSolWalletTaskDrawer] =
    useState(false);
  const [openCreateSolProfileDrawer, setOpenCreateSolProfileDrawer] =
    useState(false);

  const followPlaysOnXTask = data?.find(
    (item) => item.requestType === "FOLLOW_PLAYS_ON_X"
  );
  const joinTelegramChannelTask = data?.find(
    (item) => item.requestType === "JOIN_TELEGRAM_CHANNEL"
  );
  const joinTelegramChatTask = data?.find(
    (item) => item.requestType === "JOIN_TELEGRAM_CHAT"
  );
  const playCatBattleTask = data?.find(
    (item) => item.requestType === "PLAY_CAT_BATTLE" && item.type === "TASK"
  );
  const createSolWalletTask = data?.find(
    (item) => item.requestType === "CREATE_SOL_WALLET"
  );
  const createSolProfileTask = data?.find(
    (item) => item.requestType === "CREATE_SOL_PROFILE"
  );

  const tasks = [
    {
      name: followPlaysOnXTask?.description,
      image: "/icons/earn/follow-play.png",
      reward: followPlaysOnXTask?.reward,
      done: followPlaysOnXTask?.rewardedStep === 1,
      onclick: () => {
        setOpenFollowXDrawer(true);
      },
    },
    {
      name: joinTelegramChannelTask?.description,
      image: "/icons/earn/join-channel.png",
      reward: joinTelegramChannelTask?.reward,
      done: joinTelegramChannelTask?.rewardedStep === 1,
      onclick: () => {
        setOpenJoinTelegramChannelTaskDrawer(true);
      },
    },
    {
      name: joinTelegramChatTask?.description,
      image: "/icons/earn/join-chat.png",
      reward: joinTelegramChatTask?.reward,
      done: joinTelegramChatTask?.rewardedStep === 1,
      onclick: () => {
        setOpenJoinTelegramChatTaskDrawer(true);
      },
    },
    {
      name: createSolWalletTask?.description,
      image: "/icons/earn/create-wallet.png",
      reward: createSolWalletTask?.reward,
      done: createSolWalletTask?.rewardedStep === 1,
      onclick: () => {
        setOpenCreateSolWalletTaskDrawer(true);
      },
    },
    {
      name: playCatBattleTask?.description,
      image: "/icons/earn/play.png",
      reward: playCatBattleTask?.reward,
      done: playCatBattleTask?.rewardedStep === 1,
      onclick: () => {
        setOpenPlayCatBattleTaskDrawer(true);
      },
    },
    {
      name: "Create Profile",
      image: "/icons/earn/honeycomb.png",
      earn: createSolProfileTask?.reward?.match(/PLAYS:(\d+)/)?.[1] || 0,
      done: createSolProfileTask?.rewardedStep === 1,
      onclick: () => {
        setOpenCreateSolProfileDrawer(true);
      },
    },
  ];

  const xTasks =
    data
      ?.filter((item) => item.type === "X_TASK")
      ?.filter((item) => item.additional) || [];

  const isDailyTaskDone =
    completeDailyTask?.progressAmount === completeDailyTask?.requestAmount;
  const isDailyTaskClaimed = completeDailyTask?.rewardedStep === 1;

  const { airdropTaskRef } = useLetAirdropTutorial()!;

  useEffect(() => {
    if (checkQuestCompleteDailyMutation.isSuccess) {
      notification.success(" Claim Bonus Successful!");
    }
  }, [checkQuestCompleteDailyMutation.isSuccess]);

  useEffect(() => {
    if (tourActive) {
      setTimeout(() => {
        setRun(true);
      }, 1000);
    }
  }, [tourActive]);

  return (
    <Spin spinning={isLoading}>
      <div style={{ paddingBottom: 10 }}>
        <div>
          <div>
            <Flex align="center" gap={10} style={{ marginBottom: 5 }}>
              <Typography.Text
                style={{ color: "#767676", fontWeight: "bold" }}
              >{`DAILY TASKS (${completeDailyTask?.progressAmount}/${completeDailyTask?.requestAmount})`}</Typography.Text>
              <Reward rewards={completeDailyTask?.reward || ""} />
              <Button
                style={{ marginLeft: "auto" }}
                type={
                  !isDailyTaskDone || isDailyTaskClaimed ? "default" : "primary"
                }
                onClick={async () => {
                  checkQuestCompleteDailyMutation.mutate();
                }}
                disabled={!isDailyTaskDone || isDailyTaskClaimed}
              >
                Claim
              </Button>
            </Flex>
            <Progress
              percent={
                ((completeDailyTask?.progressAmount || 0) /
                  (completeDailyTask?.requestAmount || 1)) *
                100
              }
              showInfo={false}
            />
          </div>
          <div
            style={{ background: "white", padding: "10px", borderRadius: 10 }}
          >
            <List
              ref={earnAreaRef}
              itemLayout="horizontal"
              dataSource={dailyTasks}
              renderItem={(item) => (
                <List.Item style={{ cursor: "pointer" }} onClick={item.onclick}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.image} shape="square" size={70} />
                    }
                    title={item.name}
                    description={<Reward rewards={item?.reward || ""} />}
                  />
                  <div style={{ marginRight: 15 }}>
                    {item.done && (
                      <Image
                        src="/icons/earn/done-stick.png"
                        width={30}
                        preview={false}
                      />
                    )}
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>

        <div style={{ marginTop: 10 }} ref={airdropTaskRef}>
          <div>
            <Flex align="center" gap={10} style={{ marginBottom: 5 }}>
              <Typography.Text style={{ color: "#767676", fontWeight: "bold" }}>
                AIRDROP TASKS
              </Typography.Text>
            </Flex>
          </div>
          <div
            style={{ background: "white", padding: "10px", borderRadius: 10 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={tasks}
              renderItem={(item) => (
                <List.Item style={{ cursor: "pointer" }} onClick={item.onclick}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.image} shape="square" size={70} />
                    }
                    title={item.name}
                    description={<Reward rewards={item?.reward || ""} />}
                  />
                  <div style={{ marginRight: 15 }}>
                    {item.done && (
                      <Image
                        src="/icons/earn/done-stick.png"
                        width={30}
                        preview={false}
                      />
                    )}
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div>
            <Flex align="center" gap={10} style={{ marginBottom: 5 }}>
              <Typography.Text style={{ color: "#767676", fontWeight: "bold" }}>
                OTHER TASKS
              </Typography.Text>
            </Flex>
          </div>
          <div
            style={{ background: "white", padding: "10px", borderRadius: 10 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={xTasks}
              renderItem={(item) => (
                <PlayshubXTaskButton
                  icon={"/icons/earn/follow-play.png"}
                  title={item.label}
                  reward={item.reward}
                  done={item.rewardedStep === 1}
                  type={item.type}
                  requestType={item.requestType}
                  onTaskSuccessCallback={() => {
                    refetchProfile();
                  }}
                  description={item.description}
                />
              )}
            />
          </div>
        </div>

        {/* DAILY TASK DRAWERS */}

        <CheckInDrawer
          open={openCheckInDrawer}
          onClose={() => {
            setOpenCheckInOpenDrawer(false);
          }}
          refetchProfile={refetchProfile}
        />

        <InviteFriendDrawer
          open={openInviteFriendDrawer}
          onClose={() => {
            setOpenInviteFriendDrawer(false);
          }}
          refetchProfile={refetchProfile}
        />
        <BuyItemTaskDrawer
          open={openBuyItemTaskDrawer}
          onClose={() => {
            setOpenBuyItemTaskDrawer(false);
          }}
          refetchProfile={refetchProfile}
        />
        <PlayCatBDrawer
          open={openPlayCatBDrawer}
          onClose={() => {
            setOpenPlayCatBDrawer(false);
          }}
          refetchProfile={refetchProfile}
        />
        <PlayCatLuckyDrawer
          open={openPlayCatLuckyDrawer}
          onClose={() => {
            setOpenPlayCatLuckyDrawer(false);
          }}
          refetchProfile={refetchProfile}
        />

        {/* TASKS */}
        <FollowXDrawer
          open={openFollowXDrawer}
          onClose={() => {
            setOpenFollowXDrawer(false);
          }}
          refetchProfile={refetchProfile}
        />
        <JoinTelegramChannelTaskDrawer
          open={openJoinTelegramChannelTaskDrawer}
          onClose={() => {
            setOpenJoinTelegramChannelTaskDrawer(false);
          }}
          refetchProfile={refetchProfile}
        />
        <JoinTelegramChatTaskDrawer
          open={openJoinTelegramChatTaskDrawer}
          onClose={() => {
            setOpenJoinTelegramChatTaskDrawer(false);
          }}
          refetchProfile={refetchProfile}
        />
        <PlayCatBDrawer2
          open={openPlayCatBattleTaskDrawer}
          onClose={() => {
            setOpenPlayCatBattleTaskDrawer(false);
          }}
          refetchProfile={refetchProfile}
        />
        <CreateSolWalletDrawer
          open={openCreateSolWalletTaskDrawer}
          onClose={() => {
            setOpenCreateSolWalletTaskDrawer(false);
          }}
          refetchProfile={refetchProfile}
        />
        <CreateSolProfileDrawer
          open={openCreateSolProfileDrawer}
          onClose={() => {
            setOpenCreateSolProfileDrawer(false);
          }}
        />
      </div>
    </Spin>
  );
}
