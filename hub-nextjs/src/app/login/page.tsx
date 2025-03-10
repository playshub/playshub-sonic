"use client";
import { login } from "@/apis/account/login";
import { TELEGRAM_BOT_USERNAME } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { LoginButton } from "@telegram-auth/react";
import { Flex, Result } from "antd";
import { useEffect } from "react";

function Login() {
  const { isError, mutate, error } = useMutation({
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
    <Flex align="center" vertical style={{ height: "100vh" }}>
      <div style={{ marginTop: "auto", padding: 20 }}>
        <LoginButton
          botUsername={TELEGRAM_BOT_USERNAME}
          onAuthCallback={(data) => {
            mutate({
              telegramId: data.id.toString(),
              displayName: data.first_name,
              languageCode: "en",
            });
          }}
        />
      </div>
    </Flex>
  );
}

export default Login;
