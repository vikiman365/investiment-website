'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { 
  FaBatteryFull, FaWifi, FaSignal, FaApple, FaBitcoin,
  FaChartLine, FaArrowUp, FaArrowDown, FaCog
} from 'react-icons/fa'
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const PhoneContainer = styled(motion.div)`
  position: relative;
  width: 340px;
  height: 690px;
  background: linear-gradient(145deg, #1a1f4b, #0a0e2a);
  border-radius: 50px;
  padding: 20px;
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.5),
    inset 0 0 0 2px rgba(255, 255, 255, 0.05),
    inset 0 0 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 140px;
    height: 24px;
    background: #0a0e2a;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    z-index: 2;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 610px;
    border-radius: 40px;
  }

  @media (max-width: 480px) {
    width: 280px;
    height: 570px;
    border-radius: 35px;
  }
`

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(165deg, #0a0e2a 0%, #141a3a 100%);
  border-radius: 35px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    border-radius: 30px;
  }
`

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px 8px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`

const Time = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: white;
  letter-spacing: 0.5px;
`

const StatusIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
`

const AppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px;
`

const AppTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    width: 8px;
    height: 30px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 4px;
  }
`

const SettingsButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0b7ff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    color: white;
    transform: rotate(30deg);
  }
`

const AppContent = styled.div`
  flex: 1;
  padding: 0 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.03);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(102, 126, 234, 0.5);
    border-radius: 2px;
  }
`

const PortfolioCard = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%);
  border-radius: 20px;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const CardTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: #a8b1ff;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

const CardIcon = styled.div<{ $color: string }>`
  width: 36px;
  height: 36px;
  background: ${({ $color }) => $color};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
`

const CardValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
`

const CardChange = styled.div<{ $positive: boolean }>`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ $positive }) => $positive ? '#4ade80' : '#ef4444'};
  display: flex;
  align-items: center;
  gap: 6px;
`

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const ChartTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: #a8b1ff;
`

const ChartPeriod = styled.div`
  font-size: 0.85rem;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
`

const Chart = styled.div`
  height: 80px;
  position: relative;
  overflow: hidden;
`

const ChartLine = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
`

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TransactionTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: #a8b1ff;
  margin-bottom: 8px;
  padding-left: 8px;
`

const TransactionItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(102, 126, 234, 0.3);
    transform: translateX(4px);
  }
`

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const TransactionIcon = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  background: ${({ $color }) => $color};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
`

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const TransactionName = styled.div`
  font-weight: 600;
  color: white;
  font-size: 0.95rem;
`

const TransactionTime = styled.div`
  font-size: 0.8rem;
  color: #b0b7ff;
`

const TransactionAmount = styled.div<{ $positive: boolean }>`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ $positive }) => $positive ? '#4ade80' : '#ef4444'};
`

export default function PhoneMockup() {
  const cards = [
    {
      title: "Liquid Capital",
      value: "$39,547.00",
      change: "+2.5% today",
      positive: true,
      icon: <FaChartLine />,
      iconColor: "linear-gradient(135deg, #667eea, #764ba2)"
    },
    {
      title: "Portfolio Value",
      value: "$39,899.00",
      change: "+3.2% this week",
      positive: true,
      icon: <FaMoneyBillTrendUp />,
      iconColor: "linear-gradient(135deg, #4ade80, #22c55e)"
    },
    {
      title: "YTD Returns",
      value: "+$58,895",
      change: "+18.4% YTD",
      positive: true,
      icon: <FaArrowUp />,
      iconColor: "linear-gradient(135deg, #fbbf24, #f59e0b)"
    }
  ]

  const transactions = [
    {
      name: "Apple Inc.",
      time: "Today, 10:30 AM",
      amount: "+$1,234",
      positive: true,
      icon: <FaApple />,
      iconColor: "#3b82f6"
    },
    {
      name: "Bitcoin Purchase",
      time: "Yesterday, 3:45 PM",
      amount: "+$567",
      positive: true,
      icon: <FaBitcoin />,
      iconColor: "#8b5cf6"
    },
    {
      name: "Tech ETF",
      time: "2 days ago",
      amount: "+$892",
      positive: true,
      icon: <FaChartLine />,
      iconColor: "#10b981"
    }
  ]

  const points = Array.from({ length: 20 }, (_, i) => ({
    x: i * (280 / 19),
    y: 40 + Math.sin(i * 0.5) * 20 + Math.random() * 10
  }))

  const pathData = points.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ')

  return (
    <PhoneContainer
      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      whileHover={{ y: -15 }}
    >
      <PhoneScreen>
        <StatusBar>
          <Time>9:41</Time>
          <StatusIcons>
            <FaSignal />
            <FaWifi />
            <FaBatteryFull />
          </StatusIcons>
        </StatusBar>

        <AppHeader>
          <AppTitle>My Portfolio</AppTitle>
          <SettingsButton>
            <FaCog />
          </SettingsButton>
        </AppHeader>

        <AppContent>
          {cards.map((card, index) => (
            <PortfolioCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardIcon $color={card.iconColor}>
                  {card.icon}
                </CardIcon>
              </CardHeader>
              <CardValue>{card.value}</CardValue>
              <CardChange $positive={card.positive}>
                {card.positive ? <FaArrowUp /> : <FaArrowDown />}
                {card.change}
              </CardChange>
            </PortfolioCard>
          ))}

          <ChartContainer>
            <ChartHeader>
              <ChartTitle>Portfolio Performance</ChartTitle>
              <ChartPeriod>1 Month</ChartPeriod>
            </ChartHeader>
            <Chart>
              <svg width="100%" height="100%" viewBox="0 0 280 80">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#667eea" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#764ba2" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d={pathData}
                  fill="none"
                  stroke="url(#chartGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {points.map((point, i) => (
                  <circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="2"
                    fill="#667eea"
                  />
                ))}
              </svg>
            </Chart>
          </ChartContainer>

          <div>
            <TransactionTitle>Recent Transactions</TransactionTitle>
            <TransactionList>
              {transactions.map((transaction, index) => (
                <TransactionItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <TransactionInfo>
                    <TransactionIcon $color={transaction.iconColor}>
                      {transaction.icon}
                    </TransactionIcon>
                    <TransactionDetails>
                      <TransactionName>{transaction.name}</TransactionName>
                      <TransactionTime>{transaction.time}</TransactionTime>
                    </TransactionDetails>
                  </TransactionInfo>
                  <TransactionAmount $positive={transaction.positive}>
                    {transaction.amount}
                  </TransactionAmount>
                </TransactionItem>
              ))}
            </TransactionList>
          </div>
        </AppContent>
      </PhoneScreen>
    </PhoneContainer>
  )
}