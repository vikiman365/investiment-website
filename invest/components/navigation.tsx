'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaBars, FaWallet, FaChartLine, FaUsers, FaBuilding } from 'react-icons/fa'
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

const MobileMenuButton = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #b0b7ff;
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
  width: 320px;
  background: rgba(10, 14, 42, 0.98);
  backdrop-filter: blur(20px);
  padding: 5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 999;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
`

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 998;
`

// Mobile Link wrapper
const MobileLinkWrapper = styled.span<ActiveLinkProps>`
  a {
    color: ${({ $isActive }) => $isActive ? '#ffffff' : '#b0b7ff'};
    text-decoration: none;
    font-weight: 500;
    font-size: 1.125rem;
    padding: 0.875rem 1rem;
    border-radius: 12px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: ${({ $isActive }) => 
      $isActive ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
    border: 1px solid ${({ $isActive }) => 
      $isActive ? 'rgba(102, 126, 234, 0.4)' : 'rgba(255, 255, 255, 0.1)'};

    &:hover {
      background: rgba(102, 126, 234, 0.2);
      color: white;
      transform: translateX(5px);
    }
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

const ScrollToButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  padding: 0;
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
  const pathname = usePathname()

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

  const handleScrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      window.location.href = `/#${sectionId}`
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleMobileLinkClick = (item: NavItem) => {
    if (item.type === 'scroll') {
      handleScrollToSection(item.href.replace('#', ''))
    }
    setMobileOpen(false)
  }

  const handleCTAClick = () => {
    if (pathname !== '/') {
      window.location.href = '/#cta'
    } else {
      const ctaSection = document.getElementById('cta')
      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
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
                <ScrollToButton
                  key={item.href}
                  onClick={() => handleScrollToSection(item.href.replace('#', ''))}
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
                </ScrollToButton>
              )
            ))}
            
            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCTAClick}
            >
              <FaWallet />
              Start Investing
            </CTAButton>
          </NavLinks>

          <MobileMenuButton onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavContainer>
      </Nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <MobileMenuOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {navItems.map((item) => (
                  item.type === 'link' ? (
                    <MobileLinkWrapper 
                      key={item.href} 
                      $isActive={isActive(item.href)}
                      onClick={() => handleMobileLinkClick(item)}
                    >
                      <Link 
                        href={item.href as any}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
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
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '0.875rem 1rem',
                        fontSize: '1.125rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  )
                ))}
              </div>
              
              <CTAButton
                style={{ marginTop: '2rem' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMobileOpen(false)
                  setTimeout(handleCTAClick, 300)
                }}
              >
                <FaWallet />
                Start Investing
              </CTAButton>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  )
}