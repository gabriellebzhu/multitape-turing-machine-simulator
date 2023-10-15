import * as React from "react";
import { isStopState } from "../state/machine-state-helper";

interface ProgramComponentProps {
  isRunning: boolean;
  isStepping: boolean;
  machineState: string;
  handleStart: (programString: string) => void;
  handleStop: () => void;
  handleStep: (programString: string) => void;
  handleReset: () => void;
}

const ProgramComponent: React.FC<ProgramComponentProps> = (
  props: ProgramComponentProps
) => {
  const {
    handleStart,
    handleStop,
    handleStep,
    isRunning,
    isStepping,
    machineState,
    handleReset,
  } = props;
  const [programInput, setProgramInput] = React.useState<string>(
    "0 1 1 0 0 r r 0\n0 0 0 0 0 r r halt-accept"
  );

  const startStepIsDisabled =
    isRunning || isStepping || isStopState(machineState);

  const handleTextChange = React.useCallback(
    (text: string) => {
      setProgramInput(text);
    },
    [setProgramInput]
  );

  const handleStartButton = React.useCallback(() => {
    if (startStepIsDisabled) return;
    handleStart(programInput);
  }, [startStepIsDisabled, programInput, handleStart]);

  const handleStepButton = React.useCallback(() => {
    if (startStepIsDisabled) return;
    handleStep(programInput);
  }, [programInput, startStepIsDisabled, handleStep]);

  const handleStopButton = React.useCallback(() => {
    if (!isRunning) return;
    handleStop();
  }, [isRunning, handleStop]);

  return (
    <div className="tape-container">
      <div>Program</div>
      <div className="program-input__container">
        <div className="program-input__controller">
          <button disabled={startStepIsDisabled} onClick={handleStartButton}>
            Start
          </button>
          <button disabled={!isRunning} onClick={handleStopButton}>
            Pause
          </button>
          <button disabled={startStepIsDisabled} onClick={handleStepButton}>
            Step
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <textarea
          onChange={(e) => handleTextChange(e.target.value)}
          defaultValue={"0 1 1 0 0 r r 0\n0 0 0 0 0 r r halt-accept"}
        />
      </div>
    </div>
  );
};

export default ProgramComponent;
