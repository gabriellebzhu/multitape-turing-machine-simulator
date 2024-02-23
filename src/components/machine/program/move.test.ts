import { DIRECTION } from "../tape/constants";
import { moveInitializer } from "./move";

const defaultSingleTapeMove = { read: "1", write: "2", dir: DIRECTION.RIGHT };

const defaultMove = {
  lineNo: 0,
  anyMatchNumber: 0,
  startState: "0",
  endState: "newState",
  tapeMoves: [defaultSingleTapeMove],
};

describe("Moves", () => {
  it("returns no moves if the tapenumber is 0", () => {
    const { parseMoves } = moveInitializer(0);
    const mockedProgramString = "0 r newState";

    const expectedParsedMoves = {
      commentlessLines: [],
      moves: [],
      errors: [],
    };
    expect(parseMoves(mockedProgramString)).toEqual(expectedParsedMoves);
  });

  it("parses the moves when there are no errors or comments with 1 tape", () => {
    const { parseMoves } = moveInitializer(1);
    const mockedProgramString = "0 1 2  r \tnewState";

    const expectedParsedMoves = {
      commentlessLines: [{ lineNo: 0, line: ["0", "1", "2", "r", "newState"] }],
      moves: [defaultMove],
      errors: [],
    };
    expect(parseMoves(mockedProgramString)).toEqual(expectedParsedMoves);
  });

  it("parses the moves in the right order when there are multiple tapes", () => {
    const { parseMoves } = moveInitializer(3);
    const mockedProgramString = "0 1 1 1 2 2 2 r r r newState";

    const expectedParsedMoves = {
      commentlessLines: [
        {
          lineNo: 0,
          line: ["0", "1", "1", "1", "2", "2", "2", "r", "r", "r", "newState"],
        },
      ],
      moves: [
        {
          ...defaultMove,
          tapeMoves: [
            defaultSingleTapeMove,
            defaultSingleTapeMove,
            defaultSingleTapeMove,
          ],
        },
      ],
      errors: [],
    };
    expect(parseMoves(mockedProgramString)).toEqual(expectedParsedMoves);
  });

  it("ignores comments and blank lines in the program string", () => {
    const { parseMoves } = moveInitializer(1);
    const mockedProgramString = [
      "; comment",
      "0 1 2 r newState  ; comment",
      "",
    ].join("\n");

    const expectedParsedMoves = {
      commentlessLines: [
        { lineNo: 0, line: [""] },
        { lineNo: 1, line: ["0", "1", "2", "r", "newState"] },
        { lineNo: 2, line: [""] },
      ],
      moves: [
        {
          ...defaultMove,
          lineNo: 1,
        },
      ],
      errors: [],
    };
    expect(parseMoves(mockedProgramString)).toEqual(expectedParsedMoves);
  });

  it("returns errors when lines have the incorrect number of arguments", () => {
    const { parseMoves } = moveInitializer(1);
    const mockedProgramString = ["", "toofew", "toomany 0 0 0 r 0"].join("\n");

    expect(parseMoves(mockedProgramString).errors.length).toEqual(2);
  });

  it("returns errors if there is an invalid direction", () => {
    const { parseMoves } = moveInitializer(1);
    const mockedProgramString = ["0 0 0 bad 0", "0 1 2 > newState"].join("\n");

    const expectedParsedMoves = {
      commentlessLines: [
        { lineNo: 0, line: ["0", "0", "0", "bad", "0"] },
        { lineNo: 1, line: ["0", "1", "2", ">", "newState"] },
      ],
      moves: [
        {
          ...defaultMove,
          lineNo: 1,
        },
      ],
      errors: [
        { lineNo: 0, errMsg: "'bad' is an invalid direction for tape 0" },
      ],
    };

    expect(parseMoves(mockedProgramString)).toEqual(expectedParsedMoves);
  });

  it("sorts moves based on how 'specific' they are (i.e. how many *'s it has)", () => {
    const { parseMoves } = moveInitializer(3);
    const mockedProgramString = [
      "0 * * * 2 2 2 r r r newState",
      "0 1 1 * 2 2 2 r r r newState",
      "0 * 1 * 2 2 2 r r r newState",
      "0 1 1 1 2 2 2 r r r newState",
    ].join("\n");

    const expectedMoveWithStar = {
      read: "*",
      write: "2",
      dir: DIRECTION.RIGHT,
    };
    const expectedMoves = [
      {
        ...defaultMove,
        lineNo: 3,
        anyMatchNumber: 0,
        tapeMoves: [
          defaultSingleTapeMove,
          defaultSingleTapeMove,
          defaultSingleTapeMove,
        ],
      },
      {
        ...defaultMove,
        lineNo: 1,
        anyMatchNumber: 1,
        tapeMoves: [
          defaultSingleTapeMove,
          defaultSingleTapeMove,
          expectedMoveWithStar,
        ],
      },
      {
        ...defaultMove,
        lineNo: 2,
        anyMatchNumber: 2,
        tapeMoves: [
          expectedMoveWithStar,
          defaultSingleTapeMove,
          expectedMoveWithStar,
        ],
      },
      {
        ...defaultMove,
        lineNo: 0,
        anyMatchNumber: 3,
        tapeMoves: [
          expectedMoveWithStar,
          expectedMoveWithStar,
          expectedMoveWithStar,
        ],
      },
    ];

    expect(parseMoves(mockedProgramString).moves).toEqual(expectedMoves);
  });
});
