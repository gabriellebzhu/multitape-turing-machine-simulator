import { DIRECTION } from "../tape/constants";

export const DEFAULT_INIT_STATE = "0";

export interface SingleTapeMove {
  read: string;
  write: string;
  dir: DIRECTION;
}

export interface Move {
  lineNo: number;
  startState: string;
  endState: string;
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
