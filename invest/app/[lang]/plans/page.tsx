'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
   FaChartLine, FaUsers,  FaBuilding,
  FaBitcoin, FaSolarPanel, FaHeartbeat, FaGlobeAmericas, FaMicrochip,
  FaCheckCircle, FaArrowRight, FaStar, FaArrowUp, FaArrowDown,
  FaCalculator, FaShieldAlt, FaLock, FaHandshake, FaWallet,
  FaChevronRight, FaChevronLeft, FaPercent, FaCalendarAlt, FaChartBar, FaTag, FaInfoCircle,
  FaExchangeAlt, FaUserFriends, FaDatabase, FaInfinity, FaCrown,
  FaFilter, FaSearch, FaSortAmountDown, FaSortAmountUp,
  FaCoins, FaGem, FaIndustry, FaLeaf, FaRobot, FaSatellite,
  FaWater, FaWind, FaTree, FaCar, FaPlane, FaShip
} from 'react-icons/fa'
import { FaMoneyBillWave} from "react-icons/fa6";

import {FaMoneyBillTrendUp} from "react-icons/fa6";
// Import Components
import {FaShield} from "react-icons/fa6";

// ====================
// STYLED COMPONENTS
// ====================
const PageWrapper = styled.div`
  background: linear-gradient(135deg, #0a0e2a 0%, #1a1f4b 100%);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow-x:/components/navigation' hidden;
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

const StatNumber = styled.div`
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

// Filters Section
const FiltersSection = styled.section`
  padding: 3rem 2rem;
  background: linear-gradient(180deg, #141a3a 0%, #0a0e2a 100%);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`

const FiltersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const FiltersHeader = styled.div`
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

const FiltersTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #a8b1ff;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const FilterSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  margin-top: 0.5rem;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #667eea;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #667eea;
    cursor: pointer;
    border: none;
  }

  &:hover::-webkit-slider-thumb {
    transform: scale(1.2);
    background: #764ba2;
  }
`

const SliderValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-top: 0.5rem;
`

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem 1rem 3.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(102, 126, 234, 0.4);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #a8b1ff;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a8b1ff;
  font-size: 1rem;
`

const ResetButton = styled.button`
  padding: 1rem 2rem;
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
  gap: 0.75rem;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    color: white;
    transform: translateY(-2px);
  }
`

// Plans Grid Section
const PlansSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #0a0e2a 0%, #141a3a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const PlansContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const PlansHeader = styled.div`
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

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #a8b1ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
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
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const SortSelect = styled(FilterSelect)`
  min-width: 200px;
`

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const PlanCard = styled(motion.div)`
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
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
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

const PlanBadge = styled.div<{ $risk: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: ${props => {
    switch(props.$risk) {
      case 'Low': return 'rgba(34, 197, 94, 0.15)';
      case 'Medium': return 'rgba(245, 158, 11, 0.15)';
      case 'High': return 'rgba(239, 68, 68, 0.15)';
      case 'Very High': return 'rgba(139, 92, 246, 0.15)';
      default: return 'rgba(102, 126, 234, 0.15)';
    }
  }};
  border: 1px solid ${props => {
    switch(props.$risk) {
      case 'Low': return 'rgba(34, 197, 94, 0.3)';
      case 'Medium': return 'rgba(245, 158, 11, 0.3)';
      case 'High': return 'rgba(239, 68, 68, 0.3)';
      case 'Very High': return 'rgba(139, 92, 246, 0.3)';
      default: return 'rgba(102, 126, 234, 0.3)';
    }
  }};
  color: ${props => {
    switch(props.$risk) {
      case 'Low': return '#4ade80';
      case 'Medium': return '#f59e0b';
      case 'High': return '#ef4444';
      case 'Very High': return '#8b5cf6';
      default: return '#667eea';
    }
  }};
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const PlanHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const PlanIcon = styled.div<{ $color: string }>`
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

const PlanInfo = styled.div`
  flex: 1;
`

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`

const PlanCategory = styled.div`
  font-size: 0.875rem;
  color: #a8b1ff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const PlanDescription = styled.p`
  color: #b0b7ff;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  flex: 1;
`

const PlanStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`

const PlanStat = styled.div`
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

const StatValue = styled.div<{ $positive?: boolean }>`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.$positive ? '#4ade80' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
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

const PlanActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`

const PrimaryAction = styled.button<{ $color: string }>`
  flex: 1;
  padding: 1rem;
  background: linear-gradient(135deg, 
    ${props => props.$color},
    ${props => props.$color.replace('1)', '0.8)')});
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

