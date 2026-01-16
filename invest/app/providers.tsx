'use client'

import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/themes'
import StyledComponentsRegistry from '../lib/registry'
import { I18nProvider } from '../i18n/client'
import { ReactNode } from 'react'

export function Providers({ 
  children, 
  lang = 'en' 
}: { 
  children: ReactNode; 
  lang: string 
}) {
  return (
    <I18nProvider lang={lang}>
      <StyledComponentsRegistry>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </StyledComponentsRegistry>
    </I18nProvider>
  )
}