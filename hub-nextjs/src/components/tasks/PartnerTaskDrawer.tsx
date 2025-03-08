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
import {
  PARTNER_QUEST_REQUEST_TYPE,
  PARTNER_QUEST_TYPE,
} from "@/interfaces/quest";

export interface PartnerTaskDrawerProps {
  open: boolean;
  onClose: () => void;
  onTaskSuccessCallback: () => void;
  type: PARTNER_QUEST_TYPE;
  requestType: PARTNER_QUEST_REQUEST_TYPE;
  onTaskProcessCallback: () => void;
  icon: string;
  title: string;
  description: string;
}

export default function PartnerTaskDrawer({
  open,
  onClose,
  onTaskSuccessCallback,
  type,
  requestType,
  onTaskProcessCallback,
  icon,
  title,
  description,
}: PartnerTaskDrawerProps) {
  const { data, refetch } = useQuery({
    queryKey: ["get_partner_quest_status"],
    queryFn: getPartnerQuestStatus,
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

    onTaskProcessCallback();
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
