'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const Card = styled(motion.div)<{ $popular: boolean }>`
  background: ${({ theme, $popular }) => 
    $popular 
      ? `linear-gradient(135deg, ${theme.colors.primary[50]}, ${theme.colors.secondary[50]})`
      : theme.colors.background.light};
  border-radius: 1.5rem;
  padding: 2rem;
  position: relative;
  border: 2px solid ${({ theme, $popular }) => 
    $popular ? theme.colors.primary[300] : 'transparent'};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary[500]},
    ${({ theme }) => theme.colors.secondary[500]}
  );
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
`

const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
`

const Price = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`

const Amount = styled.span`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary[600]},
    ${({ theme }) => theme.colors.secondary[600]}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Period = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`

const Features = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
  flex: 1;
`

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  
  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.success};
    font-weight: bold;
  }
`

const CTAButton = styled(motion.button)<{ $popular: boolean }>`
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  
  ${({ $popular, theme }) => 
    $popular
      ? `
        background: linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.secondary[500]});
        color: white;
        &:hover {
          transform: scale(1.02);
        }
      `
      : `
        background: ${theme.colors.primary[50]};
        color: ${theme.colors.primary[600]};
        border: 2px solid ${theme.colors.primary[200]};
        &:hover {
          background: ${theme.colors.primary[100]};
        }
      `
  }
`

export interface PlanCardProps {
  id: string
  name: string
  price: string
  period: string
  features: string[] | unknown
  cta: string
  popular: boolean
  badge?: string
}

export default function PlanCard({
  name,
  price,
  period,
  features,
  cta,
  popular,
  badge
}: PlanCardProps) {
  // Convert features to string array if it's an object
  const featureList = Array.isArray(features) 
    ? features 
    : typeof features === 'object' 
      ? Object.values(features as Record<string, string>)
      : [];

  return (
    <Card 
      $popular={popular}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {popular && badge && <PopularBadge>{badge}</PopularBadge>}
      
      <PlanHeader>
        <PlanName>{name}</PlanName>
        <Price>
          <Amount>{price}</Amount>
          <Period>{period}</Period>
        </Price>
      </PlanHeader>

      <Features>
        {featureList.map((feature: string, index: number) => (
          <Feature key={index}>{feature}</Feature>
        ))}
      </Features>

      <CTAButton
        $popular={popular}
        whileTap={{ scale: 0.95 }}
      >
        {cta}
      </CTAButton>
    </Card>
  )
}