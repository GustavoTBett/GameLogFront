import React from "react";
import {
  CardRoot,
  CardHeader as CardHeaderStyled,
  CardTitle as CardTitleStyled,
  CardDescription as CardDescriptionStyled,
  CardContent as CardContentStyled,
  CardFooter as CardFooterStyled,
} from "./card.styled";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => <CardRoot ref={ref} {...props} />
);
Card.displayName = "Card";

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => <CardHeaderStyled ref={ref} {...props} />
);
CardHeader.displayName = "CardHeader";

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  (props, ref) => <CardTitleStyled ref={ref} {...props} />
);
CardTitle.displayName = "CardTitle";

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>((props, ref) => <CardDescriptionStyled ref={ref} {...props} />);
CardDescription.displayName = "CardDescription";

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (props, ref) => <CardContentStyled ref={ref} {...props} />
);
CardContent.displayName = "CardContent";

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  (props, ref) => <CardFooterStyled ref={ref} {...props} />
);
CardFooter.displayName = "CardFooter";
