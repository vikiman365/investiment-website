'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
 FaChartLine, FaUsers,  FaBuilding,
  FaCheckCircle, FaArrowRight, FaStar, FaArrowUp, FaArrowDown,
  FaHandshake, FaGlobe, FaRocket, FaLightbulb, FaAward,
  FaCrown, FaGem, FaHistory, FaEye, FaBullseye,
  FaTrophy, FaMedal, FaCertificate, FaShieldAlt, FaLock,
  FaUserFriends, FaCalendarAlt, FaMapMarkerAlt, FaGlobeAmericas,
  FaLeaf, FaHeart, FaBalanceScale, FaGraduationCap
} from 'react-icons/fa'
import { FaMoneyBillWave } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaShield } from "react-icons/fa6";


// ====================
// STYLED COMPONENTS
// ====================
const PageWrapper = styled.div`
  background: linear-gradient(135deg, #0a0e2a 0%, #1a1f4b 100%);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
`

// Hero Section
const HeroSection = styled.section`
  position: relative;
  padding: 10rem 2rem 5rem;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba(10, 14, 42, 0.95) 0%,
    rgba(26, 31, 75, 0.98) 50%,
    rgba(10, 14, 42, 0.95) 100%);

  @media (max-width: 768px) {
    padding: 8rem 1.5rem 4rem;
  }

  @media (max-width: 480px) {
    padding: 7rem 1rem 3rem;
  }
`

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`

const HeroBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
  color: #a8b1ff;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 2rem;
  border: 1px solid rgba(102, 126, 234, 0.3);

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.8125rem;
  }
`

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #a8b1ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const HeroDescription = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  color: #b0b7ff;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1000px;
  margin: 3rem auto 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
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

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #a8b1ff;
  text-transform: uppercase;
  letter-spacing: 1px;
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

// Mission Section
const MissionSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(180deg, #141a3a 0%, #0a0e2a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const MissionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #a8b1ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 3rem;
  line-height: 1.2;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
`

const MissionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(102, 126, 234, 0.4);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const MissionIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-size: 2rem;
  color: white;
`

const MissionTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
`

const MissionDescription = styled.p`
  color: #b0b7ff;
  line-height: 1.6;
  font-size: 1.125rem;
`

// Values Section
const ValuesSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #0a0e2a 0%, #141a3a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const ValueCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const ValueIcon = styled.div<{ $color: string }>`
  width: 60px;
  height: 60px;
  background: ${props => props.$color};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 1.5rem;
  color: white;
`

const ValueTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
`

const ValueDescription = styled.p`
  color: #b0b7ff;
  line-height: 1.6;
  font-size: 1rem;
`

// Team Section
const TeamSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(180deg, #141a3a 0%, #0a0e2a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`

const TeamMember = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(102, 126, 234, 0.4);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }
`

const MemberImage = styled.div<{ $color: string }>`
  width: 120px;
  height: 120px;
  background: ${props => props.$color};
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  font-weight: 700;
  border: 4px solid rgba(255, 255, 255, 0.1);
`

const MemberName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`

const MemberRole = styled.div`
  font-size: 1rem;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
`

const MemberBio = styled.p`
  color: #b0b7ff;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
`

const MemberStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`

const MemberStat = styled.div`
  text-align: center;
`

const MemberStatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
`

const MemberStatLabel = styled.div`
  font-size: 0.75rem;
  color: #a8b1ff;
  text-transform: uppercase;
  letter-spacing: 1px;
`

// Timeline Section
const TimelineSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #0a0e2a 0%, #141a3a 100%);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const TimelineContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, 
      transparent 0%, 
      rgba(102, 126, 234, 0.5) 15%, 
      rgba(102, 126, 234, 0.5) 85%, 
      transparent 100%);
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 30px;
    }
  }
`

const TimelineItem = styled(motion.div)<{ $side: 'left' | 'right' }>`
  position: relative;
  margin-bottom: 4rem;
  width: calc(50% - 40px);
  ${props => props.$side === 'left' ? 'left: 0' : 'left: 50%'};

  @media (max-width: 768px) {
    width: calc(100% - 60px);
    left: 60px !important;
  }
