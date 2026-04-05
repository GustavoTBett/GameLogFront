import styled from "styled-components";

export const StyledLabel = styled.label`
  display: block;
  font-size: ${(props) => props.theme.fontSizes[14]};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.foreground};
  margin-bottom: ${(props) => props.theme.spacing[8]};
  cursor: pointer;
`;
