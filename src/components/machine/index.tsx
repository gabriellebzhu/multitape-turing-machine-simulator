import * as React from "react";
import TapesComponent from "./tape";
import ProgramComponent from "./program";
import StateComponent from "./state";

const Simulator: React.FC = () => {
  const { tapes, handleAddTape, handleRemoveTape } = useTapes();
  const machineStates = useMachineStates();
  const { steps, setSteps, isRunning, setIsRunning } = machineStates;
  const { tm, machineState, handleStart, handleStop } = useProgram({
    tapes,
    setIsRunning,
    setSteps,
  });
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
