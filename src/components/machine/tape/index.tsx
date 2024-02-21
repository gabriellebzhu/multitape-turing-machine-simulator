import * as React from "react";
import { TapeDisplayer } from "./tape-displayer";
import { Tape } from "./tape";

interface TapesComponentProps {
  tapes: Array<Tape>;
  handleAddTape: (num: number) => void;
  handleRemoveTape: (index: number) => void;
  isRunning: boolean;
  isStepping: boolean;
  handleReset: () => void;
}

const TapesComponent: React.FC<TapesComponentProps> = (
  props: TapesComponentProps,
) => {
  const {
    tapes,
    handleReset,
    handleAddTape,
    handleRemoveTape,
    isRunning,
    isStepping,
  } = props;
  const [tapeNumInput, setTapeNumInput] = React.useState<string>("2");
  const [tapesToAdd, setTapesToAdd] = React.useState<number>(2);

  const handleAddTapeButton = React.useCallback(() => {
    handleAddTape(1);
    handleReset();
  }, [handleAddTape, handleReset]);

  const handleRemoveTapeButton = React.useCallback(
    (index: number) => {
      handleRemoveTape(index);
      handleReset();
    },
    [handleRemoveTape, handleReset],
  );

  const handleSetTapeNumber = React.useCallback(() => {
    let num = Number(tapeNumInput.trim());
    if (Number.isNaN(num)) {
      setTapeNumInput(tapes.length.toString());
      return;
    }

    if (num == tapes.length) return;
    handleRemoveTape(-1);

    if (num > 15) {
      setTapeNumInput("15");
      num = 15;
    }
    if (num < 0) {
      setTapeNumInput("0");
      num = 0;
    }
    setTapesToAdd(num);
  }, [tapeNumInput, tapes]);

  React.useEffect(() => {
    handleAddTape(tapesToAdd);
    setTapesToAdd(0);
  }, [tapesToAdd]);

  return (
    <div className="tapes-display">
      <div className="title">
        <h2>Tapes</h2>
      </div>
      <div className="tapes-display__container">
        {tapes.map((t, i) => (
          <TapeDisplayer
            handleRemoveTape={handleRemoveTapeButton}
            tape={t}
            key={i.toString()}
            index={i}
            isDisabled={isRunning || isStepping}
            handleReset={handleReset}
          />
        ))}
      </div>
      <div className="add-tapes">
        <div className="add-tapes__set-tapes">
          <label className="add-tapes__set-tapes__label">
            Set number of tapes
          </label>
          <input
            className="add-tapes__set-tapes__input"
            value={tapeNumInput}
            onChange={(e) => {
              setTapeNumInput(e.target.value);
            }}
          />
          <button
            disabled={isRunning || isStepping}
            onClick={handleSetTapeNumber}
          >
            Set
          </button>
        </div>
        <button
          className="remove-tape_btn"
          disabled={isRunning || isStepping}
          onClick={() => handleRemoveTape(-1)}
        >
          Remove all tapes{" "}
        </button>
        <button
          className="add-tape_btn"
          disabled={isRunning || isStepping}
          onClick={handleAddTapeButton}
        >
          Add a tape
        </button>
      </div>
    </div>
  );
};

export default TapesComponent;