const SecondaryAction = styled.button`
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

// Comparison Section
const ComparisonSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(180deg, #141a3a 0%, #0a0e2a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const ComparisonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const ComparisonTable = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  backdrop-filter: blur(10px);
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 300px repeat(3, 1fr);
  background: rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    display: none;
  }
`

const TableHeaderCell = styled.div`
  padding: 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #a8b1ff;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;

  &:first-child {
    text-align: left;
  }
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 300px repeat(3, 1fr);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 768px) {
    display: block;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`

const TableCell = styled.div`
  padding: 1.5rem;
  color: #b0b7ff;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 0.75rem 0;
    justify-content: flex-start;
    border: none;
    
    &::before {
      content: attr(data-label);
      font-weight: 600;
      color: #a8b1ff;
      min-width: 120px;
      display: inline-block;
    }
  }
`

const TableCellFeature = styled(TableCell)`
  font-weight: 600;
  color: white;
  justify-content: flex-start;
`

const TableCellCheck = styled(TableCell)`
  color: #4ade80;
  font-size: 1.25rem;
`

// FAQ Section
const FAQSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #0a0e2a 0%, #141a3a 100%);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const FAQGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3rem;
`

const FAQItem = styled(motion.div)<{ $isOpen: boolean }>`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid ${props => props.$isOpen ? 'rgba(102, 126, 234, 0.4)' : 'rgba(255, 255, 255, 0.1)'};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(102, 126, 234, 0.4);
    background: rgba(255, 255, 255, 0.08);
  }
`

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
    font-size: 1rem;
  }
`

