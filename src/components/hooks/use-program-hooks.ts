import * as React from "react";
import TM from "../machine/program/tm";
import { DEFAULT_INIT_STATE } from "../machine/program/constants";
import { Tape } from "../machine/tape/tape";

interface Props {
  tapes: Array<Tape>;
  setIsRunning: (running: boolean) => void;
  setSteps: (f: React.SetStateAction<number>) => void;
}

const usePrograms = (props: Props) => {
  const { tapes, setIsRunning, setSteps } = props;
  const [prevProgramString, setPrevProgramString] = React.useState<string>("");
  const [prevTapeNum, setPrevTapeNum] = React.useState<number>(0);
  const [machineState, setMachineState] =
    React.useState<string>(DEFAULT_INIT_STATE);
  const [tm, setTM] = React.useState<TM | null>(null);

  const shouldCreateNewTM = (input: string) =>
    tm == null || input != prevProgramString || prevTapeNum != tapes.length;

  const handleStart = React.useCallback(
    (programString: string) => {
      if (shouldCreateNewTM(programString)) {
        const newTM = new TM(
          tapes.length,
          programString,
          machineState,
          setMachineState,
          setSteps
        );
        setTM(newTM);
        setPrevProgramString(programString);
        setPrevTapeNum(tapes.length);

        if (newTM.errors.length > 0) {
          setIsRunning(false);
          console.log(newTM.errors);
          return;
        }
        setIsRunning(true);
        return;
      }

      if (!tm) return;
      if (tm.errors.length > 0) {
        setIsRunning(false);
        console.log(tm.errors);
        return;
      }
      setIsRunning(true);

      console.log("running");
    },
    [tapes, setIsRunning, setTM, tm, prevProgramString, setPrevProgramString]
  );

  const handleStop = React.useCallback(() => {
    setIsRunning(false);
    console.log("stopping");
  }, []);

  return {
    tm,
    handleStart,
    handleStop,
    machineState,
    prevTapeNum,
    setMachineState,
    setPrevTapeNum,
  };
};

export default usePrograms;
