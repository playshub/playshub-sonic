"use client";
import { login } from "@/apis/account/login";
import { TELEGRAM_BOT_USERNAME } from "@/utils/constants";
import { setUser } from "@/utils/storage";
import Icon from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { LoginButton, TelegramAuthData } from "@telegram-auth/react";
import { Button, Flex, notification, Result } from "antd";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

  const { isError, mutateAsync } = useMutation({
    mutationFn: async (data: TelegramAuthData) => login(data),
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
      <Flex
        vertical
        gap={10}
        style={{ marginTop: "auto", padding: 20, marginBottom: 80 }}
      >
        <LoginButton
          botUsername={TELEGRAM_BOT_USERNAME}
          onAuthCallback={async (data) => {
            await mutateAsync(data);

            setUser(data);
            router.push("/");
          }}
        />
        <Button
          type="primary"
          icon={<Icon />}
          style={{ fontSize: 14, fontWeight: 500, padding: "20px" }}
          onClick={() => {
            notification.info({
              message: "This feature is coming soon",
            });
          }}
        >
          Login with Tiktok
        </Button>
      </Flex>
    </Flex>
  );
}

export default Login;
