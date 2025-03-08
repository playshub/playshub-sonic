import {
  PARTNER_QUEST_REQUEST_TYPE,
  PARTNER_QUEST_TYPE,
  QUEST_REQUEST_TYPE,
  QUEST_TYPE,
} from "../../interfaces/quest";
import api from "../axios";

export const checkQuest = async (
  type: QUEST_TYPE | PARTNER_QUEST_TYPE,
  requestType: QUEST_REQUEST_TYPE | PARTNER_QUEST_REQUEST_TYPE
) => {
  const { data } = await api.post("/plays-hub/check_quest", {
    type,
    request_type: requestType,
  });

  if (data?.is_successed) {
    if (!data?.plays) {
      throw new Error("You have claimed the quest");
    }
    return data;
  } else {
    throw new Error("You have not completed the quest");
  }
};

export const checkCompletedAllAirdropTask = async (): Promise<boolean> => {
  const { data } = await api.get("/plays-hub/check_completed_all_airdrop_task");

  return data;
};