const FAQAnswer = styled(motion.div)`
  padding: 0 1.5rem 1.5rem;
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
// MAIN COMPONENT
// ====================
export default function InvestmentPlansPage() {
  const [selectedRisk, setSelectedRisk] = useState<string>('All')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [minInvestment, setMinInvestment] = useState<number>(1000)
  const [maxInvestment, setMaxInvestment] = useState<number>(100000)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('popular')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  // Investment Plans Data
  const investmentPlans = [
    {
      id: 1,
      title: "Tech Innovators Fund",
      category: "Technology",
      description: "Invest in cutting-edge technology companies driving the Fourth Industrial Revolution.",
      icon: <FaMicrochip />,
      color: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      risk: "High",
      minInvestment: 5000,
      targetReturns: "18-25%",
      historicalReturns: "+22.3%",
      liquidity: "Medium",
      features: ["AI & Robotics", "Quantum Computing", "Biotech", "Space Tech"],
      isPopular: true
    },
    {
      id: 2,
      title: "Green Energy Portfolio",
      category: "Renewable Energy",
      description: "Sustainable investments in renewable energy and clean technology solutions.",
      icon: <FaSolarPanel />,
      color: "linear-gradient(135deg, #10b981, #059669)",
      risk: "Medium",
      minInvestment: 3000,
      targetReturns: "12-18%",
      historicalReturns: "+15.8%",
      liquidity: "High",
      features: ["Solar Farms", "Wind Energy", "Hydrogen Tech", "EV Infrastructure"],
      isPopular: true
    },
    {
      id: 3,
      title: "Real Estate Trust",
      category: "Real Estate",
      description: "Diversified portfolio of commercial and residential properties worldwide.",
      icon: <FaBuilding />,
      color: "linear-gradient(135deg, #f59e0b, #d97706)",
      risk: "Low",
      minInvestment: 10000,
      targetReturns: "8-12%",
      historicalReturns: "+9.4%",
      liquidity: "Low",
      features: ["Commercial REITs", "Residential", "Industrial", "Hospitality"],
      isPopular: false
    },
    {
      id: 4,
      title: "Crypto & Digital Assets",
      category: "Cryptocurrency",
      description: "Strategic allocation in blockchain technology and digital currencies.",
      icon: <FaBitcoin />,
      color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      risk: "Very High",
      minInvestment: 1000,
      targetReturns: "20-35%",
      historicalReturns: "+28.5%",
      liquidity: "High",
      features: ["Bitcoin", "Ethereum", "DeFi Protocols", "NFT Platforms"],
      isPopular: true
    },
    {
      id: 5,
      title: "Healthcare Revolution",
      category: "Healthcare",
      description: "Investing in breakthrough medical technologies and healthcare services.",
      icon: <FaHeartbeat />,
      color: "linear-gradient(135deg, #ef4444, #dc2626)",
      risk: "Medium-High",
      minInvestment: 7500,
      targetReturns: "15-22%",
      historicalReturns: "+18.2%",
      liquidity: "Medium",
      features: ["Biopharma", "Telemedicine", "Medical Devices", "Genomics"],
      isPopular: false
    },
    {
      id: 6,
      title: "Emerging Markets",
      category: "Global Markets",
      description: "Growth opportunities in developing economies with high potential.",
      icon: <FaGlobeAmericas />,
      color: "linear-gradient(135deg, #ec4899, #db2777)",
      risk: "High",
      minInvestment: 5000,
      targetReturns: "14-20%",
      historicalReturns: "+16.7%",
      liquidity: "Medium",
      features: ["Asia Pacific", "Latin America", "Africa", "Frontier Markets"],
      isPopular: false
    },
    {
      id: 7,
      title: "Infrastructure Fund",
      category: "Infrastructure",
      description: "Invest in essential infrastructure projects with stable cash flows.",
      icon: <FaBuilding />,
      color: "linear-gradient(135deg, #6366f1, #4f46e5)",
      risk: "Low-Medium",
      minInvestment: 8000,
      targetReturns: "9-14%",
      historicalReturns: "+11.3%",
      liquidity: "Low",
      features: ["Transportation", "Utilities", "Telecom", "Energy Infrastructure"],
      isPopular: true
    },
    {
      id: 8,
      title: "Sustainable Agriculture",
      category: "Agriculture",
      description: "Invest in sustainable farming and agricultural technology.",
      icon: <FaLeaf />,
      color: "linear-gradient(135deg, #22c55e, #16a34a)",
      risk: "Medium",
      minInvestment: 4000,
      targetReturns: "10-16%",
      historicalReturns: "+12.8%",
      liquidity: "Medium",
      features: ["Organic Farming", "AgriTech", "Vertical Farming", "Supply Chain"],
      isPopular: false
    }
  ]

  // FAQ Data
  const faqData = [
    {
      question: "What is the minimum investment required?",
      answer: "Minimum investments range from $1,000 to $10,000 depending on the plan. Our platform is designed to be accessible while maintaining high-quality investment opportunities."
    },
    {
      question: "How are the investment plans managed?",
      answer: "Each plan is managed by experienced portfolio managers who use AI-powered analytics and deep market research to optimize returns and manage risk."
    },
    {
      question: "What is the typical investment horizon?",
      answer: "Investment horizons vary by plan, typically ranging from 3-7 years. However, most plans offer liquidity options for early withdrawal with certain conditions."
    },
    {
      question: "Are there any management fees?",
      answer: "We operate on a transparent fee structure with zero management fees on basic plans. Premium plans have a competitive 1-2% annual management fee based on assets under management."
    },
    {
      question: "How are returns calculated and distributed?",
      answer: "Returns are calculated quarterly and can be reinvested or withdrawn. We provide detailed quarterly performance reports and tax documentation."
    }
  ]

  // Filtered plans
  const filteredPlans = investmentPlans
    .filter(plan => {
      if (selectedRisk !== 'All' && plan.risk !== selectedRisk) return false
      if (selectedCategory !== 'All' && plan.category !== selectedCategory) return false
      if (plan.minInvestment < minInvestment || plan.minInvestment > maxInvestment) return false
      if (searchTerm && !plan.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !plan.description.toLowerCase().includes(searchTerm.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'min-investment': return a.minInvestment - b.minInvestment
        case 'returns': return parseFloat(b.historicalReturns) - parseFloat(a.historicalReturns)
        case 'risk': return a.risk.localeCompare(b.risk)
        default: return a.isPopular === b.isPopular ? 0 : a.isPopular ? -1 : 1
      }
    })

  const handleFAQToggle = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const resetFilters = () => {
    setSelectedRisk('All')
    setSelectedCategory('All')
    setMinInvestment(1000)
    setMaxInvestment(100000)
    setSearchTerm('')
    setSortBy('popular')
  }

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
              <FaChartLine /> Expertly Curated Investment Plans
            </HeroBadge>
            
            <HeroTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Discover Your Perfect<br />Investment Strategy
            </HeroTitle>

            <HeroDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Choose from our diverse range of professionally managed investment plans, 
              each designed to match different risk profiles and financial goals.
            </HeroDescription>

            <StatsGrid
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <StatCard>
                <StatNumber>
                  <FaMoneyBillTrendUp /> 15.8%
                </StatNumber>
                <StatLabel>Average Annual Return</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>
                  <FaShieldAlt /> 8+
                </StatNumber>
                <StatLabel>Investment Plans</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>
                  <FaUsers /> 50K+
                </StatNumber>
                <StatLabel>Active Investors</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>
                  <FaChartBar /> $2.5B
                </StatNumber>
                <StatLabel>Assets Managed</StatLabel>
              </StatCard>
            </StatsGrid>
          </HeroContent>
        </HeroContainer>
      </HeroSection>

      {/* Filters Section */}
      <FiltersSection>
        <FiltersContainer>
          <FiltersHeader>
            <div>
              <FiltersTitle>
                <FaFilter /> Filter Investment Plans
              </FiltersTitle>
              <p style={{ color: '#b0b7ff', marginTop: '0.5rem' }}>
                Find the perfect plan for your investment goals
              </p>
            </div>

            <SearchBox>
              <SearchIcon>
                <FaSearch />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBox>
          </FiltersHeader>

          <FiltersGrid>
            <FilterGroup>
              <FilterLabel>
                <FaShield /> Risk Level
              </FilterLabel>
              <FilterSelect
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
              >
                <option value="All">All Risk Levels</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
                <option value="Very High">Very High Risk</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>
                <FaChartLine /> Category
              </FilterLabel>
              <FilterSelect
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Cryptocurrency">Cryptocurrency</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Renewable Energy">Renewable Energy</option>
                <option value="Global Markets">Global Markets</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>
                <FaMoneyBillWave /> Investment Range
              </FilterLabel>
              <FilterSlider
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={minInvestment}
                onChange={(e) => setMinInvestment(parseInt(e.target.value))}
              />
              <SliderValue>${minInvestment.toLocaleString()}+</SliderValue>
            </FilterGroup>

            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <ResetButton onClick={resetFilters}>
                <FaFilter /> Reset Filters
              </ResetButton>
            </div>
          </FiltersGrid>
        </FiltersContainer>
      </FiltersSection>

      {/* Plans Grid Section */}
      <PlansSection>
        <PlansContainer>
          <PlansHeader>
            <div>
              <SectionTitle>Available Investment Plans</SectionTitle>
              <SectionSubtitle>
                {filteredPlans.length} plans match your criteria
              </SectionSubtitle>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <FilterLabel>
                <FaSortAmountDown /> Sort By
              </FilterLabel>
              <SortSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="min-investment">Minimum Investment</option>
                <option value="returns">Highest Returns</option>
                <option value="risk">Risk Level</option>
              </SortSelect>
            </div>
          </PlansHeader>

          <PlansGrid>
            <AnimatePresence>
              {filteredPlans.map((plan, index) => (
                <PlanCard
                  key={plan.id}
                  color={plan.color}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <PlanBadge $risk={plan.risk}>
                    {plan.risk} Risk
                  </PlanBadge>

                  <PlanHeader>
                    <PlanIcon $color={plan.color}>
                      {plan.icon}
                    </PlanIcon>
                    <PlanInfo>
                      <PlanTitle>{plan.title}</PlanTitle>
                      <PlanCategory>
                        <FaTag /> {plan.category}
                      </PlanCategory>
                    </PlanInfo>
                  </PlanHeader>

                  <PlanDescription>{plan.description}</PlanDescription>

                  <PlanStats>
                    <PlanStat>
                      <StatTitle>Min. Investment</StatTitle>
                      <StatValue>
                        ${plan.minInvestment.toLocaleString()}
                      </StatValue>
                    </PlanStat>
                    <PlanStat>
                      <StatTitle>Target Returns</StatTitle>
                      <StatValue $positive>
                        {plan.targetReturns}
                      </StatValue>
                    </PlanStat>
                    <PlanStat>
                      <StatTitle>Historical</StatTitle>
                      <StatValue $positive>
                        <FaArrowUp /> {plan.historicalReturns}
                      </StatValue>
                    </PlanStat>
                    <PlanStat>
                      <StatTitle>Liquidity</StatTitle>
                      <StatValue>
                        {plan.liquidity}
                      </StatValue>
                    </PlanStat>
                  </PlanStats>

                  <PlanFeatures>
                    {plan.features.map((feature, idx) => (
                      <PlanFeature key={idx}>
                        <FaCheckCircle />
                        {feature}
                      </PlanFeature>
                    ))}
                  </PlanFeatures>

                  <PlanActions>
                    <PrimaryAction $color={plan.color.replace('gradient(135deg, ', '').split(',')[0] + ', 1)'}>
                      <FaWallet /> Invest Now
                    </PrimaryAction>
                    <SecondaryAction>
                      <FaChartLine />
                    </SecondaryAction>
                    <SecondaryAction>
                      <FaInfoCircle />
                    </SecondaryAction>
                  </PlanActions>
                </PlanCard>
              ))}
            </AnimatePresence>
          </PlansGrid>
        </PlansContainer>
      </PlansSection>

      {/* Comparison Section */}
      <ComparisonSection>
        <PlansContainer>
          <PlansHeader>
            <div>
              <SectionTitle>Plan Comparison</SectionTitle>
              <SectionSubtitle>
                Compare key features across our most popular investment plans
              </SectionSubtitle>
            </div>
          </PlansHeader>

          <ComparisonTable>
            <TableHeader>
              <TableHeaderCell>Features</TableHeaderCell>
              <TableHeaderCell>Tech Innovators</TableHeaderCell>
              <TableHeaderCell>Green Energy</TableHeaderCell>
              <TableHeaderCell>Real Estate Trust</TableHeaderCell>
            </TableHeader>

            <TableRow>
              <TableCellFeature>Minimum Investment</TableCellFeature>
              <TableCell>$5,000</TableCell>
              <TableCell>$3,000</TableCell>
              <TableCell>$10,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCellFeature>Target Returns</TableCellFeature>
              <TableCell>18-25%</TableCell>
              <TableCell>12-18%</TableCell>
              <TableCell>8-12%</TableCell>
            </TableRow>
            <TableRow>
              <TableCellFeature>Risk Level</TableCellFeature>
              <TableCell>High</TableCell>
              <TableCell>Medium</TableCell>
              <TableCell>Low</TableCell>
            </TableRow>
            <TableRow>
              <TableCellFeature>Liquidity</TableCellFeature>
              <TableCell>Medium</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Low</TableCell>
            </TableRow>
            <TableRow>
              <TableCellFeature>AI Analytics</TableCellFeature>
              <TableCellCheck>✓</TableCellCheck>
              <TableCellCheck>✓</TableCellCheck>
              <TableCellCheck>✓</TableCellCheck>
            </TableRow>
            <TableRow>
              <TableCellFeature>Quarterly Reports</TableCellFeature>
              <TableCellCheck>✓</TableCellCheck>
              <TableCellCheck>✓</TableCellCheck>
              <TableCellCheck>✓</TableCellCheck>
            </TableRow>
            <TableRow>
              <TableCellFeature>Tax Optimization</TableCellFeature>
              <TableCellCheck>✓</TableCellCheck>
              <TableCellCheck>✓</TableCellCheck>
              <TableCellCheck>✓</TableCellCheck>
            </TableRow>
            <TableRow>
              <TableCellFeature>Priority Support</TableCellFeature>
              <TableCellCheck>✓</TableCellCheck>
              <TableCellCheck>✓</TableCellCheck>
              <TableCell>-</TableCell>
            </TableRow>
          </ComparisonTable>
        </PlansContainer>
      </ComparisonSection>

      {/* FAQ Section */}
      <FAQSection>
        <FAQContainer>
          <PlansHeader style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <SectionTitle>Frequently Asked Questions</SectionTitle>
              <SectionSubtitle>
                Get answers to common questions about our investment plans
              </SectionSubtitle>
            </div>
          </PlansHeader>

          <FAQGrid>
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                $isOpen={openFAQ === index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FAQQuestion onClick={() => handleFAQToggle(index)}>
                  {faq.question}
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronRight />
                  </motion.div>
                </FAQQuestion>
                
                <AnimatePresence>
                  {openFAQ === index && (
                    <FAQAnswer
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </FAQAnswer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))}
          </FAQGrid>
        </FAQContainer>
      </FAQSection>

      {/* CTA Section */}
      <CTASection>
        <CTAContent>
          <CTATitle>Ready to Start Investing?</CTATitle>
          <CTADescription>
            Join thousands of investors who trust our platform for sophisticated investment 
            solutions. Create your account today and access premium investment opportunities.
          </CTADescription>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/signup'}
          >
            <FaWallet /> Create Investment Account
          </CTAButton>
          <div style={{ marginTop: '1.5rem', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.85rem' }}>
            SEC Registered • SIPC Insured • GDPR Compliant
          </div>
        </CTAContent>
      </CTASection>

      
    </PageWrapper>
  )
}