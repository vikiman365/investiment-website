'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.colors.background.dark};
  color: ${({ theme }) => theme.colors.text.light};
`

const StatsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const StatItem = styled(motion.div)`
  h3 {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.primary[300]},
      ${({ theme }) => theme.colors.secondary[300]}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 1.125rem;
  }
`

export default function Stats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { value: 15000, label: 'Active Investors' },
    { value: 250, label: 'Million USD Managed', suffix: 'M' },
    { value: 98.7, label: 'Success Rate', suffix: '%' },
    { value: 24, label: 'Countries', suffix: '+' },
  ]

  return (
    <StatsSection ref={ref}>
      <StatsContainer>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3>
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix || ''}
                  />
                )}
              </h3>
              <p>{stat.label}</p>
            </StatItem>
          ))}
        </StatsGrid>
      </StatsContainer>
    </StatsSection>
  )
}