import React from "react";
import {
  CardRoot,
  CardHeader as CardHeaderStyled,
  CardTitle as CardTitleStyled,
  CardDescription as CardDescriptionStyled,
  CardContent as CardContentStyled,
  CardFooter as CardFooterStyled,
} from "./card.styled";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => <CardRoot ref={ref} {...props} />
);
Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => <CardHeaderStyled ref={ref} {...props} />
);
CardHeader.displayName = "CardHeader";

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  (props, ref) => <CardTitleStyled ref={ref} {...props} />
);
CardTitle.displayName = "CardTitle";

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>((props, ref) => <CardDescriptionStyled ref={ref} {...props} />);
CardDescription.displayName = "CardDescription";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (props, ref) => <CardContentStyled ref={ref} {...props} />
);
CardContent.displayName = "CardContent";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  (props, ref) => <CardFooterStyled ref={ref} {...props} />
);
CardFooter.displayName = "CardFooter";
