'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { Code2, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const HeroSection = () => {
  // 1. Gunakan MotionValue untuk performa yang lebih baik (menghindari re-render berlebih)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config for smooth mouse tracking (reserved for future parallax use)
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  useSpring(mouseX, springConfig);
  useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Mengambil posisi relatif kursor (0 sampai 1) lalu dikalikan dengan jarak gerak yang diinginkan
      // Contoh: kita ingin orbs bergeser maksimal 100px
      const { clientX, clientY } = e;
      const moveX = (clientX / window.innerWidth - 0.5) * 150;
      const moveY = (clientY / window.innerHeight - 0.5) * 150;

      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const t = useTranslations('homepage');

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  const images = ['/img/picture-1.png', '/img/picture-2.jpg'];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % images.length;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Wave clip-path — foto baru naik seperti gelombang dari bawah, foto lama tetap di belakang
  const waveVariants = {
    enter: {
      clipPath:
        'polygon(0% 110%, 10% 100%, 20% 110%, 30% 100%, 40% 110%, 50% 100%, 60% 110%, 70% 100%, 80% 110%, 90% 100%, 100% 110%, 100% 110%, 0% 110%)',
      opacity: 1,
      scale: 1.05,
    },
    center: {
      clipPath:
        'polygon(0% 0%, 10% 0%, 20% 0%, 30% 0%, 40% 0%, 50% 0%, 60% 0%, 70% 0%, 80% 0%, 90% 0%, 100% 0%, 100% 110%, 0% 110%)',
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-yellow-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900"
    >
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 bg-gradient-to-r from-yellow-500 from-30% to-blue-600 to-70% bg-clip-text text-5xl font-bold text-transparent md:text-8xl"
          style={{
            textShadow: '0 0 40px rgba(34, 170, 238, 0.3)',
          }}
        >
          Kintan Umari
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 flex items-center justify-center gap-3 text-xl text-slate-700 md:text-4xl dark:text-slate-200"
        >
          <Code2 className="h-6 w-6 text-blue-500 md:h-8 md:w-8" />
          <span>Frontend Developer</span>
          <Zap className="h-6 w-6 fill-yellow-500 text-yellow-500 md:h-8 md:w-8" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-300"
        >
          {t('description')}
        </motion.p>

        {/* Profile Photo with Wave Transition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="relative inline-block"
        >
          {/* Pulse glow ring */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-yellow-400 to-blue-500 blur-xl"
          />

          {/* Gradient border */}
          <div className="mx-auto h-48 w-48 rounded-full bg-gradient-to-r from-blue-500 to-yellow-500 p-1 shadow-2xl shadow-blue-500/50">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              {/* Foto sebelumnya — diam di belakang sebagai background */}
              {prevIndex !== null && (
                <img
                  src={images[prevIndex]}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 z-0 h-full w-full object-cover"
                />
              )}

              {/* Foto baru — animasi gelombang di atas foto lama */}
              <AnimatePresence mode="sync">
                <motion.img
                  key={images[index]}
                  src={images[index]}
                  alt="Kintan Umari"
                  className="absolute inset-0 z-10 h-full w-full object-cover"
                  variants={waveVariants}
                  initial="enter"
                  animate="center"
                  transition={{
                    duration: 0.9,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    clipPath: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
                    scale: { duration: 0.9 },
                  }}
                />
              </AnimatePresence>

              {/* Ripple overlay saat pergantian */}
              <AnimatePresence>
                <motion.div
                  key={`ripple-${index}`}
                  className="pointer-events-none absolute inset-0 z-20 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 110%, rgba(99,179,237,0.55) 0%, transparent 65%)',
                  }}
                  initial={{ scaleY: 0, originY: 1, opacity: 1 }}
                  animate={{ scaleY: [0, 1.3, 0], opacity: [0.9, 0.4, 0] }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Dot indicators */}
          {/* <div className="mt-3 flex justify-center gap-2">
            {images.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: i === index ? 1.3 : 1,
                  opacity: i === index ? 1 : 0.35,
                }}
                transition={{ duration: 0.3 }}
                className="h-1.5 w-1.5 rounded-full bg-blue-500"
              />
            ))}
          </div> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="my-12 bg-clip-text text-xl font-semibold text-blue-500 md:text-3xl"
        >
          {t.rich('tagline', {
            quote: (chunks) => (
              <>
                <span className="text-sky-400 dark:text-sky-200">"</span>
                {chunks}
                <span className="text-sky-400 dark:text-sky-200">"</span>
              </>
            ),
            highlight: (chunks) => <span className="text-yellow-500">{chunks}</span>,
          })}
        </motion.div>
      </div>
    </section>
  );
};