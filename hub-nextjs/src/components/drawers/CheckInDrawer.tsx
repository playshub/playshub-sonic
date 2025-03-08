import { Button, Drawer, Flex, Image, Modal, Space, Typography } from "antd";
import { getQuestStatus } from "../../apis/quest/get-quest-status";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkQuest } from "../../apis/quest/check-quest";
import { proceedQuest } from "../../apis/quest/proceed-quest";
import { useEffect, useState } from "react";
import { useNotification } from "../providers/NotificationProvider";
import useSolCheckIn from "@/hooks/useSolCheckIn";
import { SOL_CHECKED_IN_AMOUNT } from "@/utils/constants";
import { useSolWallet } from "../providers/SolanaWalletProvider";
import Reward from "../Reward";

export interface CheckInDrawerProps {
  open: boolean;
  onClose: () => void;
  refetchProfile: () => void;
}

export default function CheckInDrawer({
  open,
  onClose,
  refetchProfile,
}: CheckInDrawerProps) {
  const { isInitialized, generateWallet, balance } = useSolWallet();
  const notification = useNotification()!;
  const { data, refetch } = useQuery({
    queryKey: ["get_quest_status"],
    queryFn: getQuestStatus,
  });
  const { checkIn: solCheckIn, loading, success } = useSolCheckIn();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCreateWallet, setOpenCreateWallet] = useState(false);

  const checkQuestMutation = useMutation({
    mutationFn: () => checkQuest("DAILY", "CHECK_IN_SOL_WALLET"),
  });
  const proceedQuestMutation = useMutation({
    mutationFn: () => proceedQuest("DAILY", "CHECK_IN_SOL_WALLET"),
  });

  const task = data?.find((item) => item.requestType === "CHECK_IN_SOL_WALLET");

  const checkIn = async () => {
    // await proceedQuestMutation.mutateAsync();
    if (!isInitialized) {
      setOpenCreateWallet(true);
      return;
    }
    setOpenConfirm(true);
  };

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

  useEffect(() => {
    if (success) {
      notification.success("Check-in successful. Please check to get reward");
    }
  }, [success]);

  return (
    <Drawer open={open} footer={null} placement="bottom" onClose={onClose}>
      <Flex vertical align="center" gap={15}>
        <Flex vertical align="center">
          <div style={{ padding: 10 }}>
            <Image
              src="/icons/play/solana-icon.png"
              preview={false}
              width={80}
              alt=""
            />
          </div>
          <Reward rewards={task?.reward || ""} />
        </Flex>
        <Flex vertical align="center">
          <Typography.Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Check In
          </Typography.Text>
          <Typography.Text>{task?.description} to get rewards</Typography.Text>
        </Flex>
        <Flex vertical gap={10} style={{ width: "70%" }}>
          <Button
            type="primary"
            onClick={checkIn}
            style={{ padding: 20 }}
            loading={loading}
          >
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
      <Modal
        onCancel={() => setOpenConfirm(false)}
        title="Confirm"
        open={openConfirm}
        onOk={() => {
          setOpenConfirm(false);
          if (balance < Number(SOL_CHECKED_IN_AMOUNT)) {
            notification.error("Insufficient balance!");
            return;
          }
          solCheckIn();
        }}
      >
        <Flex align="center" vertical gap={10}>
          <Typography.Text>
            {`This will be sent ${SOL_CHECKED_IN_AMOUNT} SOL from your wallet`}
          </Typography.Text>
        </Flex>
      </Modal>

      <Modal
        onCancel={() => setOpenCreateWallet(false)}
        title="Confirm"
        open={openCreateWallet}
        onOk={() => {
          generateWallet();
          notification.info("Wallet is created!");
          setOpenCreateWallet(false);
        }}
      >
        <Flex align="center" vertical gap={10}>
          <Typography.Text>
            {`You haven't have the wallet yet, do you want to create one?`}
          </Typography.Text>
        </Flex>
      </Modal>
    </Drawer>
  );
}
