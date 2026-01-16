'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion'
import { 
   FaChartLine, FaUsers,  FaBuilding,
  FaCheckCircle, FaArrowRight, FaStar, FaArrowUp, FaArrowDown,
  FaWallet, FaCreditCard, FaExchangeAlt, FaPercent, FaCalendarAlt,
  FaChartBar, FaDatabase, FaFilter, FaSearch, FaCog,
  FaBell, FaQuestionCircle, FaDownload, FaShareAlt,
  FaEye, FaEyeSlash, FaPlus, FaMinus,
  FaHistory, FaCalendar, FaClock, FaGlobe,
  FaBitcoin, FaIndustry, FaCoins, FaGem, FaLeaf,
  FaUserCircle, FaCrown, FaTrophy, FaMedal,
   FaBalanceScale
} from 'react-icons/fa'
import{ FaMoneyBillTrendUp} from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa6";

import {FaArrowTrendDown} from "react-icons/fa6";
import {FaArrowTrendUp} from "react-icons/fa6";
import {FaShield} from "react-icons/fa6";



// Import Components


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

// Dashboard Layout
const DashboardLayout = styled.div`
  padding: 6rem 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 5rem 1.5rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 4rem 1rem 1rem;
  }
`

const DashboardHeader = styled.div`
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

const WelcomeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`

const UserAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: 700;
  border: 3px solid rgba(255, 255, 255, 0.1);
`

const WelcomeText = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.25rem;
    line-height: 1.2;
  }

  p {
    font-size: 1rem;
    color: #a8b1ff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.75rem;
    }
  }
`

const DashboardActions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column;
  }
`

const ActionButton = styled.button<{ $primary?: boolean }>`
  padding: 0.875rem 1.5rem;
  background: ${props => props.$primary 
    ? 'linear-gradient(135deg, #667eea, #764ba2)' 
    : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.$primary 
    ? 'rgba(102, 126, 234, 0.4)' 
    : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$primary 
      ? '0 10px 25px rgba(102, 126, 234, 0.3)' 
      : '0 10px 25px rgba(0, 0, 0, 0.2)'};
  }
`

// Portfolio Overview
const PortfolioSection = styled.section`
  margin-bottom: 3rem;
`

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const PortfolioCard = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%);
  border-radius: 24px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(102, 126, 234, 0.4);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`

const CardSubtitle = styled.div`
  font-size: 0.875rem;
  color: #a8b1ff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const PortfolioValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const PerformanceChange = styled.div<{ $positive: boolean }>`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.$positive ? '#4ade80' : '#ef4444'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CardActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`

// Asset Allocation
const AllocationSection = styled.section`
  margin-bottom: 3rem;
`

const AllocationGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const AllocationChart = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const ChartTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 2rem;
`

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`

const PieChart = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    #3b82f6 0% 35%,
    #f59e0b 35% 60%,
    #8b5cf6 60% 75%,
    #10b981 75% 85%,
    #ef4444 85% 95%,
    #22c55e 95% 100%
  );
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    background: #0a0e2a;
    border-radius: 50%;
  }
`

const ChartCenter = styled.div`
  position: absolute;
  z-index: 2;
  text-align: center;
`

const ChartCenterValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
`

const ChartCenterLabel = styled.div`
  font-size: 0.875rem;
  color: #a8b1ff;
`

const ChartLegend = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const LegendColor = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  background: ${props => props.$color};
  border-radius: 2px;
  flex-shrink: 0;
`

const LegendText = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LegendName = styled.div`
  font-size: 0.95rem;
  color: #b0b7ff;
`

const LegendValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: white;
`

const QuickActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const QuickAction = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.4);
    transform: translateY(-2px);
  }
`

// Recent Activity
const ActivitySection = styled.section`
  margin-bottom: 3rem;
`

const ActivityTable = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  backdrop-filter: blur(10px);
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    display: none;
  }
`

const TableHeaderCell = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #a8b1ff;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  @media (max-width: 768px) {
    display: block;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`

const TableCell = styled.div`
  color: #b0b7ff;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    justify-content: space-between;

    &::before {
      content: attr(data-label);
      font-weight: 600;
      color: #a8b1ff;
      min-width: 120px;
      display: inline-block;
    }
  }
`

const TransactionIcon = styled.div<{ $type: string }>`
  width: 40px;
  height: 40px;
  background: ${props => props.$type === 'buy' 
    ? 'rgba(34, 197, 94, 0.15)' 
    : props.$type === 'sell'
    ? 'rgba(239, 68, 68, 0.15)'
    : 'rgba(102, 126, 234, 0.15)'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$type === 'buy' 
    ? '#4ade80' 
    : props.$type === 'sell'
    ? '#ef4444'
    : '#667eea'};
  font-size: 1.25rem;
`

const TransactionName = styled.div`
  font-weight: 600;
  color: white;
`

const TransactionDate = styled.div`
  font-size: 0.875rem;
  color: #a8b1ff;
`

const TransactionAmount = styled.div<{ $type: string }>`
  font-weight: 700;
  color: ${props => props.$type === 'buy' 
    ? '#4ade80' 
    : props.$type === 'sell'
    ? '#ef4444'
    : 'white'};
`

