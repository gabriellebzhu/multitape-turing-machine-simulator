import * as React from "react";
import { Tape } from "../machine/tape/tape";
import { DEFAULT_TAPE_VAL } from "../machine/tape/constants";

const useTapes = () => {
  const [tapes, setTapes] = React.useState<Array<Tape>>([]);
  const [tapeCounter, setTapeCounter] = React.useState<number>(0);

  const handleAddTape = React.useCallback(
    (tapeNum: number = 1) => {
      const newTapes: Array<Tape> = [];
      for (let i = 0; i < tapeNum; i++) {
        newTapes.push(new Tape(DEFAULT_TAPE_VAL, tapeCounter.toString()));
      }
      setTapes([...tapes, ...newTapes]);
      setTapeCounter((x) => x + 1);
    },
    [tapes, setTapes]
  );

  const handleRemoveTape = React.useCallback(
    (tapeIndex: number) => {
      if (tapeIndex == -1) {
        setTapes([]);
        return;
      }
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
