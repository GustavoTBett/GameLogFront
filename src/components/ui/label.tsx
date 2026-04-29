import React from "react";
import { StyledLabel } from "./label.styled";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref) => <StyledLabel ref={ref} {...props} />
);

Label.displayName = "Label";
