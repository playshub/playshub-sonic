"use client";
import { useSolWallet } from "@/components/providers/SolanaWalletProvider";
import { useCreateWalletTutorial } from "@/components/providers/CreateWalletTutorialProvider";
import { formatAddress } from "@/utils/web3";
import {
  CopyOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  ExportOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Image,
  Input,
  List,
  Modal,
  Popconfirm,
  Row,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useImportWalletTutorial } from "@/components/providers/ImportWalletTutorialProvider";
import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useNotification } from "@/components/providers/NotificationProvider";
import useTonBalance from "@/hooks/useTonBalance";

export default function Wallet() {
  const notification = useNotification()!;
  const {
    isInitialized,
    wallet,
    deleteWallet,
    balance,
    refetchBalance,
    generateWallet,
    importWallet,
  } = useSolWallet();
  const [openExport, setOpenExport] = useState(false);
  const [openImport, setOpenImport] = useState(false);

  const [privateKey, setPrivateKey] = useState("");

  const {
    walletAddressRef,
    tourActive: createWalletTutorialTourActive,
    setRun: setCreateWalletTutorialRun,
  } = useCreateWalletTutorial();
  const tonAddress = useTonAddress();
  const {
    tourActive: importWalletTutorialTourActive,
    setRun: setImportWalletTutorialRun,
  } = useImportWalletTutorial();

  const [tonConnectUI] = useTonConnectUI();
  const tonBalance = useTonBalance();

  const [chain, setChain] = useState("SOL");
  const { open: openTonConnectModal } = useTonConnectModal();

  const wallets = [
    {
      name: "SOL",
      image: "/icons/play/solana-icon.png",
      amount: balance,
      actions: [
        isInitialized ? (
          <Space>
            <Typography.Text>
              {formatAddress(wallet?.publicKey!)}
            </Typography.Text>
            <Popconfirm
              title="Delete Wallet"
              description="Are you sure to delete this wallet?"
              onConfirm={() => deleteWallet()}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DisconnectOutlined />}></Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                generateWallet();
              }}
            >
              Create
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setOpenImport(true);
              }}
            >
              Import
            </Button>
          </Space>
        ),
      ],
    },
    {
      name: "TON",
      image: "/icons/play/ton-icon.png",
      amount: tonBalance,
      actions: [
        tonConnectUI.connected ? (
          <Space>
            <Typography.Text>{formatAddress(tonAddress)}</Typography.Text>
            <Button
              onClick={async () => {
                await tonConnectUI.disconnect();
              }}
              icon={<DisconnectOutlined />}
            ></Button>
          </Space>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              openTonConnectModal();
            }}
          >
            Connect
          </Button>
        ),
      ],
    },
  ];

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

  return (
    <div>
      <div style={{ height: "calc(100vh - 68px - 10px)", padding: "10px 0px" }}>
        <Row gutter={[0, 10]} style={{ height: "100%" }}>
          {chain === "SOL" && (
            <>
              <Col span={24}>
                <Flex vertical style={{ alignItems: "center" }} gap={10}>
                  <div>
                    <Image
                      src={"/icons/play/solana-icon.png"}
                      preview={false}
                      width={80}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      background: "white",
                      padding: "10px",
                      borderRadius: 10,
                      marginBottom: 10,
                      width: "90%",
                    }}
                  >
                    <Flex
                      vertical
                      align="center"
                      gap={10}
                      style={{ marginBottom: 5 }}
                    >
                      <div
                        style={{
                          background: "white",
                          borderRadius: 10,
                          textAlign: "center",
                          width: "60%",
                        }}
                      >
                        <Typography.Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 16,
                          }}
                        >
                          {balance}{" "}
                          <Typography.Text
                            style={{ color: "#8B4FF5", fontSize: 16 }}
                          >
                            SOL
                          </Typography.Text>
                        </Typography.Text>
                      </div>

                      <Button disabled>Transfer</Button>
                    </Flex>
                  </div>
                </Flex>
              </Col>
              <Col span={24} flex={1}>
                <div style={{ width: "90%", margin: "auto" }}>
                  <Flex gap={10} align="center" justify="center">
                    <Button
                      icon={<ExportOutlined />}
                      size="large"
                      type="primary"
                      onClick={() => setOpenExport(true)}
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
                </div>
              </Col>
            </>
          )}
          {chain === "TON" && (
            <Col span={24}>
              <Flex vertical style={{ alignItems: "center" }} gap={10}>
                <div>
                  <Image
                    src={"/icons/play/ton-icon.png"}
                    preview={false}
                    width={80}
                    alt=""
                  />
                </div>
                <div
                  style={{
                    background: "white",
                    padding: "10px",
                    borderRadius: 10,
                    marginBottom: 10,
                    width: "90%",
                  }}
                >
                  <Flex
                    vertical
                    align="center"
                    gap={10}
                    style={{ marginBottom: 5 }}
                  >
                    <div
                      style={{
                        background: "white",
                        borderRadius: 10,
                        textAlign: "center",
                        width: "60%",
                      }}
                    >
                      <Typography.Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        {tonBalance}{" "}
                        <Typography.Text
                          style={{ color: "#8B4FF5", fontSize: 16 }}
                        >
                          TON
                        </Typography.Text>
                      </Typography.Text>
                    </div>

                    <Button type="default" disabled>
                      Transfer
                    </Button>
                  </Flex>
                </div>
              </Flex>
            </Col>
          )}

          <Col span={24} style={{ marginTop: "auto" }}>
            <div>
              <div
                style={{
                  background: "white",
                  padding: "10px",
                  borderRadius: 10,
                  marginTop: 40,
                }}
              >
                <List
                  header={
                    <Typography.Text style={{ fontWeight: "bold" }}>
                      Select tokens:
                    </Typography.Text>
                  }
                  itemLayout="horizontal"
                  dataSource={wallets}
                  renderItem={(item) => (
                    <List.Item
                      actions={item.actions}
                      onClick={() => {
                        setChain(item.name);
                      }}
                      style={{
                        background: item.name === chain ? "#F5F5F5" : "white",
                      }}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.image} size={50} />}
                        title={item.name}
                        description={item.amount}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Modal
        open={openExport}
        footer={null}
        closeIcon={null}
        onCancel={() => setOpenExport(false)}
      >
        <Flex vertical gap={10}>
          <div>{wallet?.privateKey}</div>
          <CopyToClipboard text={wallet?.privateKey!}>
            <Button
              icon={<CopyOutlined />}
              type="primary"
              onClick={() => setOpenExport(false)}
            >
              Copy
            </Button>
          </CopyToClipboard>
        </Flex>
      </Modal>

      <Modal
        open={openImport}
        footer={null}
        closeIcon={null}
        onCancel={() => setOpenImport(false)}
      >
        <Flex vertical gap={10}>
          <div>
            <Input.TextArea
              style={{ height: 100 }}
              placeholder="Please input your private key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            ></Input.TextArea>
          </div>
          <Button
            icon={<ImportOutlined />}
            type="primary"
            onClick={() => {
              try {
                importWallet(privateKey);
              } catch (error) {
                notification.error("Invalid private key");
                console.error(error);
              }
            }}
            disabled={!privateKey}
          >
            Import
          </Button>
        </Flex>
      </Modal>
    </div>
  );
}
