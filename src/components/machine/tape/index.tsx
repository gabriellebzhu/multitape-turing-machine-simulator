import { Tape } from "./tape";
import { TapeDisplayer } from "./tape-displayer";
  const [tapes, setTapes] = React.useState<Array<Tape>>([]);
    const newTape = new Tape("100010", "test");
    setTapes([...tapes, newTape]);
            {tapes.map(t => <TapeDisplayer tape={t}/>)}
