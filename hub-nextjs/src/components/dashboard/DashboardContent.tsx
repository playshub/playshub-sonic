import { useMutation } from "@tanstack/react-query";
import { login } from "../../apis/account/login";
import Loading from "../../components/spin/Loading";
import { PropsWithChildren, useEffect } from "react";
import { Button, Result } from "antd";
import Joyride from "react-joyride";
import { useCreateWalletTutorial } from "../providers/CreateWalletTutorialProvider";
import { useImportWalletTutorial } from "../providers/ImportWalletTutorialProvider";
import { useLetAirdropTutorial } from "../providers/LetAirdropTutorialProvider";

export default function DashboardContent({ children }: PropsWithChildren) {
  const {
    run: runCreateWalletTutorial,
    handleJoyrideCallback: handleCreateWalletTutorialJoyrideCallback,
    steps: createWalletTutorialSteps,
    stepIndex: createWalletTutorialStepIndex,
  } = useCreateWalletTutorial();

  const {
    run: runImportWalletTutorial,
    handleJoyrideCallback: handleImportWalletTutorialJoyrideCallback,
    steps: importWalletTutorialSteps,
    stepIndex: importWalletTutorialStepIndex,
  } = useImportWalletTutorial();

  const {
    run: runLetAirdropTutorial,
    handleJoyrideCallback: handleLetAirdropTutorialJoyrideCallback,
    steps: letAirdropTutorialSteps,
    stepIndex: letAirdropTutorialStepIndex,
  } = useLetAirdropTutorial();

  return (
    <>
      <Joyride
        callback={handleCreateWalletTutorialJoyrideCallback}
        continuous
        // run={runCreateWalletTutorial}
        run={false} // WARNING: ignore tutorial for now
        steps={createWalletTutorialSteps}
        stepIndex={createWalletTutorialStepIndex}
        styles={{
          tooltip: {
            backgroundColor: "#FFF8E4",
            color: "#D05125",
            textTransform: "uppercase",
            fontWeight: "bold",
          },
          tooltipContent: {
            padding: "0px",
          },
          tooltipFooter: {
            marginTop: "5px",
          },
        }}
        floaterProps={{
          styles: {
            arrow: {
              color: "#FFF8E4",
            },
          },
        }}
      />
      <Joyride
        callback={handleImportWalletTutorialJoyrideCallback}
        continuous
        // run={runImportWalletTutorial}
        run={false} // WARNING: ignore tutorial for now
        steps={importWalletTutorialSteps}
        stepIndex={importWalletTutorialStepIndex}
        styles={{
          tooltip: {
            backgroundColor: "#FFF8E4",
            color: "#D05125",
            textTransform: "uppercase",
            fontWeight: "bold",
          },
          tooltipContent: {
            padding: "0px",
          },
          tooltipFooter: {
            marginTop: "5px",
          },
        }}
        floaterProps={{
          styles: {
            arrow: {
              color: "#FFF8E4",
            },
          },
        }}
      />
      <Joyride
        callback={handleLetAirdropTutorialJoyrideCallback}
        continuous
        run={runLetAirdropTutorial}
        steps={letAirdropTutorialSteps}
        stepIndex={letAirdropTutorialStepIndex}
        floaterProps={{
          styles: {
            floater: {
              display: "none",
            },
          },
        }}
      />
      {children}
    </>
  );
}
