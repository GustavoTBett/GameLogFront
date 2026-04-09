import React from "react";
import { StyledInput } from "./input.styled";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <StyledInput ref={ref} {...props} />
);

Input.displayName = "Input";
