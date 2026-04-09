import React from "react";
import { StyledButton } from "./button.styled";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "default", ...props }, ref) => (
    <StyledButton
      ref={ref}
      $variant={variant}
      $size={size}
      {...props}
    />
  )
);

Button.displayName = "Button";
