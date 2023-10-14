import * as React from "react";

interface StateComponentProps {
  state: string;
  isRunning: boolean;
  steps: number;
}

const StateComponent: React.FC<StateComponentProps> = (
  props: StateComponentProps
) => {
  const { state, steps } = props;

  return (
    <div className="state-container">
      <div className="state-display">State: {state}</div>
      <div className="step-display">Steps: {steps}</div>
    </div>
  );
};

export default StateComponent;
