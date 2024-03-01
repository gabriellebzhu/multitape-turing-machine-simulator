import { DIRECTION } from "../tape/constants";
import { Tape } from "../tape/tape";
import TM from "./tm";

describe("TM", () => {
  const mockedDefaultProgram = "0 1 1 r 1";
  const setup = (args: { tapes?: number; program: string }) => {
    const { tapes, program } = args;
    const mockSetState = jasmine.createSpy();
    const mockSetSteps = jasmine.createSpy();

    const tm = new TM(tapes, program, mockSetState, mockSetSteps);
    return { tm, mockSetState, mockSetSteps };
  };

  describe("Initialization", () => {
    it("initially has 0 steps, no errors, not matched line", () => {
      const { tm } = setup({ tapes: 1, program: mockedDefaultProgram });
      expect(tm.errors).toHaveSize(0);
      expect(tm.lines).toHaveSize(1);
      expect(tm.matchedLine).toBeNull();
      expect(tm.step).toBe(0);
    });

    it("fails on 0 tapes", () => {
      const { tm } = setup({ tapes: 0, program: mockedDefaultProgram });
      expect(tm.errors).toHaveSize(1);
    });
  });

  describe("iteration", () => {
    it("iterates to the next move when there is a valid move", () => {
      const { tm, mockSetState } = setup({
        tapes: 1,
        program: "0 1 A r newState",
      });
      const mockTape = new Tape("11", "0");
      const tapeMoveSpy = spyOn(mockTape, "Move");
      const tapeWriteSpy = spyOn(mockTape, "Write");

      expect(tm.Iterate([mockTape], "0")).toEqual("newState");
      expect(mockSetState).toHaveBeenCalledWith("newState");
      expect(tapeMoveSpy).toHaveBeenCalledWith(DIRECTION.RIGHT);
      expect(tapeWriteSpy).toHaveBeenCalledWith("A");
      expect(tm.errors).toHaveSize(0);
      expect(tm.matchedLine).toEqual(0);
    });

    it("halts if no matching rule is found", () => {
      const { tm, mockSetState } = setup({
        tapes: 1,
        program: "0 1 1 r newState",
      });
      const mockTape = new Tape("0", "0");
      const tapeMoveSpy = spyOn(mockTape, "Move");
      const tapeWriteSpy = spyOn(mockTape, "Write");

      expect(tm.Iterate([mockTape], "0")).toEqual("halt");
      expect(mockSetState).toHaveBeenCalledWith("halt");
      expect(tm.errors).toHaveSize(1);
      expect(tm.matchedLine).toBeNull();

      expect(tapeMoveSpy).toHaveBeenCalledTimes(0);
      expect(tapeWriteSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe("Move Matching", () => {
    it("matches _ with a blank", () => {
      const { tm } = setup({
        tapes: 2,
        program: "0 _ _ 0 0 r r yay",
      });
      const mockTape1 = new Tape("", "0");
      const mockTape2 = new Tape("", "1");
      const tapeWrite1Spy = spyOn(mockTape1, "Write");
      const tapeWrite2Spy = spyOn(mockTape2, "Write");

      expect(tm.Iterate([mockTape1, mockTape2], "0")).toEqual("yay");
      expect(tm.errors).toHaveSize(0);
      expect(tm.matchedLine).toEqual(0);
      expect(tapeWrite1Spy).toHaveBeenCalledWith("0");
      expect(tapeWrite2Spy).toHaveBeenCalledWith("0");
    });

    it("matches with * if no other rule applies", () => {
      const { tm } = setup({
        tapes: 2,
        program: ["0 1 1 0 0 r r nomatch", "0 * 1 a a r r match"].join("\n"),
      });
      const mockTape1 = new Tape("0", "0");
      const mockTape2 = new Tape("1", "1");
      const tapeWrite1Spy = spyOn(mockTape1, "Write");
      const tapeWrite2Spy = spyOn(mockTape2, "Write");

      expect(tm.Iterate([mockTape1, mockTape2], "0")).toEqual("match");
      expect(tm.errors).toHaveSize(0);
      expect(tm.matchedLine).toEqual(1);
      expect(tapeWrite1Spy).toHaveBeenCalledWith("a");
      expect(tapeWrite2Spy).toHaveBeenCalledWith("a");
    });

    it("matches when one read is * only if previous rules do not match", () => {
      const { tm } = setup({
        tapes: 2,
        program: ["0 1 1 0 0 r r nomatch", "0 * 1 a a r r match"].join("\n"),
      });
      const mockTape1 = new Tape("0", "0");
      const mockTape2 = new Tape("1", "1");
      const tapeWrite1Spy = spyOn(mockTape1, "Write");
      const tapeWrite2Spy = spyOn(mockTape2, "Write");

      expect(tm.Iterate([mockTape1, mockTape2], "0")).toEqual("match");
      expect(tm.errors).toHaveSize(0);
      expect(tm.matchedLine).toEqual(1);
      expect(tapeWrite1Spy).toHaveBeenCalledWith("a");
      expect(tapeWrite2Spy).toHaveBeenCalledWith("a");
    });

    it("matches when both reads are * only if previous rules do not match", () => {
      const { tm } = setup({
        tapes: 2,
        program: [
          "0 1 1 0 0 r r nomatch",
          "0 1 * 0 0 r r nomatch1star",
          "0 * * a a r r match",
        ].join("\n"),
      });
      const mockTape1 = new Tape("0", "0");
      const mockTape2 = new Tape("1", "1");
      const tapeWrite1Spy = spyOn(mockTape1, "Write");
      const tapeWrite2Spy = spyOn(mockTape2, "Write");

      expect(tm.Iterate([mockTape1, mockTape2], "0")).toEqual("match");
      expect(tm.errors).toHaveSize(0);
      expect(tm.matchedLine).toEqual(2);
      expect(tapeWrite1Spy).toHaveBeenCalledWith("a");
      expect(tapeWrite2Spy).toHaveBeenCalledWith("a");
    });

    it("does not match if the state is not correct", () => {
      const { tm } = setup({
        tapes: 2,
        program: ["badstart 1 1 0 0 r r nomatch", "0 1 1 a a r r match"].join(
          "\n"
        ),
      });
      const mockTape1 = new Tape("1", "0");
      const mockTape2 = new Tape("1", "1");
      const tapeWrite1Spy = spyOn(mockTape1, "Write");
      const tapeWrite2Spy = spyOn(mockTape2, "Write");

      expect(tm.Iterate([mockTape1, mockTape2], "0")).toEqual("match");
      expect(tm.errors).toHaveSize(0);
      expect(tm.matchedLine).toEqual(1);
      expect(tapeWrite1Spy).toHaveBeenCalledWith("a");
      expect(tapeWrite2Spy).toHaveBeenCalledWith("a");
    });
  });
});
