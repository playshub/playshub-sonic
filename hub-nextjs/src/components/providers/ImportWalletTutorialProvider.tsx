import { useDidMount } from "@/hooks/useDidMount";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CallBackProps, Step } from "react-joyride";
import { useRouter } from "next/navigation";
import useApiWallet from "@/hooks/useApiWallet";
import { isSolanaWallet } from "@/utils/web3";
import { useSolWallet } from "./SolanaWalletProvider";

export interface ImportWalletTutorialContextValueProps {
  importWalletButtonRef: React.RefObject<HTMLButtonElement>;
  run: boolean;
  setRun: (run: boolean) => void;
  handleJoyrideCallback: (data: CallBackProps) => void;
  steps: Step[];
  stepIndex: number;
  setStepIndex: (stepIndex: number) => void;
  tourActive: boolean;
  setTourActive: (tourActive: boolean) => void;
  shouldActiveTour: boolean;
}

const ImportWalletTutorialContext =
  createContext<ImportWalletTutorialContextValueProps | null>(null);

export const useImportWalletTutorial = () =>
  useContext(ImportWalletTutorialContext)!;

function ImportWalletTutorialProvider({ children }: PropsWithChildren<{}>) {
  const router = useRouter();
  const { data: apiWallet, isLoading: isLoadingApiWallet } = useApiWallet();
  const { isInitialized } = useSolWallet();

  const importWalletButtonRef = useRef<HTMLButtonElement>(null);

  const [run, setRun] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const didMount = useDidMount();

  const [tourActive, setTourActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: Step[] = [
    {
      target: importWalletButtonRef.current!,
      content:
        "Import your Solana Wallet from other device to receive your rewards",
      disableBeacon: true,
      placement: "bottom",
      hideCloseButton: true,
      spotlightClicks: true,
      disableOverlayClose: true,
    },
  ];

  const shouldActiveTour = useMemo(() => {
    return (
      isSolanaWallet(apiWallet) &&
      !isLoadingApiWallet &&
      isFirstTime &&
      !isInitialized
    );
  }, [apiWallet, isLoadingApiWallet, isFirstTime, isInitialized]);

  useEffect(() => {
    if (didMount && !isLoadingApiWallet) {
      setIsFirstTime(false);
    }
  }, [didMount, isLoadingApiWallet]);

  // WARNING: ignore tutorial for now
  // useEffect(() => {
  //   if (shouldActiveTour) {
  //     setTimeout(() => {
  //       router.push("/wallet");
  //       setTourActive(true);
  //     }, 400);
  //   } else {
  //     setTourActive(false);
  //   }
  // }, [shouldActiveTour]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { index, status, type } = data;

    if (status === "finished") {
      setRun(false);
      setTourActive(false);
    } else if (type === "step:after") {
      setStepIndex(index + 1);
    }
  };

  return (
    <ImportWalletTutorialContext.Provider
      value={{
        importWalletButtonRef,
        run,
        setRun,
        handleJoyrideCallback,
        steps,
        stepIndex,
        setStepIndex,
        tourActive,
        setTourActive,
        shouldActiveTour,
      }}
    >
      {children}
    </ImportWalletTutorialContext.Provider>
  );
}

export default ImportWalletTutorialProvider;
