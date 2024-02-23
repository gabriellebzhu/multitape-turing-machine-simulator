import * as React from "react";
import TapesComponent from "./tape";
import ProgramComponent from "./program/program-component";
import useTapes from "../hooks/use-tape-hooks";
import useProgram from "../hooks/use-program-hooks";
import useMachineStates from "../hooks/use-machine-state-hooks";
import StateComponent from "./state/state-component";
import { isStopState } from "./state/machine-state-helper";

const Simulator: React.FC = () => {
  // TODO: Refactor the hooks as a provider/wrapper to avoid prop drilling.
  const { tapes, handleAddTape, handleRemoveTape, resetTapes } = useTapes();
  const {
    steps,
    setSteps,
    isRunning,
    isStepping,
    setIsRunning,
    setIsStepping,
    initialState,
  } = useMachineStates();
  const { tm, setTM, machineState, handleStart, handleStop, handleStep } =
    useProgram({
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
    setTM(null);
    resetTapes();
  }, [tapes.length, setIsRunning, setIsStepping, setSteps, tm, resetTapes]);

  React.useEffect(() => {
    if (isStopState(machineState)) setIsRunning(false);

    if (isRunning) {
      const interval = setInterval(tm.Iterate, 1000, tapes, machineState);
      setIntervalID(interval);
      return () => clearInterval(interval);
    }

    if (intervalID) clearInterval(intervalID);
  }, [isRunning, tapes, tm, machineState]);

  return (
    <div className="simulator">
      <h1>Multitape Turing Machine Simulator</h1>
      <div className="tape-state__container">
        <TapesComponent
          tapes={tapes}
          handleAddTape={handleAddTape}
          handleRemoveTape={handleRemoveTape}
          isRunning={isRunning}
          isStepping={isStepping}
          handleReset={handleReset}
        />
        <StateComponent
          state={machineState}
          isRunning={isRunning}
          steps={steps}
          errors={tm?.errors}
        />
      </div>
      <ProgramComponent
        handleStart={handleStart}
        handleStop={handleStop}
        isRunning={isRunning}
        handleStep={handleStep}
        isStepping={isStepping}
        machineState={machineState}
        handleReset={handleReset}
        tm={tm}
      />
    </div>
  );
};

export default Simulator;
