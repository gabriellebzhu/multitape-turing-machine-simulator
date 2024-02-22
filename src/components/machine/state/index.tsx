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

  const additionalErrorMsg =
      `+ ${errors?.length - 1} other error${errors?.length - 1 > 1 ? "s" : ""}`;

  return (
    <div className="state__container">
      <div className="state-display">State: {state}</div>
      <div>
        <div className="state-error">
        {errors?.length > 0 ? (
          <div className="state-error__primary">
            <div className="state-error__primary__line-no">
              {errors[0].lineNo >= 0 ? `Error on line ${errors[0].lineNo}` : "Error"}
            </div>
            <div className="state-error__primary__msg">
              {errors[0].errMsg}
            </div>
          </div>
        ) : null}
        {errors?.length > 1 ? (
          <div className="state-error__additional">
            {additionalErrorMsg}
          </div>
        ): null}
        </div>
      </div>
      <div className="state-step-display">Steps: {steps}</div>
    </div>
  );
};

export default StateComponent;
