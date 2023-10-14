import * as React from "react";
import { Tape } from "../machine/tape/tape";
import { DEFAULT_TAPE_VAL } from "../machine/tape/constants";

const useTapes = () => {
  const [tapes, setTapes] = React.useState<Array<Tape>>([]);

  const handleAddTape = React.useCallback(() => {
    const newTape = new Tape(DEFAULT_TAPE_VAL, tapes.length.toString());
    setTapes([...tapes, newTape]);
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
