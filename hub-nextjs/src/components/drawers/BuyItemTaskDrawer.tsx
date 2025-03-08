import { useMutation, useQuery } from "@tanstack/react-query";

import { Button, Drawer, Flex, Image, Space, Typography } from "antd";
import { getQuestStatus } from "../../apis/quest/get-quest-status";
import { checkQuest } from "../../apis/quest/check-quest";
import { proceedQuest } from "../../apis/quest/proceed-quest";
import { useEffect } from "react";
import { useNotification } from "../providers/NotificationProvider";
import Reward from "../Reward";

export interface BuyItemTaskDrawerProps {
  open: boolean;
  onClose: () => void;
  refetchProfile: () => void;
}

export default function BuyItemTaskDrawer({
  open,
  onClose,
  refetchProfile,
}: BuyItemTaskDrawerProps) {
  const { data, refetch } = useQuery({
    queryKey: ["get_quest_status"],
    queryFn: getQuestStatus,
  });
  const checkQuestMutation = useMutation({
    mutationFn: () => checkQuest("TASK", "BUY_ITEM"),
  });
  const proceedQuestMutation = useMutation({
    mutationFn: () => proceedQuest("TASK", "BUY_ITEM"),
  });

  const task = data?.find((item) => item.requestType === "BUY_ITEM");

  const action = async () => {
    await proceedQuestMutation.mutateAsync();

    notification.info("Buy an item on Cat Battle game to get rewards");
    return;
  };

  const notification = useNotification()!;
  useEffect(() => {
    if (checkQuestMutation.isSuccess) {
      notification.success("Claim Bonus Successful!");
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
            <Image src="/icons/earn/buy-item.png" preview={false} width={80} />
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
          <Button type="primary" onClick={action} style={{ padding: 20 }}>
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
