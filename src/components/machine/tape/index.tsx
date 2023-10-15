import * as React from "react";
import { TapeDisplayer } from "./tape-displayer";
import { Tape } from "./tape";

interface TapesComponentProps {
  tapes: Array<Tape>;
  handleAddTape: () => void;
  handleRemoveTape: (index: number) => void;
  isRunning: boolean;
  isStepping: boolean;
  handleReset: () => void;
}

const TapesComponent: React.FC<TapesComponentProps> = (
  props: TapesComponentProps
) => {
  const {
    tapes,
    handleReset,
    handleAddTape,
    handleRemoveTape,
    isRunning,
    isStepping,
  } = props;

  const handleAddTapeButton = React.useCallback(() => {
    handleAddTape();
    handleReset();
  }, [handleAddTape, handleReset]);

  const handleRemoveTapeButton = React.useCallback(
    (index: number) => {
      handleRemoveTape(index);
      handleReset();
    },
    [handleRemoveTape, handleReset]
  );

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
      <div className="add-tape__container">
        <button
          className="add-tape_btn"
          disabled={isRunning || isStepping}
          onClick={handleAddTapeButton}
        >
          Add tape
        </button>
      </div>
    </div>
  );
};

export default TapesComponent;
