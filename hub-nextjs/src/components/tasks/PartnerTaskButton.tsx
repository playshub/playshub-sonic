import { Avatar, Image, List } from "antd";
import { useState } from "react";
import Reward from "../Reward";
import {
  PARTNER_QUEST_REQUEST_TYPE,
  PARTNER_QUEST_TYPE,
} from "@/interfaces/quest";
import PartnerTaskDrawer from "./PartnerTaskDrawer";

export interface PartnerTaskButtonProps {
  onTaskSuccessCallback: () => void;
  type: PARTNER_QUEST_TYPE;
  requestType: PARTNER_QUEST_REQUEST_TYPE;
  onTaskProcessCallback: () => void;
  icon: string;
  title: string;
  description: string;
  reward: string;
  done?: boolean;
}

export default function PartnerTaskButton({
  icon,
  title,
  reward,
  done,
  type,
  requestType,
  onTaskSuccessCallback,
  onTaskProcessCallback,
  description,
}: PartnerTaskButtonProps) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div>
      <List.Item
        style={{ cursor: "pointer" }}
        onClick={() => setOpenDrawer(true)}
      >
        <List.Item.Meta
          avatar={<Avatar src={icon} shape="square" size={70} />}
          title={description}
          description={<Reward rewards={reward} />}
        />
        <div style={{ marginRight: 15 }}>
          {done && (
            <Image
              src="/icons/earn/done-stick.png"
              width={30}
              preview={false}
            />
          )}
        </div>
      </List.Item>
      <PartnerTaskDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onTaskSuccessCallback={onTaskSuccessCallback}
        type={type}
        requestType={requestType}
        onTaskProcessCallback={onTaskProcessCallback}
        icon={icon}
        title={title}
        description={description}
      />
    </div>
  );
}
