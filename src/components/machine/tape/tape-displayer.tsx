import * as React from "react";
import { Tape } from "./tape";

interface TapeDisplayerProps {
  tape: Tape;
  index: number;
  handleRemoveTape: (tapeIndex: number) => void;
  isDisabled?: boolean;
}

export const TapeDisplayer = (props: TapeDisplayerProps) => {
  const { tape, index, isDisabled, handleRemoveTape } = props;

  return (
    <div key={index.toString()} className="tape-display">
      <div className="tape-label">{tape.tapeName}</div>
      <div className="tape-visualizer">
        <div className="marker">{tape.pos}</div>
        <div className="tape-string">{tape.tapeVal}</div>
        <div className="remove-tape">
          <button disabled={isDisabled} onClick={() => handleRemoveTape(index)}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
};
