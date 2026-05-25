'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const resolvedTheme = theme === 'system' ? systemTheme : theme;
  const isDark = resolvedTheme === 'dark';

  // Hook Next.js untuk navigasi
  const router = useRouter();
  const pathname = usePathname();

  const isEnglish = pathname.startsWith('/en');

  const toggleLanguage = () => {
    let newPath: string;
    if (isEnglish) {
      // /en/about -> /id/about
      newPath = pathname.replace(/^\/en/, '/id');
    } else {
      // /id/about -> /en/about
      newPath = pathname.replace(/^\/id/, '/en');
    }

    router.push(newPath);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Di Next.js, kita cek pathname menggunakan usePathname()
    if (pathname !== '/') {
      // Pindah ke homepage dulu
      router.push('/');

      // Beri sedikit jeda agar navigasi selesai sebelum mencari element ID
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 shadow-lg backdrop-blur-lg dark:bg-slate-900/80'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Link Next.js menggunakan atribut 'href', bukan 'to' */}
          <Link href={'/'} className="bg-clip-text text-2xl font-bold text-yellow-500">
            Kintan Umari
          </Link>

          <div className="flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-slate-600 transition-colors hover:text-yellow-500 dark:text-slate-300 dark:hover:text-yellow-500"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-slate-600 transition-colors hover:text-yellow-500 dark:text-slate-300 dark:hover:text-yellow-500"
            >
              Skills
            </button>
            <Link
              href={'/projects'}
              className="text-slate-600 transition-colors hover:text-yellow-500 dark:text-slate-300 dark:hover:text-yellow-500"
            >
              Projects
            </Link>
            <button
              onClick={() => scrollToSection('certificates')}
              className="text-slate-600 transition-colors hover:text-yellow-500 dark:text-slate-300 dark:hover:text-yellow-500"
            >
              Certificates
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-slate-600 transition-colors hover:text-yellow-500 dark:text-slate-300 dark:hover:text-yellow-500"
            >
              Contact
            </button>

            {/* <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="rounded-full bg-slate-200 p-2 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </button> */}

            <label className="swap swap-rotate rounded-full bg-slate-200 p-2 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700">
              {/* this hidden checkbox controls the state */}
              <input
                checked={isDark}
                onChange={() => setTheme(isDark ? 'light' : 'dark')}
                type="checkbox"
              />

              {/* sun icon */}
              <svg
                className="swap-on h-5 w-5 fill-current text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off h-5 w-5 fill-current text-slate-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            <div
              onClick={toggleLanguage}
              className="relative h-10 w-20 cursor-pointer rounded-full bg-neutral-200 p-1"
            >
              <motion.div
                animate={{ x: isEnglish ? 40 : 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="h-8 w-8 rounded-full bg-white shadow"
              />

              <div className="absolute inset-0 flex items-center justify-between px-3 text-sm">
                <span>ID</span>
                <span>EN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
