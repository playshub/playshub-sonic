import { CaretRightOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLetAirdropTutorial } from "../providers/LetAirdropTutorialProvider";

export default function StartAirdropTaskModal() {
  const { shouldActiveTour, setRun } = useLetAirdropTutorial();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useRouter();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (shouldActiveTour) {
      setIsModalOpen(true);
    }
  }, [shouldActiveTour]);

  return (
    <>
      <Modal
        title={null}
        open={isModalOpen}
        onOk={handleOk}
        closeIcon={null}
        footer={null}
        styles={{
          content: {
            padding: 0,
            borderRadius: 10,
            width: "90%",
            margin: "auto",
            maxWidth: 350,
          },
        }}
      >
        <div
          style={{
            borderRadius: 10,
            display: "flex",
            backgroundImage: "url(/images/popup.png)",
            aspectRatio: 996 / 1446,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              width: "60%",
              paddingBottom: 20,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "auto",
            }}
          >
            <Image
              src="/images/join_btn.png"
              preview={false}
              style={{ marginBottom: 10, cursor: "pointer" }}
              onClick={() => {
                setIsModalOpen(false);
                navigate.push("/earn");
                setTimeout(() => {
                  setRun(true);
                }, 1500);
              }}
            />
            <Image
              src="/images/later_btn.png"
              preview={false}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
