import { DIRECTION } from "../tape/constants";
import { LineAndNumber, TMError, SingleTapeMove, Move } from "./constants";

const validateLineLength = (l: LineAndNumber, expctedArgs: number): TMError => {
  const i = l.lineNo;
  if (l.line.length == 1 && l.line[0].length == 0)
    return { lineNo: i, errMsg: "" };
  if (l.line.length == expctedArgs) return { lineNo: i, errMsg: "" };
  return { lineNo: i, errMsg: `Expected ${expctedArgs} args` };
};

export const moveInitializer = (props: { tapeNum: number }) => {
  const { tapeNum } = props;
  const argNum = tapeNum * 3 + 2;
  const errors: Array<TMError> = [];

  const parseDirection = (
    directionString: string
  ): {
    error: boolean;
    dir: DIRECTION | null;
  } => {
    if (directionString.toLowerCase() === "r" || directionString === ">") {
      return { error: false, dir: DIRECTION.RIGHT };
    }

    if (directionString.toLowerCase() === "l" || directionString === "<") {
      return { error: false, dir: DIRECTION.LEFT };
    }

    if (directionString === "*") return { error: false, dir: DIRECTION.STAY };

    return { error: true, dir: null };
  };

  const extractMovesFromLine = (l: LineAndNumber): Move => {
    const tapeMoves: Array<SingleTapeMove> = [];

    for (let i = 0; i < tapeNum; i++) {
      const dirRes = parseDirection(l.line[1 + i * tapeNum * 2]);
      if (dirRes.error) {
        errors.push({
          lineNo: l.lineNo,
          errMsg: `Invalid direction for tape ${i}`,
        });
        return { startState: "", endState: "", tapeMoves: [] };
      }

      tapeMoves.push({
        read: l.line[1 + i],
        write: l.line[1 + i * tapeNum],
        dir: dirRes.dir,
      });
    }
    return { startState: l.line[0], endState: l.line[argNum - 1], tapeMoves };
  };

  const parseMoves = (programString: string) => {
    const lines = programString.split("\n");
    const commentlessLines: Array<LineAndNumber> = lines.map((l, i) => {
      const line = l.split(";")[0].trimEnd();
      return { lineNo: i, line: line.split(" ") };
    });

    errors.push(
      ...commentlessLines
        .map((l) => validateLineLength(l, argNum))
        .filter((err) => err.errMsg.length > 0)
    );

    const filteredLines = commentlessLines.filter(
      (l) => l.line.length == argNum
    );

    const moves = filteredLines
      .map(extractMovesFromLine)
      .filter((m) => m.tapeMoves.length > 0);

    return {
      lines: moves,
      errors: errors,
    };
  };

  return { parseMoves: parseMoves };
};
