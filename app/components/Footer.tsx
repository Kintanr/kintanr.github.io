'use client';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
import {
  Mail,
  MapPin,
  Globe,
  Sparkle,
  Contact,
  House,
  BrainCog,
  TabletSmartphone,
  FileBadge,
  MoveRight,
} from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import { useTranslations } from 'next-intl';
import infoContact from '../data/contact.json';
import { scrollToSection } from '@/utils/navigate';
import { usePathname, useRouter } from '@/i18n/navigation';
import Link from 'next/link';

export const Footer = () => {
  const t = useTranslations('footer');
  const nav = useTranslations('navbar');
  const com = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();

  const contactInfo = infoContact.filter((item) => item.connect === false);

  const connectInfo = infoContact.filter((item) => item.connect === true);

  const menuList = [
    { label: nav('home'), href: 'home', icon: House },
    { label: nav('skills'), href: 'skills', icon: BrainCog },
    { label: nav('projects'), href: '/projects', icon: TabletSmartphone },
    { label: nav('certificates'), href: 'certificates', icon: FileBadge },
    { label: nav('contact'), href: 'contact', icon: Contact },
  ];

  const linkedinPath =
    'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z';

  const ICONS: Record<string, React.ComponentType<any>> = {
    Mail,
    MapPin,
    Globe,
    Sparkle,
    Contact,
    SiGithub,
    linkedinPath: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d={linkedinPath} />
      </svg>
    ),
  };

  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let direction = -1;
    let xPercent = 0;
    let speed = window.innerWidth >= 768 ? 0.03 : 0.05;

    const handleResize = () => {
      speed = window.innerWidth >= 768 ? 0.03 : 0.05;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      xPercent += speed * direction;

      if (xPercent <= -50) xPercent = 0;
      if (xPercent > 0) xPercent = -50;

      gsap.set(marqueeRef.current, {
        xPercent,
      });
    };

    gsap.ticker.add(animate);

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        direction = self.direction * -1;
      },
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(animate);
      trigger.kill();
    };
  }, []);

  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();

  // footer muncul dari bawah
  const rawY = useTransform(scrollYProgress, [0.9, 1], [300, 0]);

  const y = useSpring(rawY, {
    stiffness: 120,
    damping: 24,
  });

  // const opacity = useTransform(scrollYProgress, [0.88, 0.92, 1], [0, 1, 1]);

  const [revealText, setRevealText] = useState(false);
  const [footerProgress, setFooterProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const progress = Math.max(0, Math.min(1, (latest - 0.9) / 0.1));
    setRevealText(progress > 0.1);
    setFooterProgress(progress);
  });

  return (
    <motion.footer
      ref={ref}
      className="fixed inset-x-0 bottom-0 z-0 max-h-[100vh] overflow-x-hidden overflow-y-auto bg-gradient-to-b from-slate-100 to-white pt-26 pb-4 md:h-screen md:overflow-hidden dark:from-slate-900 dark:to-slate-800"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="w-full overflow-hidden">
            <div className="h-12 w-full overflow-hidden md:h-24">
              <div ref={marqueeRef} className="flex w-max py-2 whitespace-nowrap md:py-4">
                {/* group 1 */}
                <div className="flex">
                  <span className="flex gap-9 pr-10 pb-2 text-2xl text-slate-700 md:text-5xl dark:text-white">
                    <Sparkle className="h-5 w-5 pt-2 text-slate-700 md:h-9 md:w-9 dark:text-white" />{' '}
                    {t('title')}{' '}
                    <Sparkle className="h-5 w-5 pt-2 text-slate-700 md:h-9 md:w-9 dark:text-white" />{' '}
                    {t('title')}{' '}
                  </span>
                  <span className="flex gap-9 pr-10 pb-2 text-2xl text-slate-700 md:text-5xl dark:text-white">
                    <Sparkle className="h-5 w-5 pt-2 text-slate-700 md:h-9 md:w-9 dark:text-white" />
                    {t('title')}{' '}
                    <Sparkle className="h-5 w-5 pt-2 text-slate-700 md:h-9 md:w-9 dark:text-white" />{' '}
                    {t('title')}{' '}
                  </span>
                </div>

                {/* duplicate group 2 */}
                <div className="flex">
                  <span className="flex gap-9 pr-10 pb-2 text-2xl text-white md:text-5xl">
                    <Sparkle className="h-5 w-5 pt-2 text-white md:h-9 md:w-9" /> {t('title')}{' '}
                    <Sparkle className="h-5 w-5 pt-2 text-white md:h-9 md:w-9" /> {t('title')}{' '}
                  </span>
                  <span className="flex gap-9 pr-10 pb-2 text-2xl text-white md:text-5xl">
                    <Sparkle className="h-5 w-5 pt-2 text-white md:h-9 md:w-9" />
                    {t('title')} <Sparkle className="h-5 w-5 pt-2 text-white md:h-9 md:w-9" />{' '}
                    {t('title')}{' '}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 pt-15 pb-10 md:grid-cols-4">
            <div className="pr-10">
              {/* <h3 className="mb-5 text-3xl font-semibold text-slate-800 dark:text-white">
                Kintan Umari
              </h3> */}
              <p className="text-sm text-slate-600 dark:text-slate-300">{t('description')}</p>

              <div className="mt-7 flex gap-6">
                {connectInfo.map((item, index) => {
                  const Icon = (ICONS[item.icon] || Mail) as React.ComponentType<any>;
                  return (
                    <a
                      key={index}
                      href={item.href || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full border-[0.5px] border-slate-300 bg-slate-200 p-2 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
                    >
                      <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="col-span-2 flex justify-between md:justify-around">
              <div>
                <p className="mb-5 text-lg font-bold text-slate-700 md:mb-7 md:text-xl dark:text-white">
                  {com('quickLinks')}
                </p>

                <div>
                  {menuList.map((item, index) => {
                    const Icon = item.icon;
                    return item.href.startsWith('/') ? (
                      <Link
                        href={item.href}
                        key={index}
                        className="mt-5 block flex items-center text-sm text-slate-600 transition-colors hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
                      >
                        <Icon className="mr-3 inline-block h-5 w-5" />
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        key={index}
                        onClick={() => scrollToSection(item.href, router, pathname)}
                        className="mt-5 block flex cursor-pointer items-center text-sm text-slate-600 transition-colors hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
                      >
                        <Icon className="mr-3 inline-block h-5 w-5" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-5 text-lg font-bold text-slate-700 md:mb-7 md:text-xl dark:text-white">
                  {com('contact')}
                </p>

                <div className="flex flex-col gap-y-6">
                  {contactInfo.map((item, index) => {
                    const Icon = (ICONS[item.icon] || Mail) as React.ComponentType<any>;
                    return (
                      <div className="flex items-center gap-x-4" key={index}>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white p-1 transition-all duration-300 hover:border-transparent hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
                          <Icon className="h-6 w-6 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        <div>
                          <p className="mb-1 font-semibold text-slate-800 dark:text-white">
                            {item.label}
                          </p>
                          <p className="text-sm break-all text-slate-600 dark:text-slate-300">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              {/* <h3 className="mb-5 text-3xl font-semibold text-slate-800 dark:text-white">
                Kintan Umari
              </h3> */}
              <div className="flex gap-4">
                <Sparkle className="text-yellow-500" />
                <p className="text-sm text-slate-600 dark:text-slate-300">{t('reach_out')}</p>
              </div>

              <div className="mt-6 inline-flex cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-yellow-500 bg-[length:200%_200%] p-[1px] transition-all duration-500 hover:bg-right">
                <div className="text-white-700 rounded-xl bg-slate-50 px-6 py-3 dark:bg-slate-900 dark:text-white">
                  <a
                    className="flex items-center gap-2"
                    href="mailto:kintanumari178@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MoveRight size={16} />
                    <span>{com('say_hello')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="justify-items-center">
            <TextReveal text="KINTANUMARI" active={revealText} progress={footerProgress} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4 text-center">
              {/* <div className="flex items-center justify-center gap-2">
                <div className="text-3xl">👨‍💻</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Kintan Umari</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Frontend Developer</p>
                </div>
              </div> */}
              <p className="text-xs text-slate-500 md:text-sm dark:text-slate-400">
                © {new Date().getFullYear()} Kintan Umari. {t('tagline')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};
