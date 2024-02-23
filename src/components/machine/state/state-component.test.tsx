import * as React from "react";
import StateComponent from "./state-component";
import {render} from "@testing-library/react"
import { TMError } from "../program/constants";

describe("StateComponent", () => {
  it("displays the current state and number of steps", () => {
    const result = render(<StateComponent 
      state="someState"
      isRunning={false}
      steps={10}
      errors={null} />);

      expect(result.findByText("State: someState")).toBeDefined();
      expect(result.findByText("Steps: 10")).toBeDefined();
  })
  
  it("displays an error message for errors not related to specific lines", () => {
    const mockTopLevelError: TMError = {
      lineNo: null,
      errMsg: "Some error has occurred"
    }

    const result = render(<StateComponent 
      state="0"
      isRunning={false}
      steps={0}
      errors={[mockTopLevelError]} />);
    
      expect(result.findAllByText("Error:")).toBeDefined();
      expect(result.findAllByText("Some error has occurred")).toBeDefined();

  });

  it("displays an error message for a single error with line number", () => {
    const mockError: TMError = {
      lineNo: 5,
      errMsg: "This line is too long"
    }

    const result = render(<StateComponent 
      state="0"
      isRunning={false}
      steps={0}
      errors={[mockError]} />);
    
      expect(result.findAllByText("Error on line 5:")).toBeDefined();
      expect(result.findAllByText("This line is too long")).toBeDefined();
  })

  it("indicates there is one additional error", () => {
    const mockError: TMError = {
      lineNo: 5,
      errMsg: "This line is too long"
    }

    const result = render(<StateComponent 
      state="0"
      isRunning={false}
      steps={0}
      errors={[mockError, mockError]} />);
    
      expect(result.findAllByText("Error on line 5:")).toBeDefined();
      expect(result.findAllByText("This line is too long")).toBeDefined();
      expect(result.findAllByText("+ 1 other error")).toBeDefined();
  })

  it("indicates there are muiltiple additional errors", () => {
    const mockError: TMError = {
      lineNo: 5,
      errMsg: "This line is too long"
    }

    const result = render(<StateComponent 
      state="0"
      isRunning={false}
      steps={0}
      errors={[mockError, mockError, mockError, mockError, mockError]} />);
    
      expect(result.findAllByText("Error on line 5:")).toBeDefined();
      expect(result.findAllByText("This line is too long")).toBeDefined();
      expect(result.findAllByText("+ 4 other errors")).toBeDefined();
  })

});
