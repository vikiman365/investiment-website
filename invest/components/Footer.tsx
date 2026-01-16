'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
   FaTwitter, FaLinkedin, FaInstagram, 
  FaYoutube, FaGithub, FaDiscord, FaPaperPlane, FaCheckCircle,
  FaRegEnvelope, FaShieldAlt, FaAward, FaHeadset
} from 'react-icons/fa'
import { FaMoneyBillTrendUp } from "react-icons/fa6";
const FooterContainer = styled.footer`
  background: linear-gradient(180deg, #0a0e2a 0%, #070a1a 100%);
  padding: 5rem 2rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #667eea, transparent);
  }

  @media (max-width: 768px) {
    padding: 4rem 1.5rem 1.5rem;
  }
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`

const FooterSection = styled(motion.div)`
  h4 {
    color: white;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p, a {
    color: #b0b7ff;
    line-height: 1.6;
    text-decoration: none;
    font-size: 0.95rem;
    margin-bottom: 0.875rem;
    display: block;
    transition: all 0.3s ease;

    &:hover {
      color: white;
      transform: translateX(5px);
    }
  }
`

const FooterLogo = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const FooterDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #b0b7ff;
  margin-bottom: 1.5rem;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`

const SocialLink = styled(motion.a)`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0b7ff;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.2);
  }
`

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.85rem;
  color: #b0b7ff;
`

const NewsletterForm = styled.form`
  margin-top: 1.5rem;
  position: relative;
`

const NewsletterInput = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #b0b7ff;
  }
`

const NewsletterButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
`

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.1));
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 12px;
  color: #4ade80;
  font-size: 0.9rem;
`

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`

const Copyright = styled.div`
  color: #b0b7ff;
  font-size: 0.875rem;
  line-height: 1.6;
`

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 1.5rem;
  }
`

const FooterLink = styled(Link as any)`
  color: #b0b7ff;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: #667eea;
    transition: width 0.3s ease;
  }

  &:hover {
    color: white;

    &::after {
      width: 100%;
    }
  }
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #b0b7ff;
  font-size: 0.9rem;
`

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  const investmentPlans = [
    { href: '/', label: 'Tech Innovators Fund' },
    { href: '/', label: 'Green Energy Portfolio' },
    { href: '/', label: 'Real Estate Trust' },
    { href: '/', label: 'Crypto & Digital Assets' },
    { href: '/', label: 'Healthcare Revolution' },
    { href: '/', label: 'Emerging Markets' },
  ]

  const resources = [
    { href: '/', label: 'Investment Research' },
    { href: '/', label: 'Market Insights' },
    { href: '/', label: 'Educational Center' },
    { href: '/', label: 'Webinars & Events' },
    { href: '/', label: 'Investment Calculator' },
    { href: '/', label: 'Help Center' },
  ]

  const company = [
    { href: '/about', label: 'About Us' },
    { href: '/', label: 'Careers' },
    { href: '/', label: 'Blog' },
    { href: '/', label: 'Press' },
    { href: '/', label: 'Partners' },
    { href: '/', label: 'Security' },
  ]

  const socialLinks = [
    { href: '#', icon: <FaTwitter />, label: 'Twitter' },
    { href: '#', icon: <FaLinkedin />, label: 'LinkedIn' },
    { href: '#', icon: <FaInstagram />, label: 'Instagram' },
    { href: '#', icon: <FaYoutube />, label: 'YouTube' },
    { href: '#', icon: <FaGithub />, label: 'GitHub' },
    { href: '#', icon: <FaDiscord />, label: 'Discord' },
  ]

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FooterLogo>
            <FaMoneyBillTrendUp /> WealthBridge
          </FooterLogo>
          <FooterDescription>
            Institutional-grade investment platform for individual and collaborative 
            investing. SEC registered and fully compliant with global financial regulations.
          </FooterDescription>

          <Badges>
            <Badge>
              <FaShieldAlt /> SEC Registered
            </Badge>
            <Badge>
              <FaAward /> SIPC Insured
            </Badge>
          </Badges>

          <SocialLinks>
            {socialLinks.map((social, index) => (
              <SocialLink
                key={index}
                href={social.href}
                aria-label={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </SocialLink>
            ))}
          </SocialLinks>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h4>Investment Plans</h4>
          {investmentPlans.map((plan, index) => (
            <FooterLink key={index} href={plan.href}>
              {plan.label}
            </FooterLink>
          ))}
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4>Resources</h4>
          {resources.map((resource, index) => (
            <FooterLink key={index} href={resource.href}>
              {resource.label}
            </FooterLink>
          ))}

          <ContactInfo>
            <ContactItem>
              <FaRegEnvelope />
              contact@wealthbridge.capital
            </ContactItem>
            <ContactItem>
              <FaHeadset />
              24/7 Support: +1 (555) 123-4567
            </ContactItem>
          </ContactInfo>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for the latest investment opportunities and market insights.</p>

          <NewsletterForm onSubmit={handleSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {subscribed ? (
              <SuccessMessage
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <FaCheckCircle /> Successfully subscribed!
              </SuccessMessage>
            ) : (
              <NewsletterButton
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaPaperPlane /> Subscribe Now
              </NewsletterButton>
            )}
          </NewsletterForm>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          © {new Date().getFullYear()} WealthBridge Capital. All rights reserved.<br />
          Investing involves risk including loss of principal. Past performance is not indicative of future results.
        </Copyright>

        <FooterLinks>
          <FooterLink href="/">Privacy Policy</FooterLink>
          <FooterLink href="/">Terms of Service</FooterLink>
          <FooterLink href="/">Cookie Policy</FooterLink>
          <FooterLink href="/">Disclosures</FooterLink>
          <FooterLink href="/">Regulatory Info</FooterLink>
          <FooterLink href="/">Sitemap</FooterLink>
        </FooterLinks>
      </FooterBottom>
    </FooterContainer>
  )
}