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
      return;
    }

    const { parseMoves } = moveInitializer(tapeNum);
    const res = parseMoves(programString);
    this.lines = res.commentlessLines;
    this.moves = res.moves;
    this.errors.push(...res.errors);
  }

  FindMove(state: string, tapeVals: Array<string>) {
    const moveMatcher = (move: Move) => {
      if (move.startState != state) return false;
      const matches = move.tapeMoves.filter(
        (tapeMove, i) => tapeVals[i] != tapeMove.read
      );
      return matches.length == 0;
    };
    return this.moves.find(moveMatcher);
  }

  IsMatch = (m: Move, tapes: Array<Tape>, state: string) => {
    if (m.startState != state) return false;
    const matches = m.tapeMoves.filter(
      (tapeMove, i) => tapes[i].Read() != tapeMove.read
    );
    return matches.length == 0;
  };

  Iterate = (tapes: Array<Tape>, state: string): string => {
    const matchedMove = this.moves.find((m) => this.IsMatch(m, tapes, state));

    if (matchedMove == null) {
      this.errors.push({
        lineNo: -1,
        errMsg: `No instruction found for state: ${state} ${tapes
          .map((t, i) => `${i}: ${t.Read()}`)
          .join(", ")}`,
      });
      this.setState("halt");
      return "halt";
    }

    tapes.forEach((t, i) => {
      t.Write(matchedMove.tapeMoves[i].write);
      t.Move(matchedMove.tapeMoves[i].dir);
    });

    this.setSteps((x) => x + 1);
    this.setState(matchedMove.endState);
    return matchedMove.endState;
  };
}
