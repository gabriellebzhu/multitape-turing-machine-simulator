import * as React from "react";

interface LineNumberAndHighlightProps {
  lineNo: number;
  isCurrentLine: boolean;
  isError: boolean;
}

const LineNumberAndHighlight: React.FC<LineNumberAndHighlightProps> = (
  props: LineNumberAndHighlightProps,
) => {
  const { lineNo, isCurrentLine, isError } = props;

  const fillClasses = `program-input__line-highlight 
    ${isCurrentLine ? "program-input__current-line" : ""} 
    ${isError ? "program-input__error" : ""}`;

  return (
    <div className="program-input__line">
      <div className="program-input__line-number-tag">{lineNo}</div>
      <div className={fillClasses}></div>
    </div>
  );
};

export default LineNumberAndHighlight;
