import { DIRECTION } from "../tape/constants"

export type SingleTapeMove = {
  read: string,
  write: string,
  dir: DIRECTION,
}

type Move = {
  startState: string,
  endState: string,
  tapeMoves: Array<SingleTapeMove>,
}

export default class TM { 
  step: number;
  moves: Array<Move>;
  tapeNum: number;
  errors: Array<{lineNo: number, errMsg: string}>;

  constructor(tapeNum: number = 1, programString: string) {
    this.tapeNum = tapeNum;
    this.step = 0;
    this.errors = [];
    this.moves = [];
    this.parseMoves(programString);
  }

  parseDirection(directionString: string): {error: boolean, dir: DIRECTION | null} {
    if (directionString.toLowerCase() === "r" || directionString === ">") {
      return {error: false, dir: DIRECTION.RIGHT};
    }
    if (directionString.toLowerCase() === "l" || directionString === "<") {
      return {error: false, dir: DIRECTION.LEFT};
    }
    if (directionString === "*") return {error: false, dir: DIRECTION.STAY};

    return {error: true, dir: null}
  }

  parseMoves(programString: string) {
    const lines = programString.split("\n");
    const commentlessLines = lines.map((l,i) => {return {lineNo: i, line: l.split(";")[0].trimEnd().split(" ")}});

    this.errors = commentlessLines
      .map((l) => {
        const i = l.lineNo;
        if (l.line.length == 0) return {lineNo: i, errMsg: ""};
        if (l.line.length != this.tapeNum * 3 + 2)  return {lineNo: i, errMsg: ""};
        return {lineNo: i, errMsg: `Expected ${this.tapeNum * 3 + 2} args`};
      })
      .filter(err => err.errMsg.length > 0);

    const filteredLines = commentlessLines.filter(l => l.line.length == this.tapeNum * 3 + 2);
    return filteredLines.forEach(l => {
      const tapeMoves: Array<SingleTapeMove> = [];
      
      for (let i = 0; i < this.tapeNum; i++) {
        const dirRes = this.parseDirection(l.line[1 + i * this.tapeNum * 2]);
        if (dirRes.error) {
          this.errors.push({lineNo: l.lineNo, errMsg: `Invalid direction for tape ${i}`})
          return;
        }

        tapeMoves.push({  
          read: l.line[1 + i],
          write: l.line[1 + i * this.tapeNum],
          dir: dirRes.dir,
        })
      }
    
      this.moves.push({
        startState: l.line[0],
        endState: l.line[this.tapeNum * 3 + 1],
        tapeMoves: tapeMoves,
      });
    })
  }
}