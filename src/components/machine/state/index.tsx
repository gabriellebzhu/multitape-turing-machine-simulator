import * as React from "react";
import { TMError } from "../program/constants";

interface StateComponentProps {
  state: string;
  isRunning: boolean;
  steps: number;
  errors: Array<TMError> | null;
}

const StateComponent: React.FC<StateComponentProps> = (
  props: StateComponentProps,
) => {
  const { state, steps, errors } = props;
  const hasUnLinedError = errors?.length && errors[0].lineNo < 0;
  const hasLinedError = errors?.length && errors[0].lineNo >= 0;

  return (
    <div className="state__container">
      <div className="state-display">State: {state}</div>
      <div>
        {hasUnLinedError ? (
          <div className="state-error">Error: {errors[0].errMsg}</div>
        ) : null}
        {hasLinedError ? (
          <div className="state-error">
            Error on line {errors[0].lineNo}: {errors[0].errMsg}
          </div>
        ) : null}
      </div>
      <div className="state-step-display">Steps: {steps}</div>
    </div>
  );
};

export default StateComponent;
