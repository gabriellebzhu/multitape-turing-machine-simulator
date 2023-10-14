import * as React from "react";
import { isStopState } from "../state/machine-state-helper";

interface ProgramComponentProps {
  isRunning: boolean;
  isStepping: boolean;
  machineState: string;
  handleStart: (programString: string) => void;
  handleStop: () => void;
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
    handleStart(programInput);
  }, [programInput, handleStart]);

  return (
    <div className="tape-container">
      <div>Program</div>
      <div className="program-input__container">
        <div className="program-input__controller">
          <button>Reset</button>
          <button disabled={startStepIsDisabled} onClick={handleStartButton}>
            Start
          </button>
          <button disabled={!isRunning} onClick={handleStop}>
            Pause
          </button>
          <button disabled={startStepIsDisabled} onClick={handleStep}>
            Step
          </button>
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
