'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { scrollToSection } from '@/utils/navigate';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { theme, setTheme, systemTheme } = useTheme();
  const resolvedTheme = theme === 'system' ? systemTheme : theme;
  const isDark = resolvedTheme === 'dark';

  // Hook Next.js untuk navigasi
  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations('navbar');

  const locale = useLocale();

  const isEnglish = locale === 'en';

  const toggleLanguage = () => {
    router.replace(pathname, {
      locale: isEnglish ? 'id' : 'en',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use shared util to handle scrolling (passes router + pathname)
  // Note: handlers below call `scrollToSection(id, router, pathname)`

  const MenuItemList = ({ className = '' }) => (
    <div className={className}>
      <button
        onClick={() => {
          setMenuOpen(false);
          scrollToSection('home', router, pathname);
        }}
        className="text-slate-600 transition-colors hover:text-yellow-500 dark:text-slate-300 dark:hover:text-yellow-500"
      >
        {t('home')}
      </button>
      <button
        onClick={() => {
          setMenuOpen(false);
          scrollToSection('skills', router, pathname);
        }}
        className="text-slate-600 transition-colors hover:text-yellow-500 dark:text-slate-300 dark:hover:text-yellow-500"
      >
        {t('skills')}
      </button>
      <Link
        href={'/projects'}
        className="text-slate-600 transition-colors hover:text-yellow-500 dark:text-slate-300 dark:hover:text-yellow-500"
      >
        {t('projects')}
      </Link>
      <button
        onClick={() => {
          setMenuOpen(false);
          scrollToSection('certificates', router, pathname);
        }}
        className="text-slate-600 transition-colors hover:text-yellow-500 dark:text-slate-300 dark:hover:text-yellow-500"
      >
        {t('certificates')}
      </button>
      <button
        onClick={() => {
          setMenuOpen(false);
          scrollToSection('contact', router, pathname);
        }}
        className="text-slate-600 transition-colors hover:text-yellow-500 dark:text-slate-300 dark:hover:text-yellow-500"
      >
        {t('contact')}
      </button>

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
        className="relative h-10 w-20 cursor-pointer rounded-full bg-neutral-200 p-1 transition-colors duration-300 hover:bg-neutral-300 dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        <motion.div
          animate={{ x: isEnglish ? [0, 65, 40] : [40, -25, 0] }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="h-8 w-8 rounded-full bg-white shadow-md dark:bg-slate-100 dark:shadow-slate-950/40"
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 text-sm text-slate-700 dark:text-slate-400">
          <span className={!isEnglish ? 'font-semibold' : ''}>ID</span>
          <span className={isEnglish ? 'font-semibold' : ''}>EN</span>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <Link href={'/'} className="bg-clip-text text-lg font-bold text-yellow-500 md:text-2xl">
            Kintan Umari
          </Link>

          <MenuItemList className="hidden items-center gap-8 md:flex" />

          <div className="block md:hidden">
            <div
              ref={dropdownRef}
              className={`dropdown dropdown-end ${menuOpen ? 'dropdown-open' : ''}`}
            >
              <label className="btn btn-circle swap swap-rotate border-0 bg-transparent shadow-none">
                {/* controlled checkbox tied to menuOpen state (hidden) */}
                <input
                  type="checkbox"
                  className="hidden"
                  checked={menuOpen}
                  onChange={(e) => setMenuOpen(e.target.checked)}
                />

                {/* hamburger icon */}
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>

                {/* close icon */}
                <svg
                  className="swap-on fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>
              {/* <div tabIndex={0} role="button" className="btn m-1">
                Click ⬇️
              </div> */}
              {menuOpen ? (
                <ul
                  tabIndex={-1}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <MenuItemList className="flex flex-col items-start gap-4 px-5 py-3 text-left" />
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
