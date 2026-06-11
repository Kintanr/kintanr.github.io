import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { ThemeProviders } from '../providers/ThemeProviders';
import { CustomCursor } from '../components/CustomCursor';
import { FloatingShapes } from '../components/FloatingShapes';
import Header from '../components/Header';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Kintan Umari',
    template: '%s | Kintan Umari',
  },
  description: "Kintan Umari's personal website",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering — MUST be called before any next-intl function
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProviders>
            <div className="relative">
              <div className="hidden md:block">
                <CustomCursor />
                <FloatingShapes />
              </div>
              {/* <Header /> */}

              <Navbar />

              <main className="relative z-10">{children}</main>
              <div id="contact" className="h-[100vh]" />
              <Footer />
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
            </div>
          </ThemeProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
