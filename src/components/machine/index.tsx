import * as React from "react";
import TapesComponent from "./tape";
import ProgramComponent from "./program";

const Simulator: React.FC = () => {
  return (
    <div>
      <h1>Multitape Turing Simulator</h1>
      <TapesComponent />
      <ProgramComponent />
    </div>
  );
}

export default Simulator;