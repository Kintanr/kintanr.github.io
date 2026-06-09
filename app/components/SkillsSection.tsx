'use client';

import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Palette, Zap, GitBranch, Layout, Sparkles } from 'lucide-react';
import Image from 'next/image';
import skills from '../data/skills.json';
import { useTranslations } from 'next-intl';

export const SkillsSection = () => {
  const containerRef = useRef(null);
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const t = useTranslations('skills');

  // const skills = [
  //   { name: 'HTML5', icon: Code2, color: 'from-orange-400 to-red-500' },
  //   { name: 'CSS3', icon: Palette, color: 'from-blue-400 to-cyan-500' },
  //   { name: 'JavaScript', icon: Zap, color: 'from-yellow-400 to-orange-500' },
  //   { name: 'React', icon: Code2, color: 'from-cyan-400 to-blue-500' },
  //   { name: 'Vue.js', icon: Code2, color: 'from-green-400 to-emerald-500' },
  //   { name: 'Nuxt', icon: Layout, color: 'from-green-500 to-teal-500' },
  //   { name: 'Tailwind CSS', icon: Palette, color: 'from-cyan-400 to-blue-600' },
  //   { name: 'Motion', icon: Sparkles, color: 'from-purple-400 to-pink-500' },
  //   { name: 'Git', icon: GitBranch, color: 'from-orange-500 to-red-600' },
  //   { name: 'TypeScript', icon: Code2, color: 'from-blue-500 to-blue-700' },
  // ];

  const ITEM_WIDTH = 120;
  const GAP = 40;
  // Move from first item centered to last item centered

  const totalContentWidth = skills.length * ITEM_WIDTH + (skills.length - 1) * GAP;

  const origintotalDistance = (skills.length - 1) * (ITEM_WIDTH + GAP);
  // const totalDistance = totalContentWidth - window.innerWidth;
  // console.log('total content width ', totalContentWidth);
  // console.log('origin distance ', origintotalDistance);
  // console.log('what data ', totalDistance);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -origintotalDistance - 2.8 * window.innerWidth]
  );

  return (
    <div
      id="skills"
      className="h-auto bg-gradient-to-b from-white to-slate-50 pt-10 dark:from-slate-900 dark:to-slate-950"
    >
      <div ref={containerRef} className="scroll-container">
        <div ref={skillsRef} className="sticky top-0 h-screen overflow-hidden pt-20">
          <div className="mx-auto mb-26 px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="mb-2 pb-4 text-3xl font-bold text-blue-500 md:text-6xl">
                {t('title')}
              </h2>
              <p className="text-slate-600 md:text-lg dark:text-slate-300">{t('subtitle')}</p>
            </motion.div>
          </div>

          <motion.div style={{ x }} className="flex gap-8 px-6">
            {[...skills].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={
                    isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 50 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.43, 0.13, 0.23, 0.96],
                  }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group cursor-hover relative h-80 w-64 flex-shrink-0"
                >
                  <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-transparent dark:border-slate-700 dark:bg-slate-800/50">
                    {/* Glow effect on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${skill.color} -z-10 blur-xl`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10 ${skill.color}`}
                    />

                    {/* Icon */}
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={isInView ? { rotate: 360 } : { rotate: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: (index + 0.5) * 0.1 + 0.3,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      }}
                      className={`h-24 w-24 rounded-2xl bg-gradient-to-br ${skill.color} mb-6 p-1 shadow-lg transition-shadow duration-300 group-hover:shadow-2xl`}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-white dark:bg-slate-900">
                        <div className="relative aspect-auto h-50 w-12 object-contain p-2">
                          <Image
                            src={skill.icon}
                            alt={skill.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        {/* <Icon className="h-12 w-12 text-slate-700 dark:text-slate-200" /> */}
                      </div>
                    </motion.div>

                    {/* Skill name */}
                    <h3 className="mb-2 text-2xl font-bold text-slate-800 dark:text-white">
                      {skill.name}
                    </h3>

                    {/* Decorative line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + 0.4,
                      }}
                      className={`h-1 w-16 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-300 group-hover:w-24`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <StyleSheet />
    </div>
  );
};

function StyleSheet() {
  return (
    <style>{`
            .scroll-container {
                height: 300vh;
                position: relative;
            }

            .sticky-wrapper {
                position: sticky;
                top: 0;
                height: 100vh;
                width: 400px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                overflow: visible;
            }


            @media (max-width: 600px) {
                .sticky-wrapper {
                    width: 280px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                
                .scroll-container {
                    height: auto;
                }
                .sticky-wrapper {
                    position: relative;
                    height: auto;
                    width: 100%;
                    overflow-x: auto;
                    padding: 50px 0;
                }
            }
        `}</style>
  );
}
