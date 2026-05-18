import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProviders } from './providers/ThemeProviders';
import { CustomCursor } from './components/CustomCursor';
import { FloatingShapes } from './components/FloatingShapes';
import Header from './components/Header';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kintan Umari',
  description: "Kintan Umari's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProviders>
          <CustomCursor />
          <FloatingShapes />
          {/* <Header /> */}
          <Navbar />

          {children}

          <Footer />
        </ThemeProviders>
      </body>
    </html>
  );
}
