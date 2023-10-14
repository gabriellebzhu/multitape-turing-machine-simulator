import * as React from "react";
import { Tape } from "./tape";
import { DEFAULT_TAPE_VAL } from "./constants";

interface TapeDisplayerProps {
  tape: Tape;
  index: number;
  handleRemoveTape: (tapeIndex: number) => void;
  handleReset: () => void;
  isDisabled?: boolean;
}

export const TapeDisplayer = (props: TapeDisplayerProps) => {
  const { tape, index, isDisabled, handleRemoveTape, handleReset } = props;
  const [tapeText, setTapeText] = React.useState<string>(DEFAULT_TAPE_VAL);
  const [shouldSet, setShouldSet] = React.useState<boolean>(false);

  const handleTextChange = React.useCallback(
    (s: string) => {
      if (isDisabled) return;
      setTapeText(s);
    },
    [tape, setTapeText, isDisabled]
  );

  const x = React.useCallback(() => {
    if (isDisabled) return;
    if (tapeText.includes("*")) return;
    if (tapeText.includes(";")) return;
    setShouldSet(true);
  }, [tapeText, setTapeText, isDisabled]);


  React.useEffect(() => {
    setTapeText(tape.originalTape);
  }, [tape]);

  React.useEffect(() => {
    if (shouldSet) {
      tape.setVal(tapeText);
      setShouldSet(false);
    }
  }, [tape, shouldSet, tapeText]);

  return (
    <div className="tape-display">
      <div className="tape-label">{tape.tapeName}</div>
      <div className="tape-visualizer">
        <div className="tape-value__container">
          <input
            onChange={(e) => handleTextChange(e.target.value)}
            disabled={isDisabled}
            value={tapeText}
          />
          <button disabled={isDisabled} onClick={x}>
            set
          </button>
        </div>
        <div className="marker">{tape.pos}</div>
        <div className="tape-string">{tape.tapeVal}</div>
        <div className="remove-tape">
          <button disabled={isDisabled} onClick={handleRemoveTapeBtn}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
};
