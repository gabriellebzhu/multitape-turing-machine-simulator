import { Tape } from "../tape/tape";
import { Move, TMError } from "./constants";
import { moveInitializer } from "./move";

export default class TM {
  step: number;
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
    console.log(`tapenum in constructor ${tapeNum}`);
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
      this.moves = res.lines;
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
      console.log("WAH");
      this.errors.push({ lineNo: -1, errMsg: "No instruction found" });
      this.setState("halt");
      return "halt";
    }

    tapes.forEach((t, i) => {
      console.log(
        `tape ${i} state ${state} | ${t.read()} ${
          matchedMove.tapeMoves[i].read
        } | write: ${matchedMove.tapeMoves[i].write}, move ${
          matchedMove.tapeMoves[i].dir
        }`
      );
      t.write(matchedMove.tapeMoves[i].write);
      t.move(matchedMove.tapeMoves[i].dir);
    });

    this.setSteps((x) => x + 1);
    this.setState(matchedMove.endState);
    return matchedMove.endState;
  };
}
