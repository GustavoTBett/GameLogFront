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

export const SearchSuggestions = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing[8]});
  left: 0;
  right: 0;
  z-index: 60;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.spacing[12]};
  background-color: ${({ theme }) => theme.colors.popover};
  box-shadow: ${({ theme }) => theme.shadows.shadow3};
`

export const SearchSuggestionsState = styled.div`
  padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[16]}`};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  text-align: center;
`

export const SearchSuggestionsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[8]} ${theme.spacing[8]}`};
  max-height: 24rem;
  overflow-y: auto;
`

export const SearchSuggestionLink = styled(Link)`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[12]};
  align-items: stretch;
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.foreground};
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }
`

export const SearchSuggestionMedia = styled.div`
  position: relative;
  flex-shrink: 0;
  display: grid;
  width: 4rem;
  height: 5rem;
  place-items: center;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.spacing[8]};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.secondary} 0%,
    ${({ theme }) => theme.colors.background} 100%
  );
  color: ${({ theme }) => theme.colors.mutedForeground};

  img {
    object-fit: cover;
  }
`

export const SearchSuggestionFallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes[10]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  text-align: center;
`

export const SearchSuggestionBody = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`

export const SearchSuggestionTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
`

export const SearchSuggestionDescription = styled.p`
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  line-height: 1.4;
`

export const SearchSuggestionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  flex-wrap: wrap;
  margin-top: auto;
`

export const SearchSuggestionRating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  svg {
    color: ${({ theme }) => theme.colors.primary};
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
