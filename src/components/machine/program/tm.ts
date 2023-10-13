import { Move, TMError } from "./constants";
import { moveInitializer } from "./move";

export default class TM {
  step: number;
  moves: Array<Move>;
  tapeNum: number;
  errors: Array<TMError>;

  constructor(tapeNum: number, programString: string) {
    this.tapeNum = tapeNum;

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

  isMatch = (m: Move, state: string, tapeVals: Array<string>) => {
    if (m.startState != state) return false;

    const matches = m.tapeMoves.filter(
      (tapeMove, i) => tapeVals[i] != tapeMove.read
    );
    return matches.length == 0;
  };

  iterate(state: string, tapeVals: Array<string>) {
    const matchedMove = this.moves.find((m) =>
      this.isMatch(m, state, tapeVals)
    );

    if (matchedMove == null) {
      this.errors.push({ lineNo: -1, errMsg: "No instruction found" });
    }

    // self.nfa.write(instr.f1)
    // self.candidate.write(instr.f2)
    // self.nfa.move(instr.move1)
    // self.candidate.move(instr.move2)
    // self.state = instr.end
    // print(f"{self.step}: {instr}")
    // print(f"\t     {self.nfa.pos_str()}\n\tnfa: {self.nfa}")
    // print(
    //     f"\t     {self.candidate.pos_str()}\n\tstr: {self.candidate}\n\n",
    // )
    // self.step += 1
  }
}
