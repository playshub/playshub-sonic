"use client";
import { useSolWallet } from "@/components/providers/SolanaWalletProvider";
import { useCreateWalletTutorial } from "@/components/providers/CreateWalletTutorialProvider";
import WalletInitialize from "@/components/wallet/WalletInitialize";
import { formatAddress } from "@/utils/web3";
import {
  CopyOutlined,
  DeleteOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Image,
  Modal,
  Popconfirm,
  Row,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useImportWalletTutorial } from "@/components/providers/ImportWalletTutorialProvider";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/apis/account/profile";

export default function Wallet() {
  const { isInitialized, wallet, deleteWallet, balance, refetchBalance } =
    useSolWallet();
  const [open, setOpen] = useState(false);
  const {
    walletAddressRef,
    tourActive: createWalletTutorialTourActive,
    setRun: setCreateWalletTutorialRun,
  } = useCreateWalletTutorial();

  const {
    tourActive: importWalletTutorialTourActive,
    setRun: setImportWalletTutorialRun,
  } = useImportWalletTutorial();

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    if (createWalletTutorialTourActive) {
      setTimeout(() => {
        setCreateWalletTutorialRun(true);
      }, 400);
    }
  }, [createWalletTutorialTourActive]);

  useEffect(() => {
    if (importWalletTutorialTourActive) {
      setTimeout(() => {
        setImportWalletTutorialRun(true);
      }, 400);
    }
  }, [importWalletTutorialTourActive]);

  if (!isInitialized) {
    return <WalletInitialize />;
  }

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
                  width: "80%",
                }}
              >
                <Flex align="center" gap={10} style={{ marginBottom: 5 }}>
                  <Typography.Text style={{ width: 60 }}>
                    Available:
                  </Typography.Text>
                  <Typography.Text
                    style={{
                      fontWeight: "bold",
                      flex: 1,
                      textAlign: "center",
                      background: "white",
                      borderRadius: 10,
                    }}
                  >
                    {balance}{" "}
                    <Typography.Text style={{ color: "#8B4FF5" }}>
                      SOL
                    </Typography.Text>
                  </Typography.Text>
                  <Button
                    style={{ width: 60 }}
                    type="primary"
                    onClick={refetchBalance}
                  >
                    Refresh
                  </Button>
                </Flex>
                <Flex align="center" gap={10}>
                  <Typography.Text style={{ width: 60 }}>
                    Pending:
                  </Typography.Text>
                  <Typography.Text
                    style={{
                      fontWeight: "bold",
                      flex: 1,
                      textAlign: "center",
                      background: "white",
                      borderRadius: 10,
                    }}
                  >
                    {profileData?.currency.sol || 0}{" "}
                    <Typography.Text style={{ color: "#8B4FF5" }}>
                      SOL
                    </Typography.Text>
                  </Typography.Text>
                  <Button style={{ width: 60 }} disabled>
                    Claim
                  </Button>
                </Flex>
              </div>
              <Flex
                align="center"
                style={{
                  background: "#DBDBDB",
                  padding: "5px 40px",
                  borderRadius: 10,
                }}
                ref={walletAddressRef}
              >
                <Typography.Text style={{ flex: 1 }}>
                  {formatAddress(wallet?.publicKey!)}
                </Typography.Text>
                <CopyToClipboard text={wallet?.publicKey!}>
                  <Button icon={<CopyOutlined />} type="text"></Button>
                </CopyToClipboard>
              </Flex>
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
              <Button
                icon={<ExportOutlined />}
                size="large"
                type="primary"
                onClick={() => setOpen(true)}
              >
                Export Private Key
              </Button>
              <Popconfirm
                title="Delete Wallet"
                description="Are you sure to delete this wallet?"
                onConfirm={() => deleteWallet()}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={<DeleteOutlined />}
                  size="large"
                  style={{ background: "#F3816F", color: "white" }}
                >
                  Delete Wallet
                </Button>
              </Popconfirm>
            </Flex>
          </Col>
        </Row>
      </div>

      <Modal
        open={open}
        footer={null}
        closeIcon={null}
        onCancel={() => setOpen(false)}
      >
        <Flex vertical gap={10}>
          <div>{wallet?.privateKey}</div>
          <CopyToClipboard text={wallet?.privateKey!}>
            <Button
              icon={<CopyOutlined />}
              type="primary"
              onClick={() => setOpen(false)}
            >
              Copy
            </Button>
          </CopyToClipboard>
        </Flex>
      </Modal>
    </div>
  );
}