`

const TimelineDot = styled.div<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 20px;
  left: ${props => props.$side === 'left' ? 'calc(100% + 20px)' : '-20px'};
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  border: 3px solid #0a0e2a;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.3);

  @media (max-width: 768px) {
    left: -42px !important;
  }
`

const TimelineContent = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;

  &:hover {
    border-color: rgba(102, 126, 234, 0.4);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`

const TimelineYear = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const TimelineTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
`

const TimelineDescription = styled.p`
  color: #b0b7ff;
  line-height: 1.6;
  font-size: 1rem;
`

// CTA Section
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
// ABOUT PAGE COMPONENT
// ====================
export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const values = [
    {
      icon: <FaHandshake />,
      title: "Transparency",
      description: "Complete visibility into investment strategies, fees, and performance metrics.",
      color: "linear-gradient(135deg, #3b82f6, #1d4ed8)"
    },
    {
      icon: <FaShieldAlt />,
      title: "Security",
      description: "Bank-level security protocols and regulatory compliance at every level.",
      color: "linear-gradient(135deg, #10b981, #059669)"
    },
    {
      icon: <FaUsers />,
      title: "Community",
      description: "Building wealth together through shared knowledge and collaborative opportunities.",
      color: "linear-gradient(135deg, #f59e0b, #d97706)"
    },
    {
      icon: <FaChartLine />,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to deliver superior investment solutions.",
      color: "linear-gradient(135deg, #8b5cf6, #7c3aed)"
    },
    {
      icon: <FaBalanceScale />,
      title: "Integrity",
      description: "Ethical practices and honest communication in all our relationships.",
      color: "linear-gradient(135deg, #ec4899, #db2777)"
    },
    {
      icon: <FaLeaf />,
      title: "Sustainability",
      description: "Responsible investing that considers environmental and social impact.",
      color: "linear-gradient(135deg, #22c55e, #16a34a)"
    }
  ]

  const teamMembers = [
    {
      initials: "SJ",
      name: "Sarah Johnson",
      role: "Chief Investment Officer",
      bio: "Former hedge fund manager with 15+ years experience in portfolio management.",
      color: "linear-gradient(135deg, #667eea, #764ba2)",
      experience: "15+",
      expertise: "Portfolio Management"
    },
    {
      initials: "MC",
      name: "Michael Chen",
      role: "Head of Technology",
      bio: "AI and blockchain expert with background in quantitative finance.",
      color: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      experience: "12+",
      expertise: "AI & Blockchain"
    },
    {
      initials: "ER",
      name: "Elena Rodriguez",
      role: "Risk Management Director",
      bio: "Specialized in risk assessment and compliance for financial institutions.",
      color: "linear-gradient(135deg, #10b981, #059669)",
      experience: "18+",
      expertise: "Risk Management"
    }
  ]

  const timelineEvents = [
    {
      year: "2018",
      title: "Company Founded",
      description: "WealthBridge was founded with a mission to democratize access to institutional-grade investments.",
      side: "left" as const
    },
    {
      year: "2019",
      title: "Platform Launch",
      description: "Launched our first investment platform with 3 initial plans and AI-powered analytics.",
      side: "right" as const
    },
    {
      year: "2020",
      title: "SEC Registration",
      description: "Achieved SEC registration and expanded our investment offerings to 8 diverse plans.",
      side: "left" as const
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded operations to 30+ countries with over 50,000 active investors worldwide.",
      side: "right" as const
    },
    {
      year: "2023",
      title: "$2.5B AUM Milestone",
      description: "Crossed $2.5 billion in assets under management with industry-leading returns.",
      side: "left" as const
    }
  ]

  const missions = [
    {
      icon: <FaRocket />,
      title: "Our Mission",
      description: "To democratize access to premium investment opportunities through technology, transparency, and expert guidance, empowering individuals to build lasting wealth."
    },
    {
      icon: <FaEye />,
      title: "Our Vision",
      description: "A world where everyone has equal access to sophisticated investment tools and the knowledge to make informed financial decisions for a secure future."
    },
    {
      icon: <FaBullseye />,
      title: "Our Goal",
      description: "To be the most trusted and innovative investment platform, delivering exceptional returns while maintaining the highest standards of security and transparency."
    }
  ]

  if (!mounted) return null

  return (
    <PageWrapper>
     

      {/* Hero Section */}
      <HeroSection>
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
          <HeroContent>
            <HeroBadge
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FaHistory /> Our Story Since 2018
            </HeroBadge>
            
            <HeroTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Building Wealth<br />Through Innovation
            </HeroTitle>

            <HeroDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We're revolutionizing investment by combining cutting-edge technology with 
              deep financial expertise to deliver exceptional returns for investors worldwide.
            </HeroDescription>

            <StatsGrid
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <StatCard>
                <StatValue>
                  <FaGlobe /> 30+
                </StatValue>
                <StatLabel>Countries</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>
                  <FaUsers /> 50K+
                </StatValue>
                <StatLabel>Active Investors</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>
                  <FaMoneyBillTrendUp /> 15.8%
                </StatValue>
                <StatLabel>Average Return</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>
                  <FaShield /> 100%
                </StatValue>
                <StatLabel>SEC Compliant</StatLabel>
              </StatCard>
            </StatsGrid>
          </HeroContent>
        </HeroContainer>
      </HeroSection>

      {/* Mission Section */}
      <MissionSection>
        <MissionContainer>
          <SectionTitle>Our Purpose & Vision</SectionTitle>
          
          <MissionGrid>
            {missions.map((mission, index) => (
              <MissionCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <MissionIcon>
                  {mission.icon}
                </MissionIcon>
                <MissionTitle>{mission.title}</MissionTitle>
                <MissionDescription>{mission.description}</MissionDescription>
              </MissionCard>
            ))}
          </MissionGrid>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ maxWidth: '800px', margin: '0 auto' }}
            >
              <p style={{ 
                fontSize: '1.25rem', 
                color: '#b0b7ff', 
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                At WealthBridge, we believe that sophisticated investment opportunities should be 
                accessible to everyone. Our platform combines institutional-grade tools with 
                user-friendly interfaces to bridge the gap between traditional finance and 
                modern investing.
              </p>
            </motion.div>
          </div>
        </MissionContainer>
      </MissionSection>

      {/* Values Section */}
      <ValuesSection>
        <MissionContainer>
          <SectionTitle>Our Core Values</SectionTitle>
          
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <ValueIcon $color={value.color}>
                  {value.icon}
                </ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </MissionContainer>
      </ValuesSection>

      {/* Team Section */}
      <TeamSection>
        <MissionContainer>
          <SectionTitle>Leadership Team</SectionTitle>
          
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <MemberImage $color={member.color}>
                  {member.initials}
                </MemberImage>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
                <MemberBio>{member.bio}</MemberBio>
                
                <MemberStats>
                  <MemberStat>
                    <MemberStatValue>{member.experience}</MemberStatValue>
                    <MemberStatLabel>Years Experience</MemberStatLabel>
                  </MemberStat>
                  <MemberStat>
                    <MemberStatValue>{member.expertise}</MemberStatValue>
                    <MemberStatLabel>Expertise</MemberStatLabel>
                  </MemberStat>
                </MemberStats>
              </TeamMember>
            ))}
          </TeamGrid>
        </MissionContainer>
      </TeamSection>

      {/* Timeline Section */}
      <TimelineSection>
        <MissionContainer>
          <SectionTitle>Our Journey</SectionTitle>
          
          <TimelineContainer>
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={index}
                $side={event.side}
                initial={{ opacity: 0, x: event.side === 'left' ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <TimelineDot $side={event.side} />
                <TimelineContent>
                  <TimelineYear>
                    <FaCalendarAlt /> {event.year}
                  </TimelineYear>
                  <TimelineTitle>{event.title}</TimelineTitle>
                  <TimelineDescription>{event.description}</TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </MissionContainer>
      </TimelineSection>

      {/* CTA Section */}
      <CTASection>
        <CTAContent>
          <CTATitle>Join Our Growing Community</CTATitle>
          <CTADescription>
            Become part of the investment revolution. Join thousands of investors who trust 
            our platform to grow their wealth with confidence and transparency.
          </CTADescription>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/signup'}
          >
            <FaUserFriends /> Join WealthBridge Today
          </CTAButton>
          <div style={{ marginTop: '1.5rem', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
            SEC Registered • SIPC Insured • Global Operations
          </div>
        </CTAContent>
      </CTASection>

     
    </PageWrapper>
  )
}