import { DIRECTION } from "../tape/constants";

export const DEFAULT_INIT_STATE = "0";
export const DEFAULT_PROGRAM_STRING =
  "0 1 1 0 0 r r 0\n0 0 0 0 0 r r halt-accept";
// Element of the instruction alphabet indicating to match with any tape
// alphabet value.
export const ANY_MATCH = "*";

export interface SingleTapeMove {
  read: string;
  write: string;
  dir: DIRECTION;
}

export interface Move {
  lineNo: number;
  // Number of `ANY_MATCH` symbols appearing in a move. Moves with fewer of
  // these symbols have higher priority to be matched at any given state.
  anyMatchNumber: number;
  startState: string;
  endState: string;
  // Individual move for each tape, ordered by tape number.
  tapeMoves: Array<SingleTapeMove>;
}

export interface TMError {
  lineNo: number;
  errMsg: string;
}

export interface LineAndNumber {
  lineNo: number;
  line: Array<string>;
}
