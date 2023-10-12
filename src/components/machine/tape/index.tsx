import * as React from "react";
import { Tape } from "./tape";
import { TapeDisplayer } from "./tape-displayer";
import useTapeHooks from "./tape-hooks";

const TapesComponent: React.FC = ()=> {
  const {tapes, handleAddTape, handleRemoveTape} = useTapeHooks();

  return (
      <div className="tapes-container">
          <div>Tapes</div>
          <div className="tapes-display__container">
            {tapes.map((t, i) => <TapeDisplayer handleRemoveTape={handleRemoveTape} tape={t} index={i}/>)}
          </div>
          <div className="add-tape__container">
            <button className="add-tape_btn" onClick={handleAddTape}>Add tape</button>
          </div>
      </div>
  );
}

export default TapesComponent;