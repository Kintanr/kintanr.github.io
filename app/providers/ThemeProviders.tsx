'use client';

import { ThemeProvider } from 'next-themes';
import SplashScreen from '../components/SplashScreen';

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SplashScreen />
      {children}
    </ThemeProvider>
  );
}
