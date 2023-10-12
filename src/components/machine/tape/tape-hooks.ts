import * as React from "react";
import { Tape } from "./tape";


const useTapeHooks = () => {
  const [tapes, setTapes] = React.useState<Array<Tape>>([]);

  const handleAddTape = React.useCallback(() => {
    const newTape = new Tape("100010", "test");
    setTapes([...tapes, newTape]);
  }, [tapes, setTapes])

  const handleRemoveTape = React.useCallback((tapeIndex:number) => {
    setTapes([...tapes.slice(0, tapeIndex), ...tapes.slice(tapeIndex+1)])
  }, [tapes, setTapes])

  return {tapes, handleAddTape, handleRemoveTape}
}

export default useTapeHooks;