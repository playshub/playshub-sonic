import { getPvKey, getUser } from "@/utils/storage";

export const getCatBattleLink = ({
  user: { id, firstName, lastName, username, languageCode, pvKey },
}: {
  user: {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;
    languageCode: string;
    pvKey: string | null;
  };
}) => {
  const userData = {
    id,
    first_name: firstName,
    last_name: lastName,
    username,
    language_code: languageCode,
  };

  const encodedUser = encodeURIComponent(JSON.stringify(userData));

  return `https://catb-sonic.playshub.io/?tgWebAppData&user=${encodedUser}&tgWebAppPlatform=web&pv_key=${pvKey}`;
};

export const useOpenCatBattleLink = () => {
  const user = getUser();
  const pvKey = getPvKey();

  return {
    link: getCatBattleLink({
      user: {
        id: user?.id.toString(),
        firstName: user?.first_name,
        lastName: user?.last_name,
        username: user?.username,
        languageCode: "en",
        pvKey: pvKey,
      },
    }),
  };
};
