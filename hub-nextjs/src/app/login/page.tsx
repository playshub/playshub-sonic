"use client";
import { TELEGRAM_BOT_USERNAME } from "@/utils/constants";
import { LoginButton } from "@telegram-auth/react";
import { Button, Flex } from "antd";

function Login() {
  return (
    <Flex align="center" vertical style={{ height: "100vh" }}>
      <div style={{ marginTop: "auto", padding: 20 }}>
        <LoginButton
          botUsername={TELEGRAM_BOT_USERNAME}
          onAuthCallback={(data) => {
            console.log(data);
            // call your backend here to validate the data and sign in the user
          }}
        />
      </div>
    </Flex>
  );
}

export default Login;
