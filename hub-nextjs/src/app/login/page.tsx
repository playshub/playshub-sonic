"use client";
import { login } from "@/apis/account/login";
import { TELEGRAM_BOT_USERNAME } from "@/utils/constants";
import { setUser } from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import { LoginButton } from "@telegram-auth/react";
import { Flex, Result } from "antd";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

  const { isError, mutateAsync } = useMutation({
    mutationFn: async (params: {
      telegramId: string;
      displayName: string;
      languageCode: string;
      referralId?: string;
    }) =>
      login(
        params.telegramId,
        params.displayName,
        params.languageCode,
        params.referralId
      ),
  });

  if (isError) {
    return (
      <Result
        status="500"
        title="Under maintenance"
        subTitle="Please try again later"
      />
    );
  }

  return (
    <Flex
      align="center"
      vertical
      style={{
        height: "100vh",
        backgroundImage: "url(/images/login_bg.png)",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ marginTop: "auto", padding: 20, marginBottom: 80 }}>
        <LoginButton
          botUsername={TELEGRAM_BOT_USERNAME}
          onAuthCallback={async (data) => {
            await mutateAsync({
              telegramId: data.id.toString(),
              displayName: `${data.first_name} ${data.last_name}`,
              languageCode: "en",
            });

            setUser(data);
            router.push("/");
          }}
        />
      </div>
    </Flex>
  );
}

export default Login;
