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
      <p>
        A multitape Turing Machine is a variation on a normal, single-tape
        machine. Instead of the singular tape, multiple tapes are introduced
        with their own string and pointer to a position in that string. At any
        given point, as we are running a multitape machine, it reads the symbol
        at the pointer in each tape, and tries to find an instruction that
        corresponds to it. That instruction includes the current state, a symbol
        to read for every tape, a symbol to write for every tape, a direction to
        move for every tape, and the new state that this results in.
      </p>
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
      <a href="https://github.com/gabriellebzhu/multitape-turing-machine-simulator">
        <p>Github Repository</p>
      </a>
    </div>
  );
};

export default Simulator;
