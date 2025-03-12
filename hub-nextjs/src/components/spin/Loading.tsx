import { Spin } from "antd";

export default function Loading() {
  return (
    <Spin tip="Loading" size="large">
      <div
        style={{
          height: "calc(100vh)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    </Spin>
  );
}
