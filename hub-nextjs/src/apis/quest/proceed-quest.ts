import {
  PARTNER_QUEST_REQUEST_TYPE,
  PARTNER_QUEST_TYPE,
  QUEST_REQUEST_TYPE,
  QUEST_TYPE,
} from "../../interfaces/quest";
import api from "../axios";

export const proceedQuest = async (
  type: QUEST_TYPE | PARTNER_QUEST_TYPE,
  requestType: QUEST_REQUEST_TYPE | PARTNER_QUEST_REQUEST_TYPE
) => {
  const { data } = await api.post("/plays-hub/proceed_quest", {
    type,
    request_type: requestType,
  });

  return data;
};
