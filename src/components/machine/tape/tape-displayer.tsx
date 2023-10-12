import * as React from "react"
import { Tape } from "./tape"

interface TapeDisplayerProps {
  tape: Tape,
}

export const TapeDisplayer = (props: TapeDisplayerProps) => {
  const {tape} = props;

  return (
    <div className="tape-display">
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
      </div>
    </div>
  );
}