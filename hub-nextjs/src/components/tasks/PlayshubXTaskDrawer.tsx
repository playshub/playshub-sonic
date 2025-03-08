import { useMutation, useQuery } from "@tanstack/react-query";

import { Button, Drawer, Flex, Image, Space, Typography } from "antd";
import {
  getPartnerQuestStatus,
  getQuestStatus,
} from "../../apis/quest/get-quest-status";
import { checkQuest } from "../../apis/quest/check-quest";
import { proceedQuest } from "../../apis/quest/proceed-quest";
import { useEffect } from "react";
import { useNotification } from "../providers/NotificationProvider";
import Reward from "../Reward";
import { QUEST_REQUEST_TYPE, QUEST_TYPE } from "@/interfaces/quest";
import { openLink } from "@/utils/helpers";

export interface PlayshubXTaskDrawerProps {
  open: boolean;
  onClose: () => void;
  onTaskSuccessCallback: () => void;
  type: QUEST_TYPE;
  requestType: QUEST_REQUEST_TYPE;
  icon: string;
  title: string;
  description: string;
}

export default function PlayshubXTaskDrawer({
  open,
  onClose,
  onTaskSuccessCallback,
  type,
  requestType,
  icon,
  title,
  description,
}: PlayshubXTaskDrawerProps) {
  const { data, refetch } = useQuery({
    queryKey: ["get_quest_status"],
    queryFn: getQuestStatus,
  });
  const checkQuestMutation = useMutation({
    mutationFn: () => checkQuest(type, requestType),
  });
  const proceedQuestMutation = useMutation({
    mutationFn: () => proceedQuest(type, requestType),
  });

  const task = data?.find((item) => item.requestType === requestType);

  const action = async () => {
    await proceedQuestMutation.mutateAsync();

    if (task?.additional) {
      openLink(task.additional);
    }
    return;
  };

  const notification = useNotification()!;
  useEffect(() => {
    if (checkQuestMutation.isSuccess) {
      notification.success("Claim Bonus Successful!");
      refetch();
      onTaskSuccessCallback();
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
            <Image src={icon} preview={false} width={80} />
          </div>
          <Reward rewards={task?.reward || ""} />
        </Flex>
        <Flex vertical align="center">
          <Typography.Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {description}
          </Typography.Text>
          <Typography.Text>{`${description} to get rewards`}</Typography.Text>
        </Flex>
        <Flex vertical gap={10} style={{ width: "70%" }}>
          <Button type="primary" onClick={action} style={{ padding: 20 }}>
            {title}
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
