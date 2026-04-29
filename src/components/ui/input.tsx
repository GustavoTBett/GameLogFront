import React from "react";
import { StyledInput } from "./input.styled";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <StyledInput ref={ref} {...props} />
);

Input.displayName = "Input";
