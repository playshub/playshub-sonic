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
import { useQuery } from "@tanstack/react-query";
import { checkCompletedAllAirdropTask } from "@/apis/quest/check-quest";

export interface LetAirdropTutorialProviderContextValueProps {
  airdropTaskRef: React.RefObject<HTMLDivElement>;
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

const LetAirdropTutorialProviderContext =
  createContext<LetAirdropTutorialProviderContextValueProps | null>(null);

export const useLetAirdropTutorial = () =>
  useContext(LetAirdropTutorialProviderContext)!;

function LetAirdropTutorialProvider({ children }: PropsWithChildren<{}>) {
  const {
    data: isCompletedAllAirdropTask,
    isLoading: isCompletedAllAirdropTaskLoading,
  } = useQuery({
    queryKey: ["checkCompletedAllAirdropTask"],
    queryFn: checkCompletedAllAirdropTask,
  });

  const airdropTaskRef = useRef<HTMLDivElement>(null);

  const [run, setRun] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const didMount = useDidMount();

  const [tourActive, setTourActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: Step[] = [
    {
      target: airdropTaskRef.current!,
      content: "",
      disableBeacon: true,
      hideCloseButton: true,
    },
  ];

  const shouldActiveTour = useMemo(() => {
    return (
      !isCompletedAllAirdropTask &&
      !isCompletedAllAirdropTaskLoading &&
      isFirstTime
    );
  }, [
    isCompletedAllAirdropTask,
    isCompletedAllAirdropTaskLoading,
    isFirstTime,
  ]);

  useEffect(() => {
    if (didMount && !isCompletedAllAirdropTaskLoading) {
      setIsFirstTime(false);
    }
  }, [didMount, isCompletedAllAirdropTaskLoading]);

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
    <LetAirdropTutorialProviderContext.Provider
      value={{
        airdropTaskRef,
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
    </LetAirdropTutorialProviderContext.Provider>
  );
}

export default LetAirdropTutorialProvider;
