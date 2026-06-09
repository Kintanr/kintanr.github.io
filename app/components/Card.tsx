'use client';

import { useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';

type CardProps = {
  color?: string;
  project: any;
};

export default function Home({ color = 'rgba(59,130,246,0.45)', project }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const current = useRef({ x: 50, y: 50 });
  const target = useRef({ x: 50, y: 50 });
  const rafId = useRef<number | null>(null);

  const locale = useLocale();

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

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ['--c' as any]: color } as React.CSSProperties}
      className="relative h-full [--gx:50%] [--gy:50%] before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:bg-[radial-gradient(circle_at_var(--gx)_var(--gy),var(--c),transparent_65%)] before:opacity-0 before:blur-md before:transition-opacity before:duration-300 hover:before:opacity-100"
    >
      <div className="flex h-full flex-col justify-around p-6">
        <h3 className="mb-3 text-2xl font-bold text-blue-800 dark:text-blue-400">
          {project.title}
        </h3>
        <div className="flex h-full flex-col justify-between">
          <p className="mb-4 text-slate-600 dark:text-slate-300">{project.description[locale]}</p>

          {/* Tech stack */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project?.tech?.map((tech: any) => (
              <span
                key={tech}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
