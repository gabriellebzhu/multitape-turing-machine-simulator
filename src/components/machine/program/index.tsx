import * as React from "react";

interface ProgramComponentProps {
  isRunning: boolean;
  handleStart: (programString: string) => void;
  handleStop: () => void;
}

const ProgramComponent: React.FC<ProgramComponentProps> = (
  props: ProgramComponentProps
) => {
  const { handleStart, handleStop } = props;
  const [programInput, setProgramInput] = React.useState<string>(
    "0 1 1 0 0 r r 0\n0 0 0 0 0 r r halt-accept"
  );

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
          <button onClick={handleStartButton}>Start</button>
          <button onClick={handleStop}>Pause</button>
          <button>Step</button>
          <button>Reset</button>
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
