import * as React from "react";
import { DEFAULT_INIT_STATE } from "./constants";

const useProgramHooks = () => {
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [initialState, setInitialState] = React.useState<string>(DEFAULT_INIT_STATE);
  const [machineState, setMachineState] = React.useState<string>(DEFAULT_INIT_STATE);

  const handleStart = React.useCallback(()=> {
    setIsRunning(true);
    console.log("running");
  }, [])

  const handleStop = React.useCallback(()=> {
    setIsRunning(false);
    console.log("stopping");
  }, [])

  const resetMachineState = React.useCallback(() => {
    setMachineState(initialState);
  },[initialState])

  return {isRunning, machineState, setInitialState, setMachineState, handleStart, handleStop, resetMachineState};
}

export default useProgramHooks;