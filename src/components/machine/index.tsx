import * as React from "react";
import TapesComponent from "./tape";
import ProgramComponent from "./program";
import useTapes from "../hooks/use-tape-hooks";
import useProgram from "../hooks/use-program-hooks";
import useMachineStates from "../hooks/use-machine-state-hooks";
import StateComponent from "./state";
import { isStopState } from "./state/machine-state-helper";

const Simulator: React.FC = () => {
  const { tapes, handleAddTape, handleRemoveTape, resetTapes } = useTapes();
  const machineStates = useMachineStates();
  const {
    steps,
    setSteps,
    isRunning,
    isStepping,
    setIsRunning,
    setIsStepping,
    initialState,
  } = machineStates;
  const { tm, machineState, handleStart, handleStop, handleStep } = useProgram({
    tapes,
    setIsRunning,
    setIsStepping,
    setSteps,
  });
  const [intervalID, setIntervalID] = React.useState<NodeJS.Timeout>(null);

  const handleReset = React.useCallback(() => {
    setIsRunning(false);
    setIsStepping(false);
    setSteps(0);
    tm?.setState(initialState);
    resetTapes();
  }, [setIsRunning, setIsStepping, setSteps, tm, resetTapes]);

  React.useEffect(() => {
    if (isStopState(machineState)) setIsRunning(false);

    if (isRunning) {
      const interval = setInterval(tm.iterate, 1000, tapes, machineState);
      setIntervalID(interval);
      return () => clearInterval(interval);
    }

    if (intervalID) clearInterval(intervalID);
  }, [isRunning, tapes, tm, machineState]);

  return (
    <div>
      <h1>Multitape Turing Simulator</h1>
      <TapesComponent
        tapes={tapes}
        handleAddTape={handleAddTape}
        handleRemoveTape={handleRemoveTape}
        isRunning={isRunning}
        isStepping={isStepping}
      />
      <StateComponent
        state={machineState}
        isRunning={isRunning}
        steps={steps}
      />
      <ProgramComponent
        handleStart={handleStart}
        handleStop={handleStop}
        isRunning={isRunning}
        handleStep={handleStep}
        isStepping={isStepping}
        machineState={machineState}
        handleReset={handleReset}
      />
    </div>
  );
};

export default Simulator;
