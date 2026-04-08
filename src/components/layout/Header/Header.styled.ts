import styled from 'styled-components'
import Link from 'next/link'

export const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background}F2;
  backdrop-filter: blur(8px);
`

export const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;

  padding: 0 ${({ theme }) => theme.spacing[16]};

  ${({ theme }) => theme.media.mobile} {
    padding: 0 ${({ theme }) => theme.spacing[24]};
  }

  ${({ theme }) => theme.media.tablet} {
    padding: 0 ${({ theme }) => theme.spacing[32]};
  }
`

export const NavContent = styled.div`
  display: flex;
  height: ${({ theme }) => theme.spacing[64]};
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[16]};
`

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  flex-shrink: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.foreground};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes[20]};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    display: none;
    
    ${({ theme }) => theme.media.mobile} {
      display: block;
    }
  }
`

export const DesktopNav = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[24]};

  ${({ theme }) => theme.media.tablet} {
    display: flex;
  }
`

export const NavItem = styled(Link)<{ $isActive?: boolean; $isMobile?: boolean; $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: all 0.2s;
  
  padding: ${({ $isMobile, theme }) => $isMobile ? `${theme.spacing[8]} ${theme.spacing[12]}` : '0'};
  border-radius: ${({ $isMobile, theme }) => $isMobile ? theme.spacing[8] : '0'};

  background-color: ${({ $isActive, $isMobile, theme }) => 
    ($isActive && $isMobile) ? `${theme.colors.primary}15` : 'transparent'};

  color: ${({ $isActive, $danger, theme }) => {
    if ($danger) return theme.colors.destructive;
    return $isActive ? theme.colors.primary : theme.colors.mutedForeground;
  }};

  &:hover {
    background-color: ${({ $isMobile, theme }) => $isMobile ? theme.colors.secondary : 'transparent'};
    color: ${({ theme, $danger }) => $danger ? theme.colors.destructive : theme.colors.foreground};
  }
`;

export const MenuLink = styled(Link)<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${({ $danger, theme }) => ($danger ? theme.colors.destructive : 'inherit')};

  svg {
    margin-right: ${({ theme }) => theme.spacing[8]};
    color: ${({ $danger, theme }) => ($danger ? theme.colors.destructive : theme.colors.mutedForeground)};
  }
`

export const SearchWrapper = styled.div<{ $isMobile?: boolean }>`
  position: relative;
  
  ${({ theme, $isMobile }) => !$isMobile && `
    display: none;

    ${theme.media.mobile} {
      display: block;
      flex: 1;
      max-width: 28rem;
    }
  `}

  ${({ theme, $isMobile }) => $isMobile && `
    display: block;
    margin-bottom: ${theme.spacing[16]};

    ${theme.media.mobile} {
      display: none;
    }
  `}

  svg {
    position: absolute;
    left: ${({ theme }) => theme.spacing[12]};
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[8]} ${theme.spacing[8]} 2.5rem`};
  border-radius: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.foreground};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.ring};
  }
`

export const UserActions = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[12]};

  ${({ theme }) => theme.media.tablet} {
    display: flex;
  }
`

export const MobileMenuButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: none;
  color: ${({ theme }) => theme.colors.foreground};

  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`

export const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${({ theme }) => theme.spacing[16]};
  margin-bottom: ${({ theme }) => theme.spacing[16]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MobileMenu = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing[16]} 0`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

export const MobileNavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`

export const ActionButton = styled.button<{ $variant?: 'ghost' | 'primary' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[8]}`};
  border-radius: 50%;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  border: none;
  transition: all 0.2s;

  background-color: ${({ $variant, theme }) => 
    $variant === 'ghost' ? 'transparent' : theme.colors.primary};
    
  color: ${({ $variant, theme }) => 
    $variant === 'ghost' ? theme.colors.mutedForeground : theme.colors.primaryForeground};

  &:hover {
    background-color: ${({ $variant, theme }) => 
      $variant === 'ghost' ? theme.colors.secondary : theme.colors.primary};
      
    color: ${({ $variant, theme }) => 
      $variant === 'ghost' ? theme.colors.primary : theme.colors.primaryForeground};
      
    filter: ${({ $variant }) => 
      $variant === 'primary' ? 'brightness(0.9)' : 'none'};
  }
`
