"use client";
import { formatAddress } from "@/utils/web3";
import { CopyOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Image,
  Row,
  Typography,
} from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNetwork } from "../sonic/contexts/NetworkContext";

export default function ExternalWalletConnected() {
  const { publicKey, disconnect } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const { network } = useNetwork();

  const connection = new Connection(network.endpoint);

  const fetchBalance = async () => {
    if (!publicKey) return;
    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (e) {
      console.error("Error fetching balance:", e);
      toast.error("Failed to fetch balance");
    }
  };

  useEffect(() => {
    if (publicKey) {
      fetchBalance();
      const interval = setInterval(fetchBalance, 30000);
      return () => clearInterval(interval);
    } else {
      setBalance(null);
    }
  }, [network, publicKey]);

  return (
    <div>
      <div style={{ padding: "10px 0px" }}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Flex vertical style={{ alignItems: "center" }}>
              <div style={{ padding: 10 }}>
                <Image
                  src={"/icons/play/solana-icon.png"}
                  preview={false}
                  width={80}
                  alt=""
                />
              </div>
              <div
                style={{
                  background: "#DBDBDB",
                  padding: "10px",
                  borderRadius: 10,
                  marginBottom: 10,
                  width: "50%",
                }}
              >
                <Flex
                  align="center"
                  vertical
                  gap={10}
                  style={{ marginBottom: 5 }}
                >
                  <Typography.Text
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      background: "white",
                      borderRadius: 10,
                      width: "100%",
                    }}
                  >
                    {balance}{" "}
                    <Typography.Text style={{ color: "#8B4FF5" }}>
                      SOL
                    </Typography.Text>
                  </Typography.Text>
                  <Flex
                    style={{
                      fontWeight: "bold",
                      flex: 1,
                      textAlign: "center",
                      background: "white",
                      borderRadius: 10,
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Text>
                      {formatAddress(publicKey?.toBase58()!)}
                    </Typography.Text>
                    <CopyToClipboard text={publicKey?.toBase58()!}>
                      <Button icon={<CopyOutlined />} type="text"></Button>
                    </CopyToClipboard>
                  </Flex>
                </Flex>
              </div>
            </Flex>
          </Col>
          <Col span={24} style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Divider />
            <Typography.Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Privacy
            </Typography.Text>
          </Col>
          <Col span={24} style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Flex vertical gap={10}>
              <button
                onClick={() => disconnect()}
                className="px-6 py-3 bg-[#53ADE3] text-white rounded-md transition-all text-base hover:cursor-pointer"
              >
                <span className="border-white/20 pl-2 text-center w-full">
                  Disconnect
                </span>
              </button>
            </Flex>
          </Col>
        </Row>
      </div>
    </div>
  );
}
