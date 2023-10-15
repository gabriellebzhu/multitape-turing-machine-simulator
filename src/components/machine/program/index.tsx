import * as React from "react";
import { isStopState } from "../state/machine-state-helper";
import LineNumberAndHighlight from "./line-number-highlight";
import TM from "./tm";

interface ProgramComponentProps {
  isRunning: boolean;
  isStepping: boolean;
  tm: TM;
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
    tm,
  } = props;
  const [programInput, setProgramInput] = React.useState<string>(
    "0 1 1 0 0 r r 0\n0 0 0 0 0 r r halt-accept"
  );
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const lineNoInfo = programInput.split("\n").map((_, i) => {
    const isError = !!tm?.errors.find((v) => v.lineNo == i);
    return { lineNo: i, isCurrentLine: false, isError };
  });

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

  React.useEffect(() => {
    if (textareaRef) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [textareaRef, programInput]);

  return (
    <div className="program-input">
      <div className="title">
        <h2>Program</h2>
      </div>
      <div className="program-input__container">
        <div className="program-input__source-container">
          <div className="program-input__line-numbers">
            {lineNoInfo.map((v) => (
              <LineNumberAndHighlight
                lineNo={v.lineNo}
                isCurrentLine={v.isCurrentLine}
                isError={v.isError}
              />
            ))}
          </div>

          <textarea
            onChange={(e) => handleTextChange(e.target.value)}
            ref={textareaRef}
            defaultValue={"0 1 1 0 0 r r 0\n0 0 0 0 0 r r halt-accept"}
          />
        </div>
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
      </div>
    </div>
  );
};

export default ProgramComponent;
