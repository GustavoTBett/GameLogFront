import styled from 'styled-components'

export const FooterWrapper = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing[32]} 0;
`

export const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[32]};
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[16]};

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
  }
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.foreground};

  svg {
    width: ${({ theme }) => theme.spacing[24]};
    height: ${({ theme }) => theme.spacing[24]};
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: ${({ theme }) => theme.fontSizes[16]}; 
  }
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.mutedForeground};
`