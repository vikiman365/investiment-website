'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faArrowRight, faGoogle, faFacebook, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Define theme colors (same as signup page)
const theme = {
  colors: {
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    secondary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    background: {
      light: '#ffffff',
      dark: '#0f172a',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    error: '#ef4444',
    success: '#10b981',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
}

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, 
    ${theme.colors.primary[50]},
    ${theme.colors.secondary[50]}
  );
`

const LoginCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  background: ${theme.colors.background.light};
  padding: 3rem;
  border-radius: 1.5rem;
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${theme.colors.primary[100]};
`

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, 
      ${theme.colors.primary[600]},
      ${theme.colors.secondary[600]}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${theme.colors.text.secondary};
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
  color: ${theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Input = styled.input<{ $error?: boolean }>`
  padding: 1rem;
  border: 2px solid ${({ $error }) => 
    $error ? theme.colors.error : theme.colors.primary[200]};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }
`

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
`

const SubmitButton = styled(motion.button)`
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  background: linear-gradient(135deg, 
    ${theme.colors.primary[500]},
    ${theme.colors.secondary[500]}
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
    box-shadow: ${theme.shadows.lg};
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
    border-bottom: 1px solid ${theme.colors.primary[200]};
  }
  
  span {
    padding: 0 1rem;
    color: ${theme.colors.text.secondary};
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
  border: 1px solid ${theme.colors.primary[200]};
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
    background: ${theme.colors.primary[50]};
    transform: translateY(-1px);
  }
`

const LinkText = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: ${theme.colors.text.secondary};
  font-size: 0.875rem;
  
  a {
    color: ${theme.colors.primary[600]};
    font-weight: 600;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: 'include', // Important for cookies
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Login failed. Please check your credentials.')
      }

      // Show success message
      toast.success('✅ Login successful! Redirecting to dashboard...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      })

      // Reset form
      reset()

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)

    } catch (error: any) {
      console.error('Login error:', error)
      
      toast.error(error.message || 'An error occurred during login', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    toast.info(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login coming soon!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    })
  }

  return (
    <>
      <ToastContainer />
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
            <SocialButton onClick={() => handleSocialLogin('google')}>
              <FontAwesomeIcon icon={faGoogle} style={{ color: '#DB4437' }} />
              Google
            </SocialButton>
            <SocialButton onClick={() => handleSocialLogin('facebook')}>
              <FontAwesomeIcon icon={faFacebook} style={{ color: '#4267B2' }} />
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
                <ErrorMessage>
                  <FontAwesomeIcon icon={faExclamationCircle} size="xs" />
                  {errors.email.message}
                </ErrorMessage>
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
                <ErrorMessage>
                  <FontAwesomeIcon icon={faExclamationCircle} size="xs" />
                  {errors.password.message}
                </ErrorMessage>
              )}
            </FormGroup>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: theme.colors.text.secondary }}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  {...register('rememberMe')}
                  style={{ accentColor: theme.colors.primary[500] }}
                />
                <span style={{ fontSize: '0.875rem' }}>Remember me</span>
              </label>
              <Link href="/auth/forgot-password" style={{ color: theme.colors.primary[600], fontSize: '0.875rem', textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </div>

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
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup">Sign up here</Link>
          </LinkText>
          
          <LinkText style={{ marginTop: '0.5rem' }}>
            <Link href="/auth/forgot-password">Forgot your password?</Link>
          </LinkText>
        </LoginCard>
      </LoginContainer>
    </>
  )
}