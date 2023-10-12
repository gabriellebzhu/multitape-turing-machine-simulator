import * as React from "react"
import { Tape } from "./tape"

interface TapeDisplayerProps {
  tape: Tape,
  index: number,
  handleRemoveTape: (tapeIndex: number) => void,
}

export const TapeDisplayer = (props: TapeDisplayerProps) => {
  const {tape, index, handleRemoveTape} = props;

  return (
    <div key={index} className="tape-display">
      <div className="tape-label">
        {tape.tapeName}
      </div>
      <div className="tape-visualizer">
        <div className="marker">
          {tape.pos}
        </div>
        <div className="tape-string">
          {tape.tapeVal}
        </div>
        <div className="remove-tape">
          <button onClick={() => handleRemoveTape(index)}>remove</button>
        </div>
      </div>
    </div>
  );
}