import styled from "styled-components";

export const StyledInput = styled.input`
  display: flex;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: ${(props) => props.theme.spacing[8]};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.foreground};
  font-size: ${(props) => props.theme.fontSizes[14]};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${(props) => props.theme.colors.mutedForeground};
  }

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.brand.green};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.brand.green};
    box-shadow: 0 0 0 3px ${(props) => props.theme.brand.green}15;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${(props) => props.theme.colors.secondary} inset;
    -webkit-text-fill-color: ${(props) => props.theme.colors.foreground};
  }
`;
