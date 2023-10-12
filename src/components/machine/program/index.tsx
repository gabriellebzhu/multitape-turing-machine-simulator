import * as React from "react";
import useProgramHooks from "./program-hooks";

const ProgramComponent: React.FC = ()=> {
  const {handleStart, handleStop} = useProgramHooks();

  return (
    <div className="tape-container">
      <div>Program</div>
      <div className="program-input__container">
        <div className="program-input__controller">
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Pause</button>
          <button>Step</button>
          <button>Reset</button>
        </div>
        <textarea />
      </div>
    </div>
  );
}

export default ProgramComponent;