import * as React from "react";
import useProgramHooks from "./program-hooks";

const ProgramComponent: React.FC = ()=> {
  const {handleStart, handleStop} = useProgramHooks();
  const [programInput, setProgramInput] = React.useState<string>("; hello");

  const handleTextChange = React.useCallback((text:string) => {
    setProgramInput(text);
  }, [setProgramInput])

  const handleStartButton = React.useCallback(() => {
    handleStart(programInput);
  }, [programInput])

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
        <textarea onChange={e => handleTextChange(e.target.value)} defaultValue="; hello"/>
      </div>
    </div>
  );
}

export default ProgramComponent;