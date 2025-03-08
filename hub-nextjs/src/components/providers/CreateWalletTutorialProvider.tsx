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

export interface CreateWalletTutorialContextValueProps {
  createWalletButtonRef: React.RefObject<HTMLButtonElement>;
  walletAddressRef: React.RefObject<HTMLDivElement>;
  earnAreaRef: React.RefObject<HTMLDivElement>;
  playGameAreaRef: React.RefObject<HTMLDivElement>;

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

export interface CreateWalletTutorialContextProps {}

const CreateWalletTutorialContext =
  createContext<CreateWalletTutorialContextValueProps | null>(null);

export const useCreateWalletTutorial = () =>
  useContext(CreateWalletTutorialContext)!;

function CreateWalletTutorialProvider({
  children,
}: PropsWithChildren<CreateWalletTutorialContextProps>) {
  const router = useRouter();
  const { data: apiWallet, isLoading: isLoadingApiWallet } = useApiWallet();
  const { isInitialized } = useSolWallet();

  const createWalletButtonRef = useRef<HTMLButtonElement>(null);
  const walletAddressRef = useRef<HTMLDivElement>(null);
  const earnAreaRef = useRef<HTMLDivElement>(null);
  const playGameAreaRef = useRef<HTMLDivElement>(null);

  const [run, setRun] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const didMount = useDidMount();

  const [tourActive, setTourActive] = useState(false);

  const [stepIndex, setStepIndex] = useState(0);

  const steps: Step[] = [
    {
      target: createWalletButtonRef.current!,
      content: "Create a solana wallet to receive your rewards",
      disableBeacon: true,
      placement: "bottom",
      hideCloseButton: true,
      hideFooter: true,
      spotlightClicks: true,
      disableOverlayClose: true,
    },
    {
      target: walletAddressRef.current!,
      content: "Here is your solana wallet address",
      disableBeacon: true,
      placement: "bottom",
      hideBackButton: true,
      hideCloseButton: true,
      disableOverlayClose: true,
      disableScrolling: true,
    },
    {
      target: earnAreaRef.current!,
      content: "Complete tasks to earn daily bonus",
      disableBeacon: true,
      placement: "bottom",
      hideBackButton: true,
      hideCloseButton: true,
      disableOverlayClose: true,
      disableScrolling: true,
    },
    {
      target: playGameAreaRef.current!,
      content: "Play game to earn more and receive a big airdrop!",
      disableBeacon: true,
      placement: "bottom",
      hideBackButton: true,
      hideCloseButton: true,
      disableOverlayClose: true,
      disableScrolling: true,
    },
  ];

  const shouldActiveTour = useMemo(() => {
    return (
      !isSolanaWallet(apiWallet) &&
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
      if (index === 0) {
        setTimeout(() => {
          setRun(true);
        }, 500);
      } else if (index === 1) {
        setRun(false);
        setStepIndex(2);
        router.push("/earn");
      } else if (index === 2) {
        setRun(false);
        setStepIndex(3);
        router.push("/");
      } else if (index === 3) {
        setStepIndex(4);
      }
    }
  };

  return (
    <CreateWalletTutorialContext.Provider
      value={{
        createWalletButtonRef,
        walletAddressRef,
        earnAreaRef,
        playGameAreaRef,

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
    </CreateWalletTutorialContext.Provider>
  );
}

export default CreateWalletTutorialProvider;
