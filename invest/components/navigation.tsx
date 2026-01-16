'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaBars, FaWallet, FaChartLine, FaUsers, FaBuilding, FaUser, FaSignInAlt, FaUserPlus, FaCaretDown } from 'react-icons/fa'
import { FaMoneyBillTrendUp } from "react-icons/fa6";

// Define types for props
interface NavProps {
  $scrolled: boolean;
}

interface ActiveLinkProps {
  $isActive?: boolean;
}

// Styled components
const Nav = styled.nav<NavProps>`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${({ $scrolled }) => 
    $scrolled ? 'rgba(10, 14, 42, 0.98)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(15px)' : 'none'};
  z-index: 1000;
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ $scrolled }) => 
    $scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const NavContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogoContainer = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const LogoIcon = styled(motion.div)`
  font-size: 1.5rem;
`

// Custom Link wrapper component that accepts active state
const NavLinkWrapper = styled.span<ActiveLinkProps>`
  a {
    color: ${({ $isActive }) => $isActive ? '#ffffff' : '#b0b7ff'};
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    position: relative;
    padding: 0.5rem 0;
    transition: color 0.3s ease;

    &:hover {
      color: #ffffff;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: ${({ $isActive }) => $isActive ? '100%' : '0'};
      height: 2px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      transition: width 0.3s ease;
      border-radius: 1px;
    }

    &:hover::after {
      width: 100%;
    }
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 2.25rem;
  align-items: center;

  @media (max-width: 1024px) {
    gap: 1.75rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

// Auth Buttons Container for Desktop
const AuthButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`

const LoginButton = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  background: transparent;
  color: #b0b7ff;
  border: 2px solid rgba(102, 126, 234, 0.5);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    color: #ffffff;
    border-color: #667eea;
    transform: translateY(-1px);
  }
`

const SignUpButton = styled(motion.button)`
  padding: 0.6rem 1.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  }
`

// Mobile Menu Styles - Enhanced
const MobileMenuButton = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #52525d;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    color: white;
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 350px;
  background: rgba(10, 14, 42, 0.98);
  backdrop-filter: blur(20px);
  padding: 5rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 999;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
`

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 998;
`

// Mobile Link wrapper - Enhanced
const MobileLinkWrapper = styled.div<ActiveLinkProps>`
  a {
    color: ${({ $isActive }) => $isActive ? '#ffffff' : '#b0b7ff'};
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    padding: 1rem;
    border-radius: 12px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 1rem;
    background: ${({ $isActive }) => 
      $isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent'};
    border-left: 3px solid ${({ $isActive }) => 
      $isActive ? '#667eea' : 'transparent'};
    margin-bottom: 0.5rem;

    &:hover {
      background: rgba(102, 126, 234, 0.1);
      color: white;
      padding-left: 1.5rem;
    }
  }
`

// Mobile Auth Container
const MobileAuthContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const MobileLoginButton = styled.button`
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  background: transparent;
  color: #b0b7ff;
  border: 2px solid rgba(102, 126, 234, 0.5);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    color: #ffffff;
    border-color: #667eea;
  }
`

const MobileSignUpButton = styled.button`
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  }
`

// User Dropdown (for future authentication)
const UserDropdown = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #b0b7ff;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
  }
`

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: rgba(10, 14, 42, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.5rem;
  min-width: 200px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 1001;
`

const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  color: #b0b7ff;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    color: #ffffff;
  }
`

const CTAButton = styled(motion.button)`
  padding: 0.75rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }
