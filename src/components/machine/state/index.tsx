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

  return (
    <div className="state__container">
      <div className="state-display">State: {state}</div>
      <div>
        {errors?.length > 0 ? (
          <div className="state-error__container">
            <div className="state-error__line-no">
              {errors[0].lineNo >= 0 ? `Error on line ${errors[0].lineNo}` : "Error"}
            </div>
            <div className="state-error__msg">
              {errors[0].errMsg}
            </div>
          </div>
        ) : null}
        {errors?.length > 1 ? (
          <div className="state-error__additional">
            + {errors?.length - 1} other error
          </div>
        ): null}
      </div>
      <div className="state-step-display">Steps: {steps}</div>
    </div>
  );
};

export default StateComponent;
