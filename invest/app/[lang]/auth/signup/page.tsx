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
import { faUser, faEnvelope, faLock, faArrowRight, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Define theme colors (replace with your theme)
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

const SignupContainer = styled.div`
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

const SignupCard = styled(motion.div)`
  width: 100%;
  max-width: 500px;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 1rem 0;

  input[type="checkbox"] {
    margin-top: 0.25rem;
    accent-color: ${theme.colors.primary[500]};
  }

  label {
    font-size: 0.875rem;
    color: ${theme.colors.text.secondary};
    line-height: 1.4;

    a {
      color: ${theme.colors.primary[600]};
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
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

const SuccessMessage = styled.div`
  background: ${theme.colors.success}15;
  border: 1px solid ${theme.colors.success};
  color: ${theme.colors.success};
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const signupSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    }
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true)
    
    try {
      // Prepare the data for API (remove confirmPassword and terms)
      const { confirmPassword, terms, ...apiData } = data
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
        credentials: 'include', // Important for cookies
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Signup failed. Please try again.')
      }

      // Show success message
      toast.success('🎉 Account created successfully! Redirecting to dashboard...', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      })

      setSuccess(true)
      reset()

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error: any) {
      console.error('Signup error:', error)
      
      toast.error(error.message || 'An error occurred during signup', {
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

  return (
    <>
      <ToastContainer />
      <SignupContainer>
        <SignupCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo>
            <h1>WealthWise</h1>
            <p>Create your investment account</p>
          </Logo>

          {success && (
            <SuccessMessage>
              <FontAwesomeIcon icon={faCheckCircle} />
              <div>
                <strong>Account created successfully!</strong>
                <p style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>
                  You will be redirected to your dashboard shortly.
                </p>
              </div>
            </SuccessMessage>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <FormGroup>
                <Label htmlFor="firstName">
                  <FontAwesomeIcon icon={faUser} />
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  {...register('firstName')}
                  $error={!!errors.firstName}
                />
                {errors.firstName && (
                  <ErrorMessage>
                    <FontAwesomeIcon icon={faExclamationCircle} size="xs" />
                    {errors.firstName.message}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="lastName">
                  <FontAwesomeIcon icon={faUser} />
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  {...register('lastName')}
                  $error={!!errors.lastName}
                />
                {errors.lastName && (
                  <ErrorMessage>
                    <FontAwesomeIcon icon={faExclamationCircle} size="xs" />
                    {errors.lastName.message}
                  </ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

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

            <FormGroup>
              <Label htmlFor="confirmPassword">
                <FontAwesomeIcon icon={faLock} />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                $error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <ErrorMessage>
                  <FontAwesomeIcon icon={faExclamationCircle} size="xs" />
                  {errors.confirmPassword.message}
                </ErrorMessage>
              )}
            </FormGroup>

            <CheckboxContainer>
              <input
                type="checkbox"
                id="terms"
                {...register('terms')}
              />
              <label htmlFor="terms">
                I agree to the{' '}
                <Link href="/terms">Terms of Service</Link> and{' '}
                <Link href="/privacy">Privacy Policy</Link>
              </label>
            </CheckboxContainer>
            {errors.terms && (
              <ErrorMessage>
                <FontAwesomeIcon icon={faExclamationCircle} size="xs" />
                {errors.terms.message}
              </ErrorMessage>
            )}

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </SubmitButton>
          </Form>

          <LinkText>
            Already have an account?{' '}
            <Link href="/auth/login">Sign in here</Link>
          </LinkText>
        </SignupCard>
      </SignupContainer>
    </>
  )
}