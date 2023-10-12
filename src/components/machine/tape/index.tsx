import * as React from "react";
import { Tape } from "./tape";
import { TapeDisplayer } from "./tape-displayer";

const TapesComponent: React.FC = ()=> {
  const [tapes, setTapes] = React.useState<Array<Tape>>([]);

  const handleAddTape = React.useCallback(() => {
    const newTape = new Tape("100010", "test");
    setTapes([...tapes, newTape]);
  }, [tapes])

  return (
      <div className="tapes-container">
          <div>Tapes</div>
          <div className="tapes-display__container">
            {tapes.map(t => <TapeDisplayer tape={t}/>)}
          </div>
          <div className="add-tape__container">
            <button className="add-tape_btn" onClick={handleAddTape}>Add tape</button>
          </div>
      </div>
  );
}

export default TapesComponent;