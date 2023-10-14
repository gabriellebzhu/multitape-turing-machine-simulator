import { DIRECTION, BLANK, ANY } from "./constants";

export class Tape {
  originalTape: string;
  tapeVal: Array<string>;
  pos: number;
  tapeName: string;

  constructor(inputString: string = "01110011", tapeName: string = "0") {
    this.originalTape = inputString;
    this.tapeVal = inputString.split("");
    this.pos = 0;
    this.tapeName = tapeName;
  }

  reset() {
    this.tapeVal = this.originalTape.split("");
    this.pos = 0;
  }

  move(dir: DIRECTION): void {
    switch (dir) {
      case DIRECTION.STAY:
        break;
      case DIRECTION.LEFT:
        this.move_left();
        break;
      case DIRECTION.RIGHT:
        this.move_right();
        break;
    }
  }

  move_left(): void {
    this.pos -= 1;
    if (this.pos < 0) {
      this.pos = 0;
      this.tapeVal.splice(0, 0, BLANK);
    }
  }

  move_right(): void {
    this.pos += 1;
    if (this.pos >= this.tapeVal.length) {
      this.tapeVal.push(BLANK);
    }
  }

  read(): string {
    return this.tapeVal.at(this.pos);
  }

  write(symbol: string): void {
    if (symbol == ANY) return;
    this.tapeVal[this.pos] = symbol;
  }

  setVal(inputString: string) {
    this.originalTape = inputString;
    this.tapeVal = inputString.split("");
  }
}
