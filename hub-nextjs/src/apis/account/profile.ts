import api from "../axios";

export const getProfile = async () => {
  const { data } = await api.get("/account/profile");
  return {
    account: {
      accountId: data.account.account_id,
      displayName: data.account.display_name,
      avatar: 0,
    },
    currency: {
      plays: data.currency.plays,
      sol: data.currency.sol,
      ton: data.currency.ton,
    },
    game_cat_battle_statistic: {
      gem: data.game_cat_battle_statistic.gem,
      shard: data.game_cat_battle_statistic.shard,
    },
  };
};
