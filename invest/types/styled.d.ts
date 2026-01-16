import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        50: string; 100: string; 200: string; 300: string; 
        400: string; 500: string; 600: string; 700: string; 
        800: string; 900: string;
      };
      secondary: {
        50: string; 100: string; 200: string; 300: string; 
        400: string; 500: string; 600: string; 700: string; 
        800: string; 900: string;
      };
      success: string;
      warning: string;
      error: string;
      background: {
        light: string;
        dark: string;
        card: string;
      };
      text: {
        primary: string;
        secondary: string;
        light: string;
      };
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    animations: {
      transition: string;
      bounce: string;
    };
  }
}