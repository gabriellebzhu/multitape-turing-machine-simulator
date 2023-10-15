import { Tape } from "../tape/tape";
import { LineAndNumber, Move, TMError } from "./constants";
import { moveInitializer } from "./move";

export default class TM {
  step: number;
  lines: Array<LineAndNumber>;
  moves: Array<Move>;
  tapeNum: number;
  errors: Array<TMError>;
  setState: (state: string) => void;
  setSteps: (f: React.SetStateAction<number>) => void;

  constructor(
    tapeNum: number,
    programString: string,
    setState: (state: string) => void,
    setSteps: (f: React.SetStateAction<number>) => void
  ) {
    this.tapeNum = tapeNum;
    this.setState = setState;
    this.setSteps = setSteps;
    this.step = 0;
    this.errors = [];
    if (tapeNum == 0) {
      this.errors.push({ lineNo: -1, errMsg: "No tapes" });
    } else {
      const { parseMoves } = moveInitializer({ tapeNum });
      const res = parseMoves(programString);
      this.lines = res.commentlessLines;
      this.moves = res.moves;
      this.errors.push(...res.errors);
    }
  }

  findMove(state: string, tapeVals: Array<string>) {
    return this.moves.find((m) => {
      if (m.startState != state) return false;
      const matches = m.tapeMoves.filter(
        (tapeMove, i) => tapeVals[i] != tapeMove.read
      );
      return matches.length == 0;
    });
  }

  isMatch = (m: Move, tapes: Array<Tape>, state: string) => {
    if (m.startState != state) return false;

    const matches = m.tapeMoves.filter(
      (tapeMove, i) => tapes[i].read() != tapeMove.read
    );
    return matches.length == 0;
  };

  iterate = (tapes: Array<Tape>, state: string): string => {
    const matchedMove = this.moves.find((m) => this.isMatch(m, tapes, state));

    if (matchedMove == null) {
      this.errors.push({
        lineNo: -1,
        errMsg: `No instruction found for state: ${state} ${tapes
          .map((t, i) => `${i}: ${t.read()}`)
          .join(", ")}`,
      });
      this.setState("halt");
      return "halt";
    }

    tapes.forEach((t, i) => {
      t.write(matchedMove.tapeMoves[i].write);
      t.move(matchedMove.tapeMoves[i].dir);
    });

    this.setSteps((x) => x + 1);
    this.setState(matchedMove.endState);
    return matchedMove.endState;
  };
}
