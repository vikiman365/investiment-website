'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { 
  FaChartLine, FaBuilding, FaBitcoin,
  FaIndustry, FaChartBar, FaCoins, FaGem, FaLeaf,
  FaWater, FaWind, FaTree, FaCar, FaPlane, FaShip,
  FaRobot, FaMicrochip, FaSolarPanel, FaHeartbeat,
  FaFilter, FaSearch, FaSortAmountDown, FaSortAmountUp,
  FaArrowUp, FaArrowDown, FaInfoCircle, FaExchangeAlt, FaTag,
  FaPercent, FaCalendarAlt, FaDatabase,
  FaStar, FaCrown, FaFire, FaMountain, FaSatellite,
  FaSeedling, FaUniversity, FaFilm, FaGamepad,
  FaDollarSign, FaEuroSign, FaPoundSign, FaYenSign
} from 'react-icons/fa'
import { FaMoneyBillWave } from "react-icons/fa6";
import { FaMoneyBillTrendUp }from "react-icons/fa6";
// Import Components

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

// Asset Classes Section
const AssetsSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(180deg, #141a3a 0%, #0a0e2a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const AssetsContainer = styled.div`
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

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`

const AssetsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const AssetsSubtitle = styled.p`
  font-size: 1.125rem;
  color: #b0b7ff;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const FilterSelect = styled.select`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a8b1ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.5rem center;
  background-size: 1rem;
  padding-right: 3.5rem;
  min-width: 200px;

  &:hover {
    border-color: rgba(102, 126, 234, 0.4);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  option {
    background: #0a0e2a;
    color: white;
  }
`

const AssetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`

const AssetCard = styled(motion.div)<{ $trend: 'up' | 'down' }>`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%);
  border-radius: 24px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(102, 126, 234, 0.4);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.$trend === 'up' 
      ? 'linear-gradient(135deg, #4ade80, #22c55e)' 
      : 'linear-gradient(135deg, #ef4444, #dc2626)'};
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const AssetHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const AssetIcon = styled.div<{ $color: string }>`
  width: 60px;
  height: 60px;
  background: ${props => props.$color};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  flex-shrink: 0;
`

const AssetInfo = styled.div`
  flex: 1;
`

const AssetName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`

const AssetCategory = styled.div`
  font-size: 0.875rem;
  color: #a8b1ff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const AssetPerformance = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const PerformanceValue = styled.div<{ $trend: 'up' | 'down' }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.$trend === 'up' ? '#4ade80' : '#ef4444'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const PerformanceLabel = styled.div`
  font-size: 0.875rem;
  color: #a8b1ff;
`

const AssetStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`

const AssetStat = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`

const StatTitle = styled.div`
  font-size: 0.75rem;
  color: #a8b1ff;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`

const StatValueSmall = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
`

const AssetDescription = styled.p`
  color: #b0b7ff;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 2rem;
`

const AssetActions = styled.div`
  display: flex;
  gap: 1rem;
`

const PrimaryButton = styled.button<{ $color: string }>`
  flex: 1;
  padding: 1rem;
  background: ${props => props.$color};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px ${props => props.$color.replace('1)', '0.3)')};
  }
`

const SecondaryButton = styled.button`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #a8b1ff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 44px;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    color: white;
  }
`

// Performance Chart
const PerformanceSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #0a0e2a 0%, #141a3a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const PerformanceChart = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ChartTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
`

const ChartPeriods = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ChartPeriod = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1.5rem;
  background: ${props => props.$active ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.$active ? 'rgba(102, 126, 234, 0.4)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 20px;
  color: ${props => props.$active ? 'white' : '#a8b1ff'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.4);
    color: white;
  }
`

const ChartContainer = styled.div`
  height: 300px;
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  padding: 1rem 0;
`

const ChartBar = styled(motion.div)<{ $height: number; $color: string }>`
  flex: 1;
  background: ${props => props.$color};
  border-radius: 4px 4px 0 0;
  min-height: 4px;
  position: relative;

  &:hover {
    filter: brightness(1.2);
  }
`

const BarLabel = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: #a8b1ff;
  font-weight: 500;
  white-space: nowrap;
`

const ChartLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const LegendColor = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  background: ${props => props.$color};
  border-radius: 2px;
`

const LegendText = styled.div`
  font-size: 0.875rem;
  color: #a8b1ff;
`

// Diversification Section
const DiversificationSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(180deg, #141a3a 0%, #0a0e2a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const DiversificationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`

const DiversificationCard = styled(motion.div)`
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

const DiversificationIcon = styled.div`
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

const DiversificationTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
`

const DiversificationDescription = styled.p`
  color: #b0b7ff;
  line-height: 1.6;
  font-size: 1.125rem;
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
// ASSETS PAGE COMPONENT
// ====================
export default function AssetsPage() {
  const [filter, setFilter] = useState('all')
  const [chartPeriod, setChartPeriod] = useState('1y')

  const assets = [
    {
      id: 1,
      name: "Technology Stocks",
      category: "Equities",
      icon: <FaMicrochip />,
      color: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      performance: "+24.5%",
      trend: "up" as const,
      volatility: "High",
      allocation: "35%",
      description: "Leading tech companies driving innovation in AI, cloud computing, and digital transformation.",
      minInvestment: 1000,
      risk: "High"
    },
    {
      id: 2,
      name: "Real Estate",
      category: "Property",
      icon: <FaBuilding />,
      color: "linear-gradient(135deg, #f59e0b, #d97706)",
      performance: "+8.7%",
      trend: "up" as const,
      volatility: "Low",
      allocation: "25%",
      description: "Diversified portfolio of commercial and residential properties with stable cash flows.",
      minInvestment: 10000,
      risk: "Low"
    },
    {
      id: 3,
      name: "Cryptocurrency",
      category: "Digital Assets",
      icon: <FaBitcoin />,
      color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      performance: "+32.8%",
      trend: "up" as const,
      volatility: "Very High",
      allocation: "15%",
      description: "Strategic allocation in blockchain technology and leading digital currencies.",
      minInvestment: 500,
      risk: "Very High"
    },
    {
      id: 4,
      name: "Government Bonds",
      category: "Fixed Income",
      icon: <FaChartBar />,
      color: "linear-gradient(135deg, #10b981, #059669)",
      performance: "+4.2%",
      trend: "up" as const,
      volatility: "Very Low",
      allocation: "10%",
      description: "High-quality government bonds providing stable income and capital preservation.",
      minInvestment: 5000,
      risk: "Very Low"
    },
    {
      id: 5,
      name: "Commodities",
      category: "Resources",
      icon: <FaCoins />,
      color: "linear-gradient(135deg, #ef4444, #dc2626)",
      performance: "+5.9%",
      trend: "up" as const,
      volatility: "Medium",
      allocation: "5%",
      description: "Diversified exposure to precious metals, energy, and agricultural commodities.",
      minInvestment: 3000,
      risk: "Medium"
    },
    {
      id: 6,
      name: "Renewable Energy",
      category: "Sustainable",
      icon: <FaSolarPanel />,
      color: "linear-gradient(135deg, #22c55e, #16a34a)",
      performance: "+18.3%",
      trend: "up" as const,
      volatility: "Medium",
      allocation: "10%",
      description: "Investments in solar, wind, and other clean energy technologies.",
      minInvestment: 2500,
      risk: "Medium"
    }
  ]

  const filteredAssets = assets.filter(asset => {
    if (filter === 'all') return true
    if (filter === 'high-growth' && asset.performance > '+15%') return true
    if (filter === 'low-risk' && asset.risk === 'Low') return true
    if (filter === 'sustainable' && asset.category === 'Sustainable') return true
    return false
  })

  const chartData = [
    { label: 'Tech', value: 24.5, color: '#3b82f6' },
    { label: 'Real Estate', value: 8.7, color: '#f59e0b' },
    { label: 'Crypto', value: 32.8, color: '#8b5cf6' },
    { label: 'Bonds', value: 4.2, color: '#10b981' },
    { label: 'Commodities', value: 5.9, color: '#ef4444' },
    { label: 'Energy', value: 18.3, color: '#22c55e' }
  ]

  const diversificationStrategies = [
    {
      icon: <FaShield />,
      title: "Risk Management",
      description: "Sophisticated risk assessment models and diversification strategies to protect your investments."
    },
    {
      icon: <FaChartLine />,
      title: "Dynamic Allocation",
      description: "AI-powered algorithms that dynamically adjust asset allocation based on market conditions."
    },
    {
      icon: <FaLeaf />,
      title: "Sustainable Focus",
      description: "Integration of ESG principles to identify sustainable investment opportunities."
    }
  ]

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
              <FaDatabase /> Diverse Asset Portfolio
            </HeroBadge>
            
            <HeroTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Premium Investment<br />Assets
            </HeroTitle>

            <HeroDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Access a carefully curated selection of premium investment assets across 
              multiple classes, each delivering exceptional risk-adjusted returns.
            </HeroDescription>

            <StatsGrid
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <StatCard>
                <StatValue>
                  <FaChartLine /> 6+
                </StatValue>
                <StatLabel>Asset Classes</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>
                  <FaStar /> 15.8%
                </StatValue>
                <StatLabel>Avg. Return</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>
                  <FaShield /> 100%
                </StatValue>
                <StatLabel>Security</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>
                  <FaExchangeAlt /> 24/7
                </StatValue>
                <StatLabel>Trading</StatLabel>
              </StatCard>
            </StatsGrid>
          </HeroContent>
        </HeroContainer>
      </HeroSection>

      {/* Assets Grid Section */}
      <AssetsSection>
        <AssetsContainer>
          <AssetsHeader>
            <div>
              <SectionTitle>Investment Assets</SectionTitle>
              <AssetsSubtitle>
                Explore our diverse range of premium investment assets with detailed 
                performance metrics and risk profiles
              </AssetsSubtitle>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#a8b1ff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaFilter /> Filter By:
              </div>
              <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Assets</option>
                <option value="high-growth">High Growth</option>
                <option value="low-risk">Low Risk</option>
                <option value="sustainable">Sustainable</option>
              </FilterSelect>
            </div>
          </AssetsHeader>

          <AssetsGrid>
            {filteredAssets.map((asset, index) => (
              <AssetCard
                key={asset.id}
                $trend={asset.trend}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <AssetHeader>
                  <AssetIcon $color={asset.color}>
                    {asset.icon}
                  </AssetIcon>
                  <AssetInfo>
                    <AssetName>{asset.name}</AssetName>
                    <AssetCategory>
                      <FaTag /> {asset.category}
                    </AssetCategory>
                  </AssetInfo>
                </AssetHeader>

                <AssetPerformance>
                  <PerformanceValue $trend={asset.trend}>
                    {asset.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                    {asset.performance}
                  </PerformanceValue>
                  <PerformanceLabel>Annual Return</PerformanceLabel>
                </AssetPerformance>

                <AssetStats>
                  <AssetStat>
                    <StatTitle>Risk Level</StatTitle>
                    <StatValueSmall>{asset.risk}</StatValueSmall>
                  </AssetStat>
                  <AssetStat>
                    <StatTitle>Volatility</StatTitle>
                    <StatValueSmall>{asset.volatility}</StatValueSmall>
                  </AssetStat>
                  <AssetStat>
                    <StatTitle>Allocation</StatTitle>
                    <StatValueSmall>{asset.allocation}</StatValueSmall>
                  </AssetStat>
                  <AssetStat>
                    <StatTitle>Min. Investment</StatTitle>
                    <StatValueSmall>${asset.minInvestment.toLocaleString()}</StatValueSmall>
                  </AssetStat>
                </AssetStats>

                <AssetDescription>{asset.description}</AssetDescription>

                <AssetActions>
                  <PrimaryButton $color={asset.color.replace('gradient(135deg, ', '').split(',')[0] + ', 1)'}>
                    <FaMoneyBillTrendUp /> Invest Now
                  </PrimaryButton>
                  <SecondaryButton>
                    <FaInfoCircle />
                  </SecondaryButton>
                  <SecondaryButton>
                    <FaChartLine />
                  </SecondaryButton>
                </AssetActions>
              </AssetCard>
            ))}
          </AssetsGrid>
        </AssetsContainer>
      </AssetsSection>

      {/* Performance Chart Section */}
      <PerformanceSection>
        <AssetsContainer>
          <SectionTitle>Asset Performance</SectionTitle>
          
          <PerformanceChart>
            <ChartHeader>
              <ChartTitle>Annual Returns by Asset Class</ChartTitle>
              <ChartPeriods>
                {['1m', '3m', '6m', '1y', '3y'].map((period) => (
                  <ChartPeriod
                    key={period}
                    $active={chartPeriod === period}
                    onClick={() => setChartPeriod(period)}
                  >
                    {period}
                  </ChartPeriod>
                ))}
              </ChartPeriods>
            </ChartHeader>

            <ChartContainer>
              {chartData.map((item, index) => (
                <ChartBar
                  key={index}
                  $height={item.value}
                  $color={item.color}
                  initial={{ height: 0 }}
                  animate={{ height: `${item.value}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <BarLabel>{item.label}</BarLabel>
                </ChartBar>
              ))}
            </ChartContainer>

            <ChartLegend>
              {chartData.map((item, index) => (
                <LegendItem key={index}>
                  <LegendColor $color={item.color} />
                  <LegendText>{item.label}: {item.value}%</LegendText>
                </LegendItem>
              ))}
            </ChartLegend>
          </PerformanceChart>
        </AssetsContainer>
      </PerformanceSection>

      {/* Diversification Section */}
      <DiversificationSection>
        <AssetsContainer>
          <SectionTitle>Smart Diversification</SectionTitle>
          
          <DiversificationGrid>
            {diversificationStrategies.map((strategy, index) => (
              <DiversificationCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <DiversificationIcon>
                  {strategy.icon}
                </DiversificationIcon>
                <DiversificationTitle>{strategy.title}</DiversificationTitle>
                <DiversificationDescription>
                  {strategy.description}
                </DiversificationDescription>
              </DiversificationCard>
            ))}
          </DiversificationGrid>
        </AssetsContainer>
      </DiversificationSection>

      {/* CTA Section */}
      <CTASection>
        <CTAContent>
          <CTATitle>Build Your Optimal Portfolio</CTATitle>
          <CTADescription>
            Create a diversified investment portfolio tailored to your financial goals 
            and risk tolerance. Our experts help you build the perfect asset mix.
          </CTADescription>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/signup'}
          >
            <FaChartLine /> Start Building Portfolio
          </CTAButton>
          <div style={{ marginTop: '1.5rem', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
            Diversified Assets • Risk Management • Professional Guidance
          </div>
        </CTAContent>
      </CTASection>

     
    </PageWrapper>
  )
}