'use client'

import styled from 'styled-components'
import { motion } from 'framer-motion'

const PlaceholderContainer = styled.div<{ $height?: string; $width?: string; $rounded?: boolean }>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '200px'};
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.primary[100]},
    ${({ theme }) => theme.colors.secondary[100]},
    ${({ theme }) => theme.colors.primary[100]}
  );
  background-size: 200% 100%;
  border-radius: ${({ $rounded }) => $rounded ? '50%' : '0.75rem'};
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    100% {
      left: 100%;
    }
  }
`

const PlaceholderContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  
  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 0.5rem;
    opacity: 0.5;
  }
`

interface ImagePlaceholderProps {
  height?: string
  width?: string
  rounded?: boolean
  label?: string
}

export default function ImagePlaceholder({ 
  height, 
  width, 
  rounded, 
  label = 'Image' 
}: ImagePlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <PlaceholderContainer 
        $height={height} 
        $width={width} 
        $rounded={rounded}
      >
        <PlaceholderContent>
          <svg 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          {label}
        </PlaceholderContent>
      </PlaceholderContainer>
    </motion.div>
  )
}