import { Avatar, Image, List } from "antd";
import { useState } from "react";
import Reward from "../Reward";
import { QUEST_REQUEST_TYPE, QUEST_TYPE } from "@/interfaces/quest";
import PlayshubXTaskDrawer from "./PlayshubXTaskDrawer";

export interface PlayshubXTaskButtonProps {
  onTaskSuccessCallback: () => void;
  type: QUEST_TYPE;
  requestType: QUEST_REQUEST_TYPE;
  icon: string;
  title: string;
  description: string;
  reward: string;
  done?: boolean;
}

export default function PlayshubXTaskButton({
  icon,
  title,
  reward,
  done,
  type,
  requestType,
  onTaskSuccessCallback,
  description,
}: PlayshubXTaskButtonProps) {
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
      <PlayshubXTaskDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onTaskSuccessCallback={onTaskSuccessCallback}
        type={type}
        requestType={requestType}
        icon={icon}
        title={title}
        description={description}
      />
    </div>
  );
}
