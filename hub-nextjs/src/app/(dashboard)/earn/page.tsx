"use client";

import { getProfile } from "@/apis/account/profile";
import PartnerTasks from "@/components/tasks/PartnerTasks";
import PlayshubTasks from "@/components/tasks/PlayshubTasks";
import { useQuery } from "@tanstack/react-query";
import {
  Col,
  Flex,
  Image,
  Row,
  Space,
  Spin,
  Tabs,
  TabsProps,
  Typography,
} from "antd";

export default function Earn() {
  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const items: TabsProps["items"] = [
    {
      key: "playshub",
      label: "PLAYS Hub Tasks",
      children: (
        <div style={{ padding: 10 }}>
          <PlayshubTasks />
        </div>
      ),
    },
    {
      key: "partner",
      label: "Partner Tasks",
      children: (
        <div style={{ padding: 10 }}>
          <PartnerTasks />
        </div>
      ),
    },
  ];

  return (
    <div style={{ margin: -10 }}>
      <div
        style={{
          padding: "10px 0px",
          background: "white",
        }}
      >
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Flex vertical style={{ alignItems: "center" }}>
              <div style={{ padding: 10 }}>
                <Image
                  src="/icons/earn/earn-icon.png"
                  preview={false}
                  width={80}
                />
              </div>

              <div>
                <Spin spinning={isProfileLoading}>
                  <Space>
                    <div
                      style={{
                        background: "#DBDBDB",
                        padding: "5px 10px",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography.Text
                        style={{
                          fontWeight: "bold",
                          fontFamily: "myriadpro-bold",
                          marginRight: 5,
                        }}
                      >
                        {profileData?.game_cat_battle_statistic?.shard || 0}
                      </Typography.Text>
                      <Image
                        src="/icons/play/iconfragment_earn.png"
                        width={20}
                        preview={false}
                      />
                    </div>
                    <div
                      style={{
                        background: "#DBDBDB",
                        padding: "5px 10px",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography.Text
                        style={{
                          fontWeight: "bold",
                          fontFamily: "myriadpro-bold",
                          marginRight: 5,
                        }}
                      >
                        {profileData?.currency?.plays || 0}
                      </Typography.Text>
                      <Image
                        src="/icons/play/$plays-coin.png"
                        width={20}
                        preview={false}
                      />
                    </div>
                    <div
                      style={{
                        background: "#DBDBDB",
                        padding: "5px 10px",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography.Text
                        style={{
                          fontWeight: "bold",
                          fontFamily: "myriadpro-bold",
                          marginRight: 5,
                        }}
                      >
                        {profileData?.game_cat_battle_statistic?.gem || 0}
                      </Typography.Text>
                      <Image
                        src="/icons/play/icongem_earn.png"
                        width={20}
                        preview={false}
                      />
                    </div>
                  </Space>
                </Spin>
              </div>
            </Flex>
          </Col>
        </Row>
      </div>
      <Tabs defaultActiveKey="1" items={items} type="card" />
    </div>
  );
}
