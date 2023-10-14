import * as React from "react";
import TapesComponent from "./tape";
import ProgramComponent from "./program";
import useTapes from "../hooks/use-tape-hooks";
import useProgram from "../hooks/use-program-hooks";
import useMachineStates from "../hooks/use-machine-state-hooks";
import StateComponent from "./state";
import { isStopState } from "./state/machine-state-helper";

const Simulator: React.FC = () => {
  const { tapes, handleAddTape, handleRemoveTape } = useTapes();
  const machineStates = useMachineStates();
  const { steps, setSteps, isRunning, setIsRunning } = machineStates;
  const { tm, machineState, handleStart, handleStop } = useProgram({
    tapes,
    setIsRunning,
    setSteps,
  });
  const [intervalID, setIntervalID] = React.useState<NodeJS.Timeout>(null);

  React.useEffect(() => {
    if (isStopState(machineState)) setIsRunning(false);

    if (isRunning) {
      const interval = setInterval(tm.iterate, 50, tapes);
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
      />
    </div>
  );
};

export default Simulator;
