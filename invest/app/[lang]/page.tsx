'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaChartLine, FaUsers, FaShieldAlt, FaRocket, 
  FaStar, FaCheckCircle, FaRegHandshake, FaGlobe, FaLock, 
  FaLightbulb, FaHandshake, FaArrowRight, FaPlus, FaDatabase,
  FaMoneyBillWave, FaUserFriends, FaPiggyBank, FaShapes,
  FaBullhorn, FaAward, FaCrown, FaCoins, FaGem, FaApple,
  FaBitcoin, FaBuilding, FaChartBar, FaCreditCard,
  FaExchangeAlt, FaPercent, FaUnlockAlt, FaWallet, 
  FaGlobeAmericas, FaIndustry, FaQuoteLeft, FaChevronRight,
  FaLeaf, FaBolt, FaMountain, FaShip, FaPlane, FaRobot,
  FaSolarPanel, FaHeartbeat, FaFilm, FaGamepad, FaCar,
  FaTree, FaUniversity, FaInfinity, FaCogs, FaRecycle,
  FaMicrochip, FaSatellite, FaSeedling, FaWater, FaWind
} from 'react-icons/fa'
import { FaShield } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

// Import Components - Use correct relative paths
import PhoneMockup from  '../../components/PhoneMockUp'
// STYLED COMPONENTS
// ====================
const PageWrapper = styled.div`
  background: linear-gradient(135deg, #0a0e2a 0%, #1a1f4b 100%);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

// 1. HERO SECTION
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  padding: 8rem 2rem 6rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0e2a 0%, #1a1f4b 50%, #0a0e2a 100%);

  @media (max-width: 768px) {
    padding: 6rem 1.5rem 4rem;
  }

  @media (max-width: 480px) {
    padding: 5rem 1rem 3rem;
  }
`

const HeroContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
`

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    gap: 2rem;
  }
`

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Tagline = styled(motion.div)`
  font-size: 0.9rem;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
    font-size: 0.85rem;
  }
`

const MainHeading = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #a8b1ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    line-height: 1.2;
  }
