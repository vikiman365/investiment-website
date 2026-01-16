'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary[50]},
    ${({ theme }) => theme.colors.secondary[50]}
  );
`

const LoginCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  background: ${({ theme }) => theme.colors.background.light};
  padding: 3rem;
  border-radius: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  border: 1px solid ${({ theme }) => theme.colors.primary[100]};
`

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.primary[600]},
      ${({ theme }) => theme.colors.secondary[600]}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Input = styled.input<{ $error?: boolean }>`
  padding: 1rem;
  border: 2px solid ${({ $error, theme }) => 
    $error ? theme.colors.error : theme.colors.primary[200]};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }
`

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
`

const SubmitButton = styled(motion.button)`
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary[500]},
    ${({ theme }) => theme.colors.secondary[500]}
  );
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary[200]};
  }
  
  span {
    padding: 0 1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 0.875rem;
  }
`

const SocialLogin = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const SocialButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.primary[200]};
  border-radius: 0.5rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[50]};
    transform: translateY(-1px);
  }
`

const LinkText = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  
  a {
    color: ${({ theme }) => theme.colors.primary[600]};
    font-weight: 600;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Login data:', data)
    setIsSubmitting(false)
  }

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Logo>
          <h1>WealthWise</h1>
          <p>Sign in to your investment account</p>
        </Logo>

        <SocialLogin>
          <SocialButton>
            <span>G</span>
            Google
          </SocialButton>
          <SocialButton>
            <span>f</span>
            Facebook
          </SocialButton>
        </SocialLogin>

        <Divider>
          <span>Or continue with email</span>
        </Divider>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              $error={!!errors.email}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">
              <FontAwesomeIcon icon={faLock} />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              $error={!!errors.password}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </SubmitButton>
        </Form>

        <LinkText>
          Don't have an account?{' '}
          <Link href="/auth/signup">Sign up here</Link>
        </LinkText>
        
        <LinkText style={{ marginTop: '0.5rem' }}>
          <Link href="/auth/forgot-password">Forgot your password?</Link>
        </LinkText>
      </LoginCard>
    </LoginContainer>
  )
}