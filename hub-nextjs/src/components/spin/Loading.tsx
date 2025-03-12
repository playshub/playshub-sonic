import { Spin } from "antd";

export default function Loading() {
  return (
    <div
      style={{
        height: "calc(100vh)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "url('/images/login_bg.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Spin tip="Loading" size="large"></Spin>
    </div>
  );
}
