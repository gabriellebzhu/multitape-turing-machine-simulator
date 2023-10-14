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

  const handleRemoveTapeBtn = React.useCallback(() => {
    if (isDisabled) return;
    handleRemoveTape(index);
  }, [isDisabled, handleRemoveTape, index]);

  const [firstHalf, head, secondHalf] = React.useMemo(
    () => tape.getSegmentedVal(),
    [tape, tape.pos, tape.originalTape]
  );

  React.useEffect(() => {
    setTapeText(tape.originalTape);
  }, [tape]);

  React.useEffect(() => {
    if (shouldSet) {
      tape.setVal(tapeText);
      handleReset();
      setShouldSet(false);
    }
  }, [tape, shouldSet, tapeText]);

  return (
    <div className="tape-display">
      <div className="tape-display__config">
        <div className="tape-display__label">Tape {index}:</div>
        <div className="tape-display__value__container">
          <input
            onChange={(e) => handleTextChange(e.target.value)}
            disabled={isDisabled}
            value={tapeText}
          />
          <button disabled={isDisabled} onClick={x}>
            set
          </button>
          <button disabled={isDisabled} onClick={handleRemoveTapeBtn}>
            remove
          </button>
          <div className="remove-tape"></div>
        </div>
      </div>
      <div className="tape-display__visualizer">
        <div className="tape-display__visualizer__grid">
          <div className="tape-display__visualizer__marker">{"\u25BC"}</div>
          <div className="tape-display__visualizer__first">{firstHalf}</div>
          <div className="tape-display__visualizer__head">{head}</div>
          <div className="tape-display__visualizer__second">{secondHalf}</div>
        </div>
      </div>
    </div>
  );
};
