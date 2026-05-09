import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Page = styled.section`
  min-height: calc(100vh - ${({ theme }) => theme.spacing[64]});
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background:
    linear-gradient(135deg, ${({ theme }) => theme.colors.primary}14, transparent 32rem),
    ${({ theme }) => theme.colors.background};
`;

export const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[24]} ${({ theme }) => theme.spacing[16]};

  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme }) => theme.spacing[32]} ${({ theme }) => theme.spacing[24]};
  }

  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme }) => theme.spacing[48]} ${({ theme }) => theme.spacing[32]};
  }
`;

export const PageHeader = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[16]};
  margin-bottom: ${({ theme }) => theme.spacing[24]};
`;

export const TitleBlock = styled.div`
  min-width: 0;
`;

export const Eyebrow = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

export const Subtitle = styled.p`
  margin: ${({ theme }) => theme.spacing[8]} 0 0;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: ${({ theme }) => theme.lineHeights.normal};
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing[16]};
  align-items: start;

  ${({ theme }) => theme.media.laptop} {
    grid-template-columns: minmax(0, 1.7fr) minmax(20rem, 0.8fr);
    gap: ${({ theme }) => theme.spacing[24]};
  }
`;

const panelStyles = css`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

export const FormPanel = styled.form`
  ${panelStyles};
  padding: ${({ theme }) => theme.spacing[16]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[20]};

  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme }) => theme.spacing[24]};
  }
`;

export const SidePanel = styled.aside`
  ${panelStyles};
  padding: ${({ theme }) => theme.spacing[24]};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing[12]};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[12]};
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[20]};
`;

export const LoadingLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[12]};

  svg {
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing[16]};

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const InputShell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[10]};
  min-height: 2.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.input};
  padding: 0 ${({ theme }) => theme.spacing[12]};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  svg {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.mutedForeground};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.ring};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}24;
  }
`;

export const Input = styled.input`
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  color: ${({ theme }) => theme.colors.foreground};
  background: transparent;
  font-size: ${({ theme }) => theme.fontSizes[14]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }
`;

export const TextareaShell = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[8]};
  background: ${({ theme }) => theme.colors.input};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  svg {
    position: absolute;
    top: ${({ theme }) => theme.spacing[12]};
    left: ${({ theme }) => theme.spacing[12]};
    color: ${({ theme }) => theme.colors.mutedForeground};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.ring};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.ring}24;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 8rem;
  resize: vertical;
  border: 0;
  outline: 0;
  color: ${({ theme }) => theme.colors.foreground};
  background: transparent;
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[12]} ${theme.spacing[12]} ${theme.spacing[40]}`};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: ${({ theme }) => theme.lineHeights.normal};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }
`;

export const PlatformGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[10]};

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const PlatformToggle = styled.button<{ $active: boolean }>`
  min-height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.spacing[8]};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? `${theme.colors.primary}18` : theme.colors.input)};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.foreground)};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all 0.2s ease;

  span {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.spacing[12]};
  padding-top: ${({ theme }) => theme.spacing[4]};

  ${({ theme }) => theme.media.mobile} {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const buttonStyles = css`
  min-height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[16]}`};
  border: 1px solid transparent;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: filter 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  svg {
    flex: 0 0 auto;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }
`;

export const PrimaryButton = styled.button`
  ${buttonStyles};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};

  &:hover:not(:disabled) {
    filter: brightness(0.95);
  }

  .spin {
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const SecondaryButton = styled.button`
  ${buttonStyles};
  border-color: ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.foreground};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AvatarPreview = styled.div<{ $compact?: boolean }>`
  width: ${({ $compact }) => ($compact ? "4rem" : "7.5rem")};
  height: ${({ $compact }) => ($compact ? "4rem" : "7.5rem")};
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}26,
    ${({ theme }) => theme.colors.secondary}
  );
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme, $compact }) => ($compact ? theme.fontSizes[20] : theme.fontSizes[32])};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const PreviewName = styled.h2`
  margin: ${({ theme }) => theme.spacing[8]} 0 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  font-size: ${({ theme }) => theme.fontSizes[24]};
`;

export const PreviewEmail = styled.p`
  margin: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

export const PreviewBio = styled.p`
  margin: ${({ theme }) => theme.spacing[8]} 0;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  overflow-wrap: anywhere;
`;

export const MetaList = styled.div`
  width: 100%;
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  min-height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[12]};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SelectedPlatforms = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-top: ${({ theme }) => theme.spacing[8]};

  span {
    display: inline-flex;
    align-items: center;
    min-height: 1.75rem;
    padding: 0 ${({ theme }) => theme.spacing[10]};
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondaryForeground};
    font-size: ${({ theme }) => theme.fontSizes[12]};
  }
`;

export const Alert = styled.div<{ $variant: "error" | "success" }>`
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === "error" ? `${theme.colors.destructive}66` : `${theme.colors.primary}66`};
  border-radius: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[16]}`};
  background: ${({ theme, $variant }) =>
    $variant === "error" ? `${theme.colors.destructive}12` : `${theme.colors.primary}12`};
  color: ${({ theme, $variant }) =>
    $variant === "error" ? theme.colors.destructive : theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

export const FieldError = styled.span`
  color: ${({ theme }) => theme.colors.destructive};
  font-size: ${({ theme }) => theme.fontSizes[12]};
`;
