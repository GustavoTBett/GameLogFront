import styled from "styled-components";

export const CardRoot = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.spacing[12]};
  background-color: ${(props) => props.theme.colors.card};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: ${(props) => props.theme.spacing[24]};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes[24]};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.foreground};
`;

export const CardDescription = styled.p`
  margin: ${(props) => props.theme.spacing[8]} 0 0 0;
  font-size: ${(props) => props.theme.fontSizes[14]};
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const CardContent = styled.div`
  padding: ${(props) => props.theme.spacing[24]};
`;

export const CardFooter = styled.div`
  padding: ${(props) => props.theme.spacing[24]};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  gap: ${(props) => props.theme.spacing[16]};
  justify-content: flex-end;
`;
