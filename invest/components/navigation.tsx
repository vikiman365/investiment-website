'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa'
import Link from 'next/link'

const FormContainer = styled(motion.div)`
  background: rgba(10, 14, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Subtitle = styled.p`
  color: #b0b7ff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.95rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const InputGroup = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

const Icon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #b0b7ff;
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #b0b7ff;
  cursor: pointer;
  padding: 0.25rem;

  &:hover {
    color: white;
  }
`

const SubmitButton = styled(motion.button)`
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: rgba(255, 255, 255, 0.3);

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  span {
    padding: 0 1rem;
    font-size: 0.9rem;
  }
`

const SocialButton = styled.button<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ $color }) => $color};
    transform: translateY(-1px);
  }
`

const FooterText = styled.p`
  text-align: center;
  color: #b0b7ff;
  font-size: 0.9rem;
  margin-top: 1.5rem;

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Welcome Back</Title>
      <Subtitle>Sign in to your investment account</Subtitle>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Icon>
            <FaEnvelope />
          </Icon>
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <Icon>
            <FaLock />
          </Icon>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <PasswordToggle
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
        </InputGroup>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b0b7ff' }}>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              style={{ accentColor: '#667eea' }}
            />
            <span style={{ fontSize: '0.9rem' }}>Remember me</span>
          </label>
          <Link href="/forgot-password" style={{ color: '#667eea', fontSize: '0.9rem', textDecoration: 'none' }}>
            Forgot password?
          </Link>
        </div>

        <SubmitButton
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign In
        </SubmitButton>
      </Form>

      <Divider>
        <span>Or continue with</span>
      </Divider>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <SocialButton
          $color="#DB4437"
          onClick={() => console.log('Google login')}
          style={{ flex: 1 }}
        >
          <FaGoogle />
          Google
        </SocialButton>
        <SocialButton
          $color="#333"
          onClick={() => console.log('GitHub login')}
          style={{ flex: 1 }}
        >
          <FaGithub />
          GitHub
        </SocialButton>
      </div>

      <FooterText>
        Don&apos;t have an account?{' '}
        <Link href="/signup">Sign up now</Link>
      </FooterText>
    </FormContainer>
  )
}