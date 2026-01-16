'use client'

import { useTheme } from 'styled-components'

export default function ThemeDebug() {
  const theme = useTheme()
  
  if (!theme) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 10, 
        right: 10, 
       
        color: 'white', 
        padding: '10px',
        zIndex: 9999 
      }}>
        
      </div>
    )
  }
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 10, 
      right: 10, 
      
      color: 'white', 
      padding: '10px',
      zIndex: 9999 
    }}>
      
    </div>
  )
}