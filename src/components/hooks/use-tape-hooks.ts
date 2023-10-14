import * as React from "react";
import { Tape } from "../machine/tape/tape";
import { DEFAULT_TAPE_VAL } from "../machine/tape/constants";

const useTapes = () => {
  const [tapes, setTapes] = React.useState<Array<Tape>>([]);
  const [tapeCounter, setTapeCounter] = React.useState<number>(0);

  const handleAddTape = React.useCallback(() => {
    const newTape = new Tape(DEFAULT_TAPE_VAL, tapeCounter.toString());
    setTapes([...tapes, newTape]);
    setTapeCounter((x) => x + 1);
  }, [tapes, setTapes]);

  const handleRemoveTape = React.useCallback(
    (tapeIndex: number) => {
      setTapes([...tapes.slice(0, tapeIndex), ...tapes.slice(tapeIndex + 1)]);
    },
    [tapes, setTapes]
  );

  const resetTapes = React.useCallback(() => {
    tapes.forEach((t) => {
      t.reset();
    });
  }, [tapes]);

  return { tapes, handleAddTape, handleRemoveTape, resetTapes };
};

export default useTapes;
