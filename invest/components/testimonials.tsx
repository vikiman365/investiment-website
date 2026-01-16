'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ImagePlaceholder from './ImagePlaceholder'

const TestimonialsSection = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.colors.background.card};
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto 3rem;
`

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`

const TestimonialCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.light};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.primary[100]};
`

const Quote = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.5rem;
  font-style: italic;
  line-height: 1.6;
`

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const AuthorInfo = styled.div`
  h4 {
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 0.25rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.875rem;
  }
`

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      id: 1,
      quote: "WealthWise transformed my approach to investing. The professional plan helped me grow my portfolio by 25% in the first year.",
      name: "Sarah Johnson",
      role: "Entrepreneur",
    },
    {
      id: 2,
      quote: "As someone new to investing, the basic plan was perfect. The guidance and support made me feel confident in my decisions.",
      name: "Michael Chen",
      role: "Software Engineer",
    },
    {
      id: 3,
      quote: "The enterprise solution provided exactly what our company needed. The dedicated team and AI insights are game-changers.",
      name: "Robert Martinez",
      role: "CFO, TechCorp",
    },
  ]

  return (
    <TestimonialsSection ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Title>What Our Investors Say</Title>
          <Subtitle>Join thousands of satisfied investors who trust WealthWise with their financial growth</Subtitle>
          
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TestimonialCard
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Quote>"{testimonial.quote}"</Quote>
                  <Author>
                    <ImagePlaceholder 
                      width="60px" 
                      height="60px" 
                      rounded 
                      label="Avatar"
                    />
                    <AuthorInfo>
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </AuthorInfo>
                  </Author>
                </TestimonialCard>
              </motion.div>
            ))}
          </TestimonialsGrid>
        </motion.div>
      </Container>
    </TestimonialsSection>
  )
}