import * as React from "react";
import { TapeDisplayer } from "./tape-displayer";
import { Tape } from "./tape";

interface TapesComponentProps {
  tapes: Array<Tape>;
  handleAddTape: () => void;
  handleRemoveTape: (index: number) => void;
  isRunning: boolean;
}

const TapesComponent: React.FC<TapesComponentProps> = (
  props: TapesComponentProps
) => {
  const { tapes, handleAddTape, handleRemoveTape, isRunning } = props;

  return (
    <div className="tapes-container">
      <div>Tapes</div>
      <div className="tapes-display__container">
        {tapes.map((t, i) => (
          <TapeDisplayer
            handleRemoveTape={handleRemoveTape}
            tape={t}
            index={i}
            isDisabled={isRunning}
          />
        ))}
      </div>
      <div className="add-tape__container">
        <button
          className="add-tape_btn"
          disabled={isRunning}
          onClick={handleAddTape}
        >
          Add tape
        </button>
      </div>
    </div>
  );
};

export default TapesComponent;
