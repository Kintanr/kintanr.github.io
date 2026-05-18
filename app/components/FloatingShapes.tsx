'use client';
import { motion } from 'motion/react';

export const FloatingShapes = () => {
  const shapes = [
    { size: 60, top: '10%', left: '5%', duration: 8, delay: 0 },
    { size: 40, top: '70%', left: '10%', duration: 10, delay: 1 },
    { size: 80, top: '30%', left: '85%', duration: 12, delay: 2 },
    { size: 50, top: '80%', left: '80%', duration: 9, delay: 1.5 },
    { size: 70, top: '50%', left: '90%', duration: 11, delay: 0.5 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gradient-to-br from-yellow-500/10 to-blue-600/10 blur-xl"
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
};
