import { Button, Drawer, Flex, Image, Space, Typography } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getQuestStatus } from "../../apis/quest/get-quest-status";
import { checkQuest } from "../../apis/quest/check-quest";
import { proceedQuest } from "../../apis/quest/proceed-quest";
import { useNotification } from "../providers/NotificationProvider";
import { useEffect } from "react";

import { GAME_CAT_BATTLE_URL } from "../../utils/constants";
import Reward from "../Reward";

export interface PlayCatBDrawerProps {
  open: boolean;
  onClose: () => void;
  refetchProfile: () => void;
}

export default function PlayCatBDrawer({
  open,
  onClose,
  refetchProfile,
}: PlayCatBDrawerProps) {
  const { data, refetch } = useQuery({
    queryKey: ["get_quest_status"],
    queryFn: getQuestStatus,
  });
  const checkQuestMutation = useMutation({
    mutationFn: () => checkQuest("TASK", "PLAY_CAT_BATTLE"),
  });
  const proceedQuestMutation = useMutation({
    mutationFn: () => proceedQuest("TASK", "PLAY_CAT_BATTLE"),
  });
  const task = data?.find(
    (item) => item.requestType === "PLAY_CAT_BATTLE" && item.type === "TASK"
  );

  const play = async () => {
    await proceedQuestMutation.mutateAsync();

    const link = `${GAME_CAT_BATTLE_URL}?pv_key=${localStorage.getItem(
      "pv_key"
    )}`;

    window.open(link, "_self");
  };

  const notification = useNotification()!;
  useEffect(() => {
    if (checkQuestMutation.isSuccess) {
      notification.success(" Claim Bonus Successful!");
      refetch();
      refetchProfile();
      onClose();
    }
  }, [checkQuestMutation.isSuccess]);

  useEffect(() => {
    if (checkQuestMutation.isError) {
      if (checkQuestMutation.error.message === "You have claimed the quest") {
        notification.warning("You have claimed the quest");
      } else {
        notification.warning("You have not completed the quest");
      }
    }
  }, [checkQuestMutation.isError]);

  return (
    <Drawer open={open} footer={null} placement="bottom" onClose={onClose}>
      <Flex vertical align="center" gap={15}>
        <Flex vertical align="center">
          <div style={{ padding: 10 }}>
            <Image src="/icons/earn/play.png" preview={false} width={80} />
          </div>
          <Reward rewards={task?.reward || ""} />
        </Flex>
        <Flex vertical align="center">
          <Typography.Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {task?.description}
          </Typography.Text>
          <Typography.Text>{task?.description} to get rewards</Typography.Text>
        </Flex>
        <Flex vertical gap={10} style={{ width: "70%" }}>
          <Button type="primary" onClick={play} style={{ padding: 20 }}>
            {task?.label}
          </Button>
          <Button
            type="default"
            style={{ padding: 20 }}
            onClick={() => checkQuestMutation.mutate()}
          >
            Check
          </Button>
        </Flex>
      </Flex>
    </Drawer>
  );
}
