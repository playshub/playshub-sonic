"use client";
import { Flex, List, Spin, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getPartnerQuestStatus } from "../../apis/quest/get-quest-status";

import PartnerTaskButton from "./PartnerTaskButton";
import { getProfile } from "@/apis/account/profile";
import { openLink } from "@/utils/helpers";

export default function PartnerTasks() {
  const { data, isLoading } = useQuery({
    queryKey: ["get_partner_quest_status"],
    queryFn: getPartnerQuestStatus,
  });

  const { refetch: refetchProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const partnerTasks = data?.filter((item) => item.additional) || [];

  return (
    <Spin spinning={isLoading}>
      <div style={{ paddingBottom: 10 }}>
        <div>
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
              dataSource={partnerTasks}
              renderItem={(item) => (
                <PartnerTaskButton
                  icon={
                    item.label === "Follow"
                      ? "/icons/earn/follow-play.png"
                      : item.label === "Join"
                      ? "/icons/earn/join-channel.png"
                      : "/icons/earn/play.png"
                  }
                  title={item.label}
                  reward={item.reward}
                  done={item.rewardedStep === 1}
                  type={item.type}
                  requestType={item.requestType}
                  onTaskSuccessCallback={() => {
                    refetchProfile();
                  }}
                  onTaskProcessCallback={() => {
                    openLink(item.additional);
                  }}
                  description={item.description}
                />
              )}
            />
          </div>
        </div>
      </div>
    </Spin>
  );
}
