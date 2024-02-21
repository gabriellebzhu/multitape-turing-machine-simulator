import { DIRECTION, BLANK, ANY, BLANK_INPUT } from "./constants";

export class Tape {
  // Copy of the original tape string so the tape can be reset.
  originalTape: string;
  // The current (possibly changed) value of the tape.
  tapeVal: Array<string>;
  // Position of the head on this tape.
  pos: number;
  tapeName: string;

  constructor(inputString: string = "01110011", tapeName: string = "0") {
    this.originalTape = inputString;
    this.tapeVal = inputString.split("");
    this.pos = 0;
    this.tapeName = tapeName;
  }

  Reset() {
    this.tapeVal = this.originalTape.split("");
    this.pos = 0;
  }

  Move(dir: DIRECTION): void {
    switch (dir) {
      case DIRECTION.STAY:
        break;
      case DIRECTION.LEFT:
        this.MoveLeft();
        break;
      case DIRECTION.RIGHT:
        this.MoveRight();
        break;
    }
  }

  MoveLeft(): void {
    this.pos -= 1;
    if (this.pos < 0) {
      this.pos = 0;
      this.tapeVal.splice(0, 0, BLANK);
    }
  }

  MoveRight(): void {
    this.pos += 1;
    if (this.pos >= this.tapeVal.length) {
      this.tapeVal.push(BLANK);
    }
  }

  Read(): string {
    if (this.tapeVal[this.pos] === BLANK) return BLANK_INPUT;
    return this.tapeVal[this.pos];
  }

  Write(symbol: string): void {
    if (symbol == ANY) return;
    if (symbol === BLANK_INPUT) symbol = BLANK;

    this.tapeVal[this.pos] = symbol;
  }

  SetVal(inputString: string) {
    this.originalTape = inputString;
    this.tapeVal = inputString.split("");
  }

  // Split the tape into three sections: the segment before the current head loc,
  // the current loc of the head, and the segment after the current head loc.
  GetSegmentedVal() {
    const first = this.tapeVal.slice(0, this.pos);
    const second = this.tapeVal.slice(this.pos + 1);

    return [
      first.join("").replace(/ /g, "\u00A0"),
      this.tapeVal[this.pos],
      second.join("").replace(/ /g, "\u00A0"),
    ];
  }
}
