import {
  PARTNER_QUEST_REQUEST_TYPE,
  PARTNER_QUEST_TYPE,
  QUEST_REQUEST_TYPE,
  QUEST_TYPE,
} from "../../interfaces/quest";
import api from "../axios";

export const getQuestStatus = async (): Promise<
  {
    type: QUEST_TYPE;
    requestType: QUEST_REQUEST_TYPE;
    description: string;
    reward: string;
    label: string;
    progressAmount: number;
    requestAmount: number;
    additional: string | null;
    rewardedStep: number;
  }[]
> => {
  const { data } = await api.get("/plays-hub/quest_status");

  return data?.data_quests?.map((item: any) => ({
    type: item.type,
    requestType: item.request_type,
    description: item.description,
    reward: item.reward,
    label: item.label_proceed,
    progressAmount: item.progress_amount,
    requestAmount: item.request_amount,
    additional: item.additional,
    rewardedStep: item.rewarded_step,
  }));
};

export const getPartnerQuestStatus = async (): Promise<
  {
    type: PARTNER_QUEST_TYPE;
    requestType: PARTNER_QUEST_REQUEST_TYPE;
    description: string;
    reward: string;
    label: string;
    additional: string;
    rewardedStep: number;
  }[]
> => {
  const { data } = await api.get("/plays-hub/partner_quest_status");

  return data?.data_quests?.map((item: any) => ({
    type: item.type,
    requestType: item.request_type,
    description: item.description,
    reward: item.reward,
    label: item.label_proceed,
    additional: item.additional,
    rewardedStep: item.rewarded_step,
  }));
};
