import * as React from "react";
import { DEFAULT_INIT_STATE } from "../machine/program/constants";

export interface MachineStatesReturn {
  isStepping: boolean;
  isRunning: boolean;
  initialState: string;
  setIsRunning: (isRunning: boolean) => void;
  setIsStepping: (isStepping: boolean) => void;
  setInitialState: (initialState: string) => void;
  steps: number;
  setSteps: (f: React.SetStateAction<number>) => void;
}

const useMachineStates = (): MachineStatesReturn => {
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [initialState, setInitialState] =
    React.useState<string>(DEFAULT_INIT_STATE);
  const [steps, setSteps] = React.useState<number>(0);
  const [isStepping, setIsStepping] = React.useState<boolean>(false);

  return {
    isStepping,
    isRunning,
    initialState,
    setIsStepping,
    setIsRunning,
    setInitialState,
    steps,
    setSteps,
  };
};

export default useMachineStates;
