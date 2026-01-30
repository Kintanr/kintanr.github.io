'use client';

import { useRef, useEffect } from 'react';

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null);
  const current = useRef({ x: 50, y: 50 });
  const target = useRef({ x: 50, y: 50 });
  const rafId = useRef<number | null>(null);

  const animate = () => {
    current.current.x += (target.current.x - current.current.x) * 0.08;
    current.current.y += (target.current.y - current.current.y) * 0.08;

    const card = cardRef.current;
    if (card) {
      card.style.setProperty('--gx', `${current.current.x}%`);
      card.style.setProperty('--gy', `${current.current.y}%`);
    }

    rafId.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    target.current.x = ((e.clientX - rect.left) / rect.width) * 100;
    target.current.y = ((e.clientY - rect.top) / rect.height) * 100;

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate);
    }
  };

  const handleMouseLeave = () => {
    // target.current.x = 50;
    // target.current.y = 50;
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-200 dark:bg-neutral-950">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-64 w-96 rounded-xl bg-neutral-900 [--gx:50%] [--gy:50%] before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:bg-[radial-gradient(circle_at_var(--gx)_var(--gy),rgba(255,255,255,0.35),transparent_65%)] before:opacity-0 before:blur-md before:transition-opacity before:duration-300 hover:before:opacity-100"
      >
        <div className="relative z-10 p-6 text-white">
          <h3 className="text-xl font-semibold">Fluid Radial Gradient</h3>
          <p className="mt-2 text-sm text-neutral-300">Radial gradient dengan inertia (fluid)</p>
        </div>
      </div>
    </div>
  );
}