const TransactionStatus = styled.div<{ $status: string }>`
  padding: 0.5rem 1rem;
  background: ${props => props.$status === 'completed' 
    ? 'rgba(34, 197, 94, 0.15)' 
    : 'rgba(245, 158, 11, 0.15)'};
  color: ${props => props.$status === 'completed' 
    ? '#4ade80' 
    : '#f59e0b'};
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
`

// Goals Section
const GoalsSection = styled.section`
  margin-bottom: 3rem;
`

const GoalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const GoalCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(102, 126, 234, 0.4);
  }
`

const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`

const GoalTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`

const GoalTarget = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
`

const ProgressBar = styled.div`
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin: 1.5rem 0;
  overflow: hidden;
`

const ProgressFill = styled(motion.div)<{ $percentage: number }>`
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  width: ${props => props.$percentage}%;
`

const GoalProgress = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ProgressText = styled.div`
  font-size: 0.875rem;
  color: #a8b1ff;
`

const ProgressPercentage = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
`

// ====================
// DASHBOARD PAGE COMPONENT
// ====================
export default function DashboardPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const portfolioData = {
    totalValue: "$124,850.75",
    todaysChange: "+$2,845.32",
    todaysPercentage: "+2.33%",
    monthlyReturn: "+8.45%",
    annualReturn: "+24.78%"
  }

  const allocationData = [
    { name: "Technology", value: "35%", color: "#3b82f6", amount: "$43,697.76" },
    { name: "Real Estate", value: "25%", color: "#f59e0b", amount: "$31,212.69" },
    { name: "Cryptocurrency", value: "15%", color: "#8b5cf6", amount: "$18,727.61" },
    { name: "Bonds", value: "10%", color: "#10b981", amount: "$12,485.08" },
    { name: "Commodities", value: "8%", color: "#ef4444", amount: "$9,988.06" },
    { name: "Energy", value: "7%", color: "#22c55e", amount: "$8,739.55" }
  ]

  const recentTransactions = [
    {
      id: 1,
      name: "Apple Inc. (AAPL)",
      type: "buy",
      amount: "+$5,000.00",
      date: "Today, 10:30 AM",
      status: "completed"
    },
    {
      id: 2,
      name: "Tech Innovators Fund",
      type: "dividend",
      amount: "+$342.50",
      date: "Yesterday, 3:45 PM",
      status: "completed"
    },
    {
      id: 3,
      name: "Bitcoin Purchase",
      type: "buy",
      amount: "+$2,500.00",
      date: "2 days ago",
      status: "pending"
    },
    {
      id: 4,
      name: "Real Estate Trust",
      type: "sell",
      amount: "-$10,000.00",
      date: "3 days ago",
      status: "completed"
    },
    {
      id: 5,
      name: "Portfolio Rebalance",
      type: "adjustment",
      amount: "+$1,234.56",
      date: "1 week ago",
      status: "completed"
    }
  ]

  const goals = [
    {
      title: "Retirement Fund",
      target: "$500,000",
      current: "$124,850",
      percentage: 25,
      deadline: "2035"
    },
    {
      title: "Home Purchase",
      target: "$250,000",
      current: "$85,000",
      percentage: 34,
      deadline: "2026"
    },
    {
      title: "Education Fund",
      target: "$100,000",
      current: "$42,500",
      percentage: 42,
      deadline: "2028"
    }
  ]

  const quickActions = [
    { icon: <FaPlus />, label: "Add Funds", action: () => {} },
    { icon: <FaExchangeAlt />, label: "Transfer", action: () => {} },
    { icon: <FaDownload />, label: "Withdraw", action: () => {} },
    { icon: <FaChartLine />, label: "Rebalance", action: () => {} }
  ]

  return (
    <PageWrapper>
     

      <DashboardLayout>
        {/* Dashboard Header */}
        <DashboardHeader>
          <WelcomeSection>
            <UserAvatar>JD</UserAvatar>
            <WelcomeText>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Welcome back, John! 👋
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <FaCalendarAlt /> Tuesday, December 12, 2023
              </motion.p>
            </WelcomeText>
          </WelcomeSection>

          <DashboardActions>
            <ActionButton>
              <FaBell /> Notifications
            </ActionButton>
            <ActionButton $primary>
              <FaPlus /> Add Funds
            </ActionButton>
          </DashboardActions>
        </DashboardHeader>

        {/* Portfolio Overview */}
        <PortfolioSection>
          <PortfolioGrid>
            <PortfolioCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <CardHeader>
                <div>
                  <CardTitle>Total Portfolio Value</CardTitle>
                  <CardSubtitle>
                    <FaWallet /> All Investments
                  </CardSubtitle>
                </div>
                <button 
                  onClick={() => setShowBalance(!showBalance)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#a8b1ff',
                    cursor: 'pointer',
                    fontSize: '1.25rem'
                  }}
                >
                  {showBalance ? <FaEye /> : <FaEyeSlash />}
                </button>
              </CardHeader>
              
              <PortfolioValue>
                {showBalance ? portfolioData.totalValue : '••••••••'}
              </PortfolioValue>
              
              <PerformanceChange $positive={true}>
                <FaArrowUp /> {portfolioData.todaysChange} ({portfolioData.todaysPercentage})
              </PerformanceChange>

              <CardActions>
                <ActionButton>
                  <FaChartLine /> View Details
                </ActionButton>
                <ActionButton>
                  <FaDownload /> Report
                </ActionButton>
              </CardActions>
            </PortfolioCard>

            <PortfolioCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <CardHeader>
                <div>
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardSubtitle>
                    <FaCalendarAlt /> November 2023
                  </CardSubtitle>
                </div>
              </CardHeader>
              
              <PortfolioValue>{portfolioData.monthlyReturn}</PortfolioValue>
              
              <PerformanceChange $positive={true}>
                <FaArrowTrendUp /> Above Benchmark (+2.1%)
              </PerformanceChange>

              <CardActions>
                <ActionButton>
                  <FaHistory /> View History
                </ActionButton>
              </CardActions>
            </PortfolioCard>

            <PortfolioCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <CardHeader>
                <div>
                  <CardTitle>Annual Returns</CardTitle>
                  <CardSubtitle>
                    <FaStar /> Year to Date
                  </CardSubtitle>
                </div>
              </CardHeader>
              
              <PortfolioValue>{portfolioData.annualReturn}</PortfolioValue>
              
              <PerformanceChange $positive={true}>
                <FaTrophy /> Top 10% of Investors
              </PerformanceChange>

              <CardActions>
                <ActionButton>
                  <FaCrown /> Compare
                </ActionButton>
              </CardActions>
            </PortfolioCard>
          </PortfolioGrid>
        </PortfolioSection>

        {/* Asset Allocation */}
        <AllocationSection>
          <AllocationGrid>
            <AllocationChart>
              <ChartTitle>Asset Allocation</ChartTitle>
              
              <ChartContainer>
                <PieChart>
                  <ChartCenter>
                    <ChartCenterValue>100%</ChartCenterValue>
                    <ChartCenterLabel>Diversified</ChartCenterLabel>
                  </ChartCenter>
                </PieChart>

                <ChartLegend>
                  {allocationData.map((item, index) => (
                    <LegendItem key={index}>
                      <LegendColor $color={item.color} />
                      <LegendText>
                        <LegendName>{item.name}</LegendName>
                        <LegendValue>{item.value}</LegendValue>
                      </LegendText>
                    </LegendItem>
                  ))}
                </ChartLegend>
              </ChartContainer>
            </AllocationChart>

            <QuickActions>
              <ChartTitle>Quick Actions</ChartTitle>
              {quickActions.map((action, index) => (
                <QuickAction
                  key={index}
                  onClick={action.action}
                >
                  {action.icon}
                  {action.label}
                </QuickAction>
              ))}
            </QuickActions>
          </AllocationGrid>
        </AllocationSection>

        {/* Recent Activity */}
        <ActivitySection>
          <ChartTitle style={{ marginBottom: '2rem' }}>Recent Activity</ChartTitle>
          
          <ActivityTable>
            <TableHeader>
              <TableHeaderCell>Transaction</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableHeader>

            {recentTransactions.map((transaction, index) => (
              <TableRow
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TableCell data-label="Transaction">
                  <TransactionIcon $type={transaction.type}>
                    {transaction.type === 'buy' ? <FaArrowUp /> : 
                     transaction.type === 'sell' ? <FaArrowDown /> : 
                     <FaExchangeAlt />}
                  </TransactionIcon>
                  <div>
                    <TransactionName>{transaction.name}</TransactionName>
                    <TransactionDate>{transaction.date}</TransactionDate>
                  </div>
                </TableCell>
                <TableCell data-label="Amount">
                  <TransactionAmount $type={transaction.type}>
                    {transaction.amount}
                  </TransactionAmount>
                </TableCell>
                <TableCell data-label="Date">{transaction.date}</TableCell>
                <TableCell data-label="Status">
                  <TransactionStatus $status={transaction.status}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </TransactionStatus>
                </TableCell>
              </TableRow>
            ))}
          </ActivityTable>
        </ActivitySection>

        {/* Goals */}
        <GoalsSection>
          <ChartTitle style={{ marginBottom: '2rem' }}>Investment Goals</ChartTitle>
          
          <GoalsGrid>
            {goals.map((goal, index) => (
              <GoalCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <GoalHeader>
                  <div>
                    <GoalTitle>{goal.title}</GoalTitle>
                    <GoalTarget>{goal.target}</GoalTarget>
                  </div>
                </GoalHeader>

                <ProgressBar>
                  <ProgressFill 
                    $percentage={goal.percentage}
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </ProgressBar>

                <GoalProgress>
                  <ProgressText>
                    {goal.current} of {goal.target} • Due {goal.deadline}
                  </ProgressText>
                  <ProgressPercentage>{goal.percentage}%</ProgressPercentage>
                </GoalProgress>
              </GoalCard>
            ))}
          </GoalsGrid>
        </GoalsSection>
      </DashboardLayout>

      
    </PageWrapper>
  )
}