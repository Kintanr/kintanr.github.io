'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { Code2, Sparkles, Zap } from 'lucide-react';
import Image from 'next/image';

export const HeroSection = () => {
  // 1. Gunakan MotionValue untuk performa yang lebih baik (menghindari re-render berlebih)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Tambahkan efek spring agar gerakan terasa "kenyal" dan halus
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

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

  const codeElements = ['{ }', '<div>', 'const', '=>', '</>', 'useState', 'return'];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-yellow-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900"
    >
      {/* Animated gradient orbs */}
      {/* Orb 1 - Mengikuti Mouse */}
      {/* <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          background: 'radial-gradient(circle, rgba(238, 214, 34, 0.25), transparent 70%)',
        }}
        className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full blur-3xl"
      /> */}

      {/* Orb 2 - Bergerak Berlawanan (Parallax Effect) */}
      {/* <motion.div
        style={{
          x: useSpring(mouseX, { stiffness: 50, damping: 20 }), // Lebih lambat
          y: useSpring(mouseY, { stiffness: 50, damping: 20 }),
          translateX: '-50%', // Agar tetap di area kanan bawah
          background: 'radial-gradient(circle, rgba(85, 88, 247, 0.13), transparent 70%)',
        }}
        className="absolute right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full blur-3xl"
      /> */}

      {/* Floating code elements */}
      {/* Floating Code Elements */}
      {/* {codeElements.map((code, index) => (
        <motion.div
          key={index}
          style={{
            left: `${15 + index * 12}%`,
            top: `${20 + (index % 3) * 20}%`,
            // Tambahkan sedikit pengaruh kursor pada teks juga
            x: smoothX,
            y: smoothY,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute font-mono text-2xl text-blue-600/20 select-none md:text-4xl dark:text-blue-300/10"
        >
          {code}
        </motion.div>
      ))} */}

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-4 py-2 backdrop-blur-sm dark:border-cyan-400/30">
            <Sparkles className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Available for new projects
            </span>
          </div>
        </motion.div> */}

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 bg-gradient-to-r from-yellow-500 from-30% to-blue-600 to-70% bg-clip-text text-6xl font-bold text-transparent md:text-8xl"
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
          className="mb-8 flex items-center justify-center gap-3 text-2xl text-slate-700 md:text-4xl dark:text-slate-200"
        >
          <Code2 className="h-8 w-8 text-blue-500" />
          <span>Frontend Developer</span>
          <Zap className="h-8 w-8 fill-yellow-500 text-yellow-500" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-300"
        >
          Passionate about building responsive, user-friendly, and visually appealing web and mobile
          applications. I transform ideas into engaging digital experiences using modern frontend
          technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="relative inline-block"
        >
          <div className="mx-auto h-48 w-48 rounded-full bg-gradient-to-r from-blue-500 to-yellow-500 p-1 shadow-2xl shadow-blue-500/50">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <Image
                src="/img/picture-1.png"
                alt="Kintan Umari"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-yellow-400 to-blue-500 blur-xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="my-12 bg-clip-text text-2xl font-semibold text-blue-500 md:text-3xl"
        >
          <span className="text-sky-200">"</span>Designing and developing modern{' '}
          <span className="text-yellow-500">web & mobile</span> experiences.
          <span className="text-sky-200">"</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transform"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-slate-400 pt-2 dark:border-slate-500">
          <div className="h-3 w-1 rounded-full bg-gradient-to-b from-yellow-400 to-blue-500" />
        </div>
      </motion.div> */}
    </section>
  );
};
