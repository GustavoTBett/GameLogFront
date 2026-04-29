import styled from "styled-components";
import Link from "next/link";

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100svh;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  position: relative;
`;

export const AuthBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary}08 0%,
    ${(props) => props.theme.colors.background} 45%,
    ${(props) => props.theme.colors.background} 100%
  );
  pointer-events: none;
`;

export const AuthContent = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 28rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing[8]};
  margin-bottom: ${(props) => props.theme.spacing[32]};
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  span {
    font-size: ${(props) => props.theme.fontSizes[24]};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    color: ${(props) => props.theme.colors.foreground};
    letter-spacing: -0.5px;
  }

  svg {
    color: ${(props) => props.theme.colors.primary};
    width: 40px;
    height: 40px;
  }
`;

export const CardWrapper = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 0.75rem;
  background-color: ${(props) => props.theme.colors.card};
  box-shadow: ${(props) => props.theme.shadows.shadow1};
  overflow: hidden;

  @supports (backdrop-filter: blur(4px)) {
    background-color: color-mix(
      in srgb,
      ${(props) => props.theme.colors.card} 50%,
      transparent
    );
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
`;

export const CardHeader = styled.div`
  padding: ${(props) => props.theme.spacing[24]};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  text-align: center;
`;

export const CardTitle = styled.h1`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes[24]};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.foreground};
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;

export const CardDescription = styled.p`
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes[14]};
  color: ${(props) => props.theme.colors.mutedForeground};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

export const CardContent = styled.div`
  padding: ${(props) => props.theme.spacing[24]};
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[16]};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[8]};
`;

export const FormLabel = styled.label`
  font-size: ${(props) => props.theme.fontSizes[14]};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.foreground};
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: ${(props) => props.theme.spacing[12]};
    width: 16px;
    height: 16px;
    color: ${(props) => props.theme.colors.mutedForeground};
    pointer-events: none;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing[8]} ${(props) => props.theme.spacing[12]};
  padding-left: 2.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 0.375rem;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.foreground};
  font-size: ${(props) => props.theme.fontSizes[14]};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${(props) => props.theme.colors.mutedForeground};
  }

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.colors.border};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary}26;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: ${(props) => props.theme.spacing[4]};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.mutedForeground};
  transition: color 0.2s ease;

  &:hover:not(:disabled) {
    color: ${(props) => props.theme.colors.foreground};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    position: relative;
    left: 0;
    width: 18px;
    height: 18px;
    pointer-events: none;
  }
`;

export const ErrorMessage = styled.p`
  font-size: ${(props) => props.theme.fontSizes[14]};
  color: ${(props) => props.theme.colors.destructive};
  margin: 0;
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

export const SubmitError = styled.div`
  padding: ${(props) => props.theme.spacing[12]};
  border-radius: ${(props) => props.theme.spacing[8]};
  background-color: ${(props) => props.theme.colors.destructive}15;
  color: ${(props) => props.theme.colors.destructive};
  font-size: ${(props) => props.theme.fontSizes[14]};
  border: 1px solid ${(props) => props.theme.colors.destructive}30;
`;

export const SubmitSuccess = styled.div`
  padding: ${(props) => props.theme.spacing[12]};
  border-radius: ${(props) => props.theme.spacing[8]};
  background-color: ${(props) => props.theme.colors.primary}15;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes[14]};
  border: 1px solid ${(props) => props.theme.colors.primary}30;
`;

export const ForgotPasswordLink = styled(Link)`
  display: flex;
  justify-content: flex-end;
  font-size: ${(props) => props.theme.fontSizes[14]};
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  font-weight: ${(props) => props.theme.fontWeights.medium};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: ${(props) => props.theme.spacing[8]} ${(props) => props.theme.spacing[16]};
  border: none;
  border-radius: 0.375rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  font-size: ${(props) => props.theme.fontSizes[14]};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-top: ${(props) => props.theme.spacing[8]};

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CardFooter = styled.div`
  padding: ${(props) => props.theme.spacing[24]};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  text-align: center;
`;

export const FooterText = styled.div`
  display: inline;
  font-size: ${(props) => props.theme.fontSizes[14]};
  color: ${(props) => props.theme.colors.mutedForeground};
`;

export const FooterLink = styled(Link)`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  font-weight: ${(props) => props.theme.fontWeights.medium};
  margin-left: ${(props) => props.theme.spacing[4]};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const BackHomeLink = styled(Link)`
  display: block;
  margin-top: ${(props) => props.theme.spacing[24]};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes[14]};
  color: ${(props) => props.theme.colors.mutedForeground};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.foreground};
  }
`;
