'use client';

import { motion } from 'framer-motion';

export default function TextRevealChar({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`flex flex-wrap ${className}`}>
      {text.split('').map((char, i) => (
        <span key={i} className="overflow-hidden">
          <motion.span
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.02,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
