'use client';
import { motion } from 'motion/react';
import { Mail, MapPin, Globe } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkle } from 'lucide-react';

export const Footer = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'alex.johnson@example.com',
      href: 'mailto:alex.johnson@example.com',
    },
    // { icon: Github, label: 'GitHub', value: 'github.com/alexjohnson', href: 'https://github.com' },
    // {
    //   icon: Linkedin,
    //   label: 'LinkedIn',
    //   value: 'linkedin.com/in/alexjohnson',
    //   href: 'https://linkedin.com',
    // },
    { icon: Globe, label: 'Portfolio', value: 'alexjohnson.dev', href: '#' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: null },
  ];

  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let direction = -1;
    let xPercent = 0;

    const animate = () => {
      xPercent += 0.03 * direction;

      // wrap seamless karena hanya ada 2 group identik
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
      gsap.ticker.remove(animate);
      trigger.kill();
    };
  }, []);

  return (
    <footer
      id="contact"
      className="relative bg-gradient-to-b from-slate-50 to-white py-36 dark:from-slate-950 dark:to-slate-900"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="w-full overflow-hidden">
          <div className="w-full overflow-hidden">
            <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
              {/* group 1 */}
              <div className="flex">
                <span className="flex gap-9 pr-10 text-4xl text-white">
                  <Sparkle className="h-8 w-8 text-white" /> Let's work together{' '}
                  <Sparkle className="h-8 w-8 text-white" /> Let's work together{' '}
                </span>
                <span className="flex gap-9 pr-10 text-4xl text-white">
                  <Sparkle className="h-8 w-8 text-white" />
                  Let's work together <Sparkle className="h-8 w-8 text-white" /> Let's work
                  together{' '}
                </span>
              </div>

              {/* duplicate group 2 */}
              <div className="flex">
                <span className="flex gap-9 pr-10 text-4xl text-white">
                  <Sparkle className="h-8 w-8 text-white" /> Let's work together{' '}
                  <Sparkle className="h-8 w-8 text-white" /> Let's work together{' '}
                </span>
                <span className="flex gap-9 pr-10 text-4xl text-white">
                  <Sparkle className="h-8 w-8 text-white" />
                  Let's work together <Sparkle className="h-8 w-8 text-white" /> Let's work
                  together{' '}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 text-center">
          {/* <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
          >
            Let's Connect
          </motion.h2> */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Feel free to reach out for collaborations or just a friendly hello
          </motion.p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-transparent hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">
                    <Icon className="mb-3 h-8 w-8 text-cyan-500 transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="mb-1 font-semibold text-slate-800 dark:text-white">
                      {item.label}
                    </h3>
                    <p className="text-sm break-all text-slate-600 dark:text-slate-300">
                      {item.value}
                    </p>
                  </div>

                  {item.href && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      className="absolute right-0 bottom-0 left-0 h-1 origin-left rounded-b-xl bg-gradient-to-r from-cyan-500 to-purple-500"
                    />
                  )}
                </div>
              </motion.div>
            );

            return item.href ? (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-hover"
              >
                {content}
              </a>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-slate-200 pt-8 dark:border-slate-800"
        >
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="text-3xl">👨‍💻</div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Kintan Umari</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Frontend Developer</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} Kintan Umari. Crafted with passion and code.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
