"use client";
import { TELEGRAM_BOT_USERNAME } from "@/utils/constants";
import { LoginButton } from "@telegram-auth/react";
import { Button, Flex } from "antd";

function Login() {
  return (
    <Flex align="center" vertical>
      <LoginButton
        botUsername={TELEGRAM_BOT_USERNAME}
        onAuthCallback={(data) => {
          console.log(data);
          // call your backend here to validate the data and sign in the user
        }}
      />
    </Flex>
  );
}

export default Login;