`

interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
  type: 'link' | 'scroll';
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // For future auth implementation
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: NavItem[] = [
    { href: '/', label: 'Home', icon: <FaMoneyBillTrendUp />, type: 'link' },
    { href: '/about', label: 'About', icon: <FaUsers />, type: 'link' },
    { href: '/plans', label: 'Plans', icon: <FaChartLine />, type: 'link' },
    { href: '/dashboard', label: 'Dashboard', icon: <FaUsers />, type: 'link' },
    { href: '/assets', label: 'Assets', icon: <FaBuilding />, type: 'link' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href) || false
  }

  const handleAuthNavigation = (route: string) => {
    setMobileOpen(false)
    router.push(route as any)
  }

  const handleMobileLinkClick = (item: NavItem) => {
    if (item.type === 'scroll') {
      // Handle scroll logic here if needed
    }
    setMobileOpen(false)
  }

  const handleStartInvesting = () => {
    setMobileOpen(false)
    if (pathname !== '/') {
      router.push('/#cta' as any)
    } else {
      const ctaSection = document.getElementById('cta')
      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  }

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  }

  return (
    <>
      <Nav $scrolled={scrolled}>
        <NavContainer>
          <LogoContainer>
            <Link 
              href="/" 
              style={{ 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.625rem' 
              }}
            >
              <LogoIcon
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <FaMoneyBillTrendUp />
              </LogoIcon>
              WealthBridge
            </Link>
          </LogoContainer>

          <NavLinks>
            {navItems.map((item) => (
              item.type === 'link' ? (
                <NavLinkWrapper key={item.href} $isActive={isActive(item.href)}>
                  <Link href={item.href as any}>
                    {item.label}
                  </Link>
                </NavLinkWrapper>
              ) : (
                <button
                  key={item.href}
                  onClick={() => {}}
                  style={{
                    color: '#b0b7ff',
                    background: 'none',
                    border: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    padding: '0.5rem 0',
                    position: 'relative',
                  }}
                >
                  {item.label}
                </button>
              )
            ))}
          </NavLinks>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {!isAuthenticated ? (
              <AuthButtonsContainer>
                <LoginButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/auth/login' as any)}
                >
                  <FaSignInAlt />
                  Login
                </LoginButton>
                <SignUpButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/auth/signup' as any)}
                >
                  <FaUserPlus />
                  Sign Up
                </SignUpButton>
              </AuthButtonsContainer>
            ) : (
              <UserDropdown
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <FaUser />
                <span>John Doe</span>
                <FaCaretDown />
                <AnimatePresence>
                  {showUserDropdown && (
                    <DropdownMenu
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <DropdownItem>
                        <FaUser />
                        Profile
                      </DropdownItem>
                      <DropdownItem>
                        <FaWallet />
                        Wallet
                      </DropdownItem>
                      <DropdownItem>
                        <FaChartLine />
                        Investments
                      </DropdownItem>
                      <DropdownItem style={{ color: '#ff6b6b' }}>
                        <FaSignInAlt />
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  )}
                </AnimatePresence>
              </UserDropdown>
            )}

            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartInvesting}
            >
              
              
            </CTAButton>

            <MobileMenuButton onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </MobileMenuButton>
          </div>
        </NavContainer>
      </Nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <MobileMenuOverlay
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setMobileOpen(false)}
            />
            <MobileMenu
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ 
                  color: '#667eea', 
                  fontSize: '0.9rem', 
                  fontWeight: 600,
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Navigation
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {navItems.map((item) => (
                    item.type === 'link' ? (
                      <MobileLinkWrapper 
                        key={item.href} 
                        $isActive={isActive(item.href)}
                        onClick={() => handleMobileLinkClick(item)}
                      >
                        <Link 
                          href={item.href as any}
                          style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      </MobileLinkWrapper>
                    ) : (
                      <button
                        key={item.href}
                        onClick={() => handleMobileLinkClick(item)}
                        style={{
                          color: '#b0b7ff',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '1rem',
                          fontSize: '1.1rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    )
                  ))}
                </div>
              </div>

              <MobileAuthContainer>
                <p style={{ 
                  color: '#667eea', 
                  fontSize: '0.9rem', 
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Account
                </p>
                
                {!isAuthenticated ? (
                  <>
                    <MobileLoginButton onClick={() => handleAuthNavigation('/auth/login')}>
                      <FaSignInAlt />
                      Login
                    </MobileLoginButton>
                    <MobileSignUpButton onClick={() => handleAuthNavigation('/auth/signup')}>
                      <FaUserPlus />
                      Create Account
                    </MobileSignUpButton>
                  </>
                ) : (
                  <>
                    <div style={{ 
                      background: 'rgba(102, 126, 234, 0.1)', 
                      padding: '1rem', 
                      borderRadius: '10px',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white'
                        }}>
                          <FaUser />
                        </div>
                        <div>
                          <p style={{ color: 'white', fontWeight: 600 }}>John Doe</p>
                          <p style={{ color: '#b0b7ff', fontSize: '0.85rem' }}>Premium Investor</p>
                        </div>
                      </div>
                    </div>
                    
                    <button style={{
                      padding: '0.75rem',
                      background: 'transparent',
                      color: '#ff6b6b',
                      border: '1px solid rgba(255, 107, 107, 0.3)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}>
                      <FaSignInAlt />
                      Logout
                    </button>
                  </>
                )}
              </MobileAuthContainer>

              <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                <CTAButton
                  style={{ width: '100%' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartInvesting}
                >
                  
                  
                </CTAButton>
              </div>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  )
}