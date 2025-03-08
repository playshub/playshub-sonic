export const parseRewards = (
  rewards: string
): { type: "SHARD" | "PLAYS" | "USDC" | "GEM"; amount: string }[] => {
  return rewards.split(",").map((reward) => {
    if (reward.startsWith("SHARD")) {
      return {
        type: "SHARD",
        amount: reward?.match(/SHARD:(\d+)/)?.[1] || "0",
      };
    } else if (reward.startsWith("PLAYS")) {
      return {
        type: "PLAYS",
        amount: reward?.match(/PLAYS:(\d+)/)?.[1] || "0",
      };
    } else if (reward.startsWith("USDC")) {
      return {
        type: "USDC",
        amount: reward?.match(/USDC:(\d+)/)?.[1] || "0",
      };
    } else if (reward.startsWith("GEM")) {
      return {
        type: "GEM",
        amount: reward?.match(/GEM:(\d+)/)?.[1] || "0",
      };
    } else {
      return {
        type: "PLAYS",
        amount: reward?.match(/PLAYS:(\d+)/)?.[1] || "0",
      };
    }
  });
};

export const openLink = (link: string) => {
  window.open(link, "_blank");
};