`

const Description = styled(motion.p)`
  font-size: 1.125rem;
  line-height: 1.6;
  color: #b0b7ff;
  margin-bottom: 0.5rem;
  max-width: 90%;

  @media (max-width: 1024px) {
    max-width: 100%;
    font-size: 1.05rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const InvestmentFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.25rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const InvestmentFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: #b0b7ff;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const PrimaryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 0.95rem;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }

  @media (max-width: 480px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.875rem;
    justify-content: center;
  }
`

const SecondaryButton = styled(PrimaryButton)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

const InvestmentStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.25rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 480px) {
    padding: 1rem;
  }
`

const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: #a8b1ff;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`

const FloatingElement = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  filter: blur(40px);
`

// ====================
// 2. ABOUT SECTION
// ====================
const AboutSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(180deg, #0a0e2a 0%, #141a3a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #a8b1ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #b0b7ff;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`

const AboutCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(102, 126, 234, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const AboutIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: white;

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`

const AboutCardTitle = styled.h3`
  font-size: 1.25rem;
  color: white;
  margin-bottom: 1rem;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 1.125rem;
  }
`

const AboutCardText = styled.p`
  color: #b0b7ff;
  line-height: 1.6;
  font-size: 0.95rem;
`

// ====================
// 3. INVESTMENT PLANS SECTION
// ====================
const PlansSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #141a3a 0%, #0a0e2a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const PlansHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const PlanCard = styled(motion.a)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  display: block;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    border-color: ${props => props.color || 'rgba(102, 126, 234, 0.4)'};
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 700;
`

const PlanIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  flex-shrink: 0;
`

const PlanDescription = styled.p`
  color: #b0b7ff;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 0.95rem;
`

const PlanFeatures = styled.div`
  margin-bottom: 2rem;
`

const PlanFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #b0b7ff;

  svg {
    color: #4ade80;
    flex-shrink: 0;
  }
`

const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`

const PlanPriceNote = styled.div`
  font-size: 0.85rem;
  color: #b0b7ff;
  margin-bottom: 1.5rem;
`

const PlanButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;

  ${PlanCard}:hover & {
    background: ${props => props.color || 'rgba(102, 126, 234, 0.2)'};
    transform: translateX(5px);
  }
`

// ====================
// 4. TESTIMONIALS SECTION
// ====================
const TestimonialsSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(180deg, #0a0e2a 0%, #141a3a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const TestimonialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(102, 126, 234, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const TestimonialContent = styled.div`
  flex: 1;
  margin-bottom: 1.5rem;
`

const QuoteIcon = styled.div`
  color: #667eea;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const TestimonialText = styled.p`
  color: #b0b7ff;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
`

const AuthorImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
  flex-shrink: 0;
`

const AuthorInfo = styled.div`
  flex: 1;
`

const AuthorName = styled.div`
  font-weight: 600;
  color: white;
  font-size: 1rem;
  margin-bottom: 0.25rem;
`

const AuthorRole = styled.div`
  font-size: 0.85rem;
  color: #b0b7ff;
`

// ====================
// 5. ASSET CLASSES SECTION
// ====================
const AssetsSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #141a3a 0%, #0a0e2a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const AssetsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`

const AssetCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const AssetIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #667eea;
`

const AssetName = styled.h4`
  font-size: 1.125rem;
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 600;
`

const AssetPerformance = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4ade80;
  margin-bottom: 0.25rem;
`

// ====================
// 6. CTA SECTION
// ====================
const CTASection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const CTATitle = styled.h2`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`

const CTADescription = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const CTAButton = styled(motion.button)`
  padding: 1rem 3rem;
  font-size: 1rem;
  font-weight: 600;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    padding: 0.875rem 2rem;
    font-size: 0.95rem;
    width: 100%;
    justify-content: center;
  }
`

// ====================
// MAIN COMPONENT
// ====================
export default function InvestmentPlatform() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Investment Plans Data
  const investmentPlans = [
    {
      id: 1,
      title: "Tech Innovators Fund",
      description: "Invest in cutting-edge technology companies driving the Fourth Industrial Revolution.",
      icon: <FaMicrochip />,
      color: "#3b82f6",
      features: ["AI & Robotics", "Quantum Computing", "Biotech", "Space Tech"],
      minInvestment: "$5,000",
      targetReturns: "18-25%",
      riskLevel: "High",
      href: "/plans/tech-innovators"
    },
    {
      id: 2,
      title: "Green Energy Portfolio",
      description: "Sustainable investments in renewable energy and clean technology solutions.",
      icon: <FaSolarPanel />,
      color: "#10b981",
      features: ["Solar Farms", "Wind Energy", "Hydrogen Tech", "EV Infrastructure"],
      minInvestment: "$3,000",
      targetReturns: "12-18%",
      riskLevel: "Medium",
      href: "/plans/green-energy"
    },
    {
      id: 3,
      title: "Real Estate Trust",
      description: "Diversified portfolio of commercial and residential properties worldwide.",
      icon: <FaBuilding />,
      color: "#f59e0b",
      features: ["Commercial REITs", "Residential", "Industrial", "Hospitality"],
      minInvestment: "$10,000",
      targetReturns: "8-12%",
      riskLevel: "Low",
      href: "/plans/real-estate"
    },
    {
      id: 4,
      title: "Crypto & Digital Assets",
      description: "Strategic allocation in blockchain technology and digital currencies.",
      icon: <FaBitcoin />,
      color: "#8b5cf6",
      features: ["Bitcoin", "Ethereum", "DeFi Protocols", "NFT Platforms"],
      minInvestment: "$1,000",
      targetReturns: "20-35%",
      riskLevel: "Very High",
      href: "/plans/crypto-assets"
    },
    {
      id: 5,
      title: "Healthcare Revolution",
      description: "Investing in breakthrough medical technologies and healthcare services.",
      icon: <FaHeartbeat />,
      color: "#ef4444",
      features: ["Biopharma", "Telemedicine", "Medical Devices", "Genomics"],
      minInvestment: "$7,500",
      targetReturns: "15-22%",
      riskLevel: "Medium-High",
      href: "/plans/healthcare"
    },
    {
      id: 6,
      title: "Emerging Markets",
      description: "Growth opportunities in developing economies with high potential.",
      icon: <FaGlobeAmericas />,
      color: "#ec4899",
      features: ["Asia Pacific", "Latin America", "Africa", "Frontier Markets"],
      minInvestment: "$5,000",
      targetReturns: "14-20%",
      riskLevel: "High",
      href: "/plans/emerging-markets"
    }
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Portfolio Manager",
      company: "TechGrowth Capital",
      text: "WealthBridge transformed how we manage client portfolios. The platform's analytics and collaborative features are exceptional.",
      initials: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Private Investor",
      company: "Self-Employed",
      text: "As an individual investor, I finally have access to opportunities that were previously out of reach. Returns have exceeded expectations.",
      initials: "MC"
    },
    {
      name: "Elena Rodriguez",
      role: "Investment Director",
      company: "Global Ventures",
      text: "The syndicate investing feature allowed us to pool resources and secure deals that would be impossible individually. Game-changing platform.",
      initials: "ER"
    },
    {
      name: "David Park",
      role: "Family Office",
      company: "Park Capital Group",
      text: "Security and transparency were our top concerns. WealthBridge delivers on both while providing superior returns.",
      initials: "DP"
    },
  ]

  // Asset classes data
  const assetClasses = [
    { icon: <FaBitcoin />, name: "Cryptocurrency", performance: "+24.5%" },
    { icon: <FaChartLine />, name: "Stocks & ETFs", performance: "+12.3%" },
    { icon: <FaBuilding />, name: "Real Estate", performance: "+8.7%" },
    { icon: <FaCoins />, name: "Commodities", performance: "+5.9%" },
    { icon: <FaIndustry />, name: "Private Equity", performance: "+15.2%" },
    { icon: <FaChartBar />, name: "Fixed Income", performance: "+4.2%" }
  ]

  return (
    <PageWrapper>
      {/* Removed Navigation and Footer components since they're in layout.tsx */}

      {/* 1. HERO SECTION */}
      <HeroSection id="home">
        <FloatingElements>
          <FloatingElement
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ 
              top: '10%', 
              left: '5%', 
              width: '300px', 
              height: '300px' 
            }}
          />
          <FloatingElement
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ 
              bottom: '10%', 
              right: '5%', 
              width: '250px', 
              height: '250px' 
            }}
          />
        </FloatingElements>

        <HeroContainer>
          <HeroGrid>
            <ContentColumn>
              <Tagline
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <FaRegHandshake /> Trusted by 5M+ Investors
              </Tagline>

              <MainHeading
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Smart Investments.<br />Exceptional Returns.
              </MainHeading>

              <Description
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Access premium investment opportunities previously reserved for institutional 
                investors. Combine capital with trusted partners to maximize returns.
              </Description>

              <InvestmentFeatures>
                <InvestmentFeature>
                  <FaCheckCircle style={{ color: '#4ade80' }} />
                  Zero Management Fees
                </InvestmentFeature>
                <InvestmentFeature>
                  <FaLock style={{ color: '#667eea' }} />
                  SEC-Registered Platform
                </InvestmentFeature>
                <InvestmentFeature>
                  <FaChartLine style={{ color: '#fbbf24' }} />
                  AI-Powered Analytics
                </InvestmentFeature>
                <InvestmentFeature>
                  <FaUsers style={{ color: '#8b5cf6' }} />
                  Collaborative Investing
                </InvestmentFeature>
              </InvestmentFeatures>

              <InvestmentStats
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <StatCard>
                  <StatValue>5M+</StatValue>
                  <StatLabel>Active Investors</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>$10B+</StatValue>
                  <StatLabel>Assets Under Management</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>16.8%</StatValue>
                  <StatLabel>Average Annual Returns</StatLabel>
                </StatCard>
              </InvestmentStats>

              <ButtonGroup>
                <PrimaryButton
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaMoneyBillTrendUp />
                  Start Investing Now
                </PrimaryButton>
                <SecondaryButton
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChartBar />
                  View Strategies
                </SecondaryButton>
              </ButtonGroup>
            </ContentColumn>

            <div>
              {/* Use PhoneMockup Component */}
              <PhoneMockup />
            </div>
          </HeroGrid>
        </HeroContainer>
      </HeroSection>

      {/* 2. ABOUT SECTION */}
      <AboutSection id="about" ref={ref1}>
        <AboutContainer>
          <AboutHeader>
            <SectionTitle>About WealthBridge</SectionTitle>
            <SectionSubtitle>
              We're revolutionizing investment by democratizing access to institutional-grade opportunities. 
              Our platform combines cutting-edge technology with deep financial expertise to deliver exceptional 
              returns for investors of all sizes.
            </SectionSubtitle>
          </AboutHeader>

          <AboutGrid>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <AboutCard whileHover={{ scale: 1.03 }}>
                <AboutIcon>
                  <FaUsers />
                </AboutIcon>
                <AboutCardTitle>Community First</AboutCardTitle>
                <AboutCardText>
                  Join a network of 5 million investors who collaborate, share insights, and pool resources to access better opportunities.
                </AboutCardText>
              </AboutCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AboutCard whileHover={{ scale: 1.03 }}>
                <AboutIcon>
                  <FaChartLine />
                </AboutIcon>
                <AboutCardTitle>AI-Powered Insights</AboutCardTitle>
                <AboutCardText>
                  Our proprietary algorithms analyze millions of data points to identify optimal investment opportunities and manage risk.
                </AboutCardText>
              </AboutCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AboutCard whileHover={{ scale: 1.03 }}>
                <AboutIcon>
                  <FaShield />
                </AboutIcon>
                <AboutCardTitle>Regulatory Excellence</AboutCardTitle>
                <AboutCardText>
                  Fully SEC registered and SIPC insured, with bank-grade security protocols protecting your investments and personal data.
                </AboutCardText>
              </AboutCard>
            </motion.div>
          </AboutGrid>
        </AboutContainer>
      </AboutSection>

      {/* 3. INVESTMENT PLANS SECTION */}
      <PlansSection id="plans" ref={ref2}>
        <PlansHeader>
          <SectionTitle>Investment Plans for Every Goal</SectionTitle>
          <SectionSubtitle>
            Choose from a diverse range of professionally managed investment plans tailored to different risk profiles and financial objectives.
          </SectionSubtitle>
        </PlansHeader>

        <PlansGrid>
          {investmentPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PlanCard
                href={plan.href}
                color={plan.color}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlanHeader>
                  <div>
                    <PlanTitle>{plan.title}</PlanTitle>
                    <div style={{ fontSize: '0.875rem', color: '#b0b7ff' }}>
                      Risk Level: <span style={{ color: plan.color, fontWeight: 600 }}>{plan.riskLevel}</span>
                    </div>
                  </div>
                  <PlanIcon color={plan.color}>
                    {plan.icon}
                  </PlanIcon>
                </PlanHeader>

                <PlanDescription>{plan.description}</PlanDescription>

                <PlanFeatures>
                  {plan.features.map((feature, idx) => (
                    <PlanFeature key={idx}>
                      <FaCheckCircle />
                      {feature}
                    </PlanFeature>
                  ))}
                </PlanFeatures>

                <PlanPrice>{plan.minInvestment}</PlanPrice>
                <PlanPriceNote>Minimum Investment • Target Returns: {plan.targetReturns} annually</PlanPriceNote>

                <PlanButton color={plan.color}>
                  Explore Plan <FaChevronRight />
                </PlanButton>
              </PlanCard>
            </motion.div>
          ))}
        </PlansGrid>
      </PlansSection>

      {/* 4. TESTIMONIALS SECTION */}
      <TestimonialsSection id="testimonials" ref={ref3}>
        <SectionTitle>Trusted by Industry Leaders</SectionTitle>
        <SectionSubtitle>
          Join thousands of investors who have transformed their portfolio management with our platform
        </SectionSubtitle>

        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TestimonialCard
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <TestimonialContent>
                  <QuoteIcon>
                    <FaQuoteLeft />
                  </QuoteIcon>
                  <TestimonialText>{testimonial.text}</TestimonialText>
                </TestimonialContent>
                
                <TestimonialAuthor>
                  <AuthorImage>
                    {testimonial.initials}
                  </AuthorImage>
                  <AuthorInfo>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorRole>{testimonial.role}</AuthorRole>
                    <div style={{ fontSize: '0.8rem', color: '#667eea' }}>{testimonial.company}</div>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            </motion.div>
          ))}
        </TestimonialsGrid>
      </TestimonialsSection>

      {/* 5. ASSET CLASSES SECTION */}
      <AssetsSection id="assets" ref={ref5}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView5 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Diversified Asset Classes</SectionTitle>
          <SectionSubtitle>
            Access multiple investment vehicles with varying risk profiles and return potentials
          </SectionSubtitle>
          
          <AssetsGrid>
            {assetClasses.map((asset, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView5 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <AssetCard
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AssetIcon>{asset.icon}</AssetIcon>
                  <AssetName>{asset.name}</AssetName>
                  <AssetPerformance>{asset.performance}</AssetPerformance>
                  <div style={{ fontSize: '0.85rem', color: '#b0b7ff', marginTop: '0.5rem' }}>
                    Annual Returns
                  </div>
                </AssetCard>
              </motion.div>
            ))}
          </AssetsGrid>
        </motion.div>
      </AssetsSection>

      {/* 6. CTA SECTION */}
      <CTASection id="cta" ref={ref4}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <CTAContent>
            <CTATitle>Begin Your Investment Journey</CTATitle>
            <CTADescription>
              Join 5 million investors who trust our platform for sophisticated investment 
              solutions. Start with as little as $500 and access institutional-grade tools.
            </CTADescription>
            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWallet />
              Create Investment Account
            </CTAButton>
            <div style={{ marginTop: '1.5rem', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
              SEC Registered • SIPC Insured • GDPR Compliant
            </div>
          </CTAContent>
        </motion.div>
      </CTASection>

      {/* Removed Footer component since it's in layout.tsx */}
    </PageWrapper>
  )     
}