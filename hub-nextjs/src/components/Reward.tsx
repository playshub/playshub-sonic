import { parseRewards } from "@/utils/helpers";
import { Image, Space, Typography } from "antd";
import { useMemo } from "react";

export default function Reward({ rewards }: { rewards: string }) {
  const parsedRewards = useMemo(() => parseRewards(rewards), [rewards]);

  return (
    <Space>
      {parsedRewards.map((reward) => (
        <Space size={4} key={reward.type}>
          {reward.type == "PLAYS" && (
            <Image
              src="/icons/play/$plays-coin.png"
              width={20}
              preview={false}
            />
          )}
          {reward.type == "SHARD" && (
            <Image
              src="/icons/play/iconfragment_earn.png"
              width={20}
              preview={false}
            />
          )}
          {reward.type == "GEM" && (
            <Image
              src="/icons/play/icongem_earn.png"
              width={20}
              preview={false}
            />
          )}
          {reward.type == "USDC" && (
            <Image src="/icons/play/usdc.png" width={20} preview={false} />
          )}
          <Typography.Text style={{ color: "#01BEED" }}>
            {`+${reward.amount}`}
          </Typography.Text>
        </Space>
      ))}
    </Space>
  );
}
