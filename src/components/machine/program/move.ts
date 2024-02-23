import { DIRECTION } from "../tape/constants";
import {
  LineAndNumber,
  TMError,
  SingleTapeMove,
  Move,
  ANY_MATCH,
} from "./constants";

interface ParsedDirection {
  error: boolean;
  dir: DIRECTION | null;
}

interface ParsedMovesWithErrors {
  commentlessLines: Array<LineAndNumber>;
  moves: Array<Move>;
  errors: Array<TMError>;
}

const validateLineLength = (l: LineAndNumber, expctedArgs: number): TMError => {
  const i = l.lineNo;
  if (l.line.length == 1 && l.line[0].length == 0)
    return { lineNo: i, errMsg: "" };
  if (l.line.length == expctedArgs) return { lineNo: i, errMsg: "" };
  return { lineNo: i, errMsg: `Expected ${expctedArgs} args` };
};

/**
 * Parses and normalizes the move direction in an instruction.
 * @param directionString The string expected to contain the direction
 * @returns a `ParsedDirection` with whether any errors occur in the
 *          formatting of the direction string.
 */
const parseDirection = (directionString: string): ParsedDirection => {
  if (directionString.toLowerCase() === "r" || directionString === ">") {
    return { error: false, dir: DIRECTION.RIGHT };
  }

  if (directionString.toLowerCase() === "l" || directionString === "<") {
    return { error: false, dir: DIRECTION.LEFT };
  }

  if (directionString === "*") return { error: false, dir: DIRECTION.STAY };

  return { error: true, dir: null };
};

/**
 * Sets up and returns a function that parses a program string into an
 * array of moves, the program string with all comments removed (as an array)
 * of lines, and any errors that have occured while parsing the string.
 * @param tapeNum number of tapes expected.
 * @returns the `parseMoves` function
 */
export const moveInitializer = (tapeNum: number) => {
  const argNum = tapeNum * 3 + 2;
  const errors: Array<TMError> = [];

  const extractMovesFromLine = (l: LineAndNumber): Move => {
    const tapeMoves: Array<SingleTapeMove> = [];

    for (let i = 0; i < tapeNum; i++) {
      const directionString = l.line[i + tapeNum * 2 + 1];
      const dirRes = parseDirection(directionString);
      if (dirRes.error) {
        errors.push({
          lineNo: l.lineNo,
          errMsg: `'${directionString}' is an invalid direction for tape ${i}`,
        });

        return {
          lineNo: l.lineNo,
          anyMatchNumber: 0,
          startState: "",
          endState: "",
          tapeMoves: [],
        };
      }

      tapeMoves.push({
        read: l.line[1 + i],
        write: l.line[1 + i + tapeNum],
        dir: dirRes.dir,
      });
    }

    // Find all tape moves that allow any symbol to be read.
    const anyMatchMoves = tapeMoves.filter((move) => move.read === ANY_MATCH);

    return {
      lineNo: l.lineNo,
      anyMatchNumber: anyMatchMoves.length,
      startState: l.line[0],
      endState: l.line[argNum - 1],
      tapeMoves,
    };
  };

  const parseMoves = (programString: string): ParsedMovesWithErrors => {
    if (tapeNum <= 0) {
      return {
        commentlessLines: [],
        moves: [],
        errors: [],
      };
    }

    const lines = programString.split("\n");
    const commentlessLines: Array<LineAndNumber> = lines.map((l, i) => {
      const line = l.split(";")[0].trimEnd();
      return { lineNo: i, line: line.split(/\s+/) };
    });

    errors.push(
      ...commentlessLines
        .map((l) => validateLineLength(l, argNum))
        .filter((err) => err.errMsg.length > 0)
    );

    const filteredLines = commentlessLines.filter(
      (l) => l.line.length == argNum
    );

    const filteredAndSortedMoves = filteredLines
      .map(extractMovesFromLine)
      .filter((m) => m.tapeMoves.length > 0)
      .sort((move1, move2) => move1.anyMatchNumber - move2.anyMatchNumber);

    return {
      commentlessLines,
      moves: filteredAndSortedMoves,
      errors,
    };
  };

  return { parseMoves: parseMoves };
};
