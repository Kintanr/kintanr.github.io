'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export default function PullLampDualRope() {
  const { theme, setTheme, systemTheme } = useTheme();

  /* ---------------- THEME ---------------- */
  const resolvedTheme = theme === 'system' ? systemTheme : theme;
  const isDark = resolvedTheme === 'dark';

  /* ---------------- REFS ---------------- */
  const lampPivotRef = useRef<HTMLDivElement>(null);
  const pullRef = useRef<HTMLDivElement>(null);
  const lampRopeRef = useRef<SVGPathElement>(null);
  const pullRopeRef = useRef<SVGPathElement>(null);

  /* ---------------- PHYSICS ---------------- */
  const angle = useRef(0);
  const velocity = useRef(0);
  const raf = useRef<number | null>(null);

  const [fallen, setFallen] = useState(false);

  /* ---------------- ROPE PARAM ---------------- */
  const LAMP_ROPE = 70;
  const PULL_ROPE = 150;

  /* ---------------- ROPE DRAW ---------------- */
  const drawRope = (path: SVGPathElement | null, length: number, pull = 0, sway = 0) => {
    if (!path) return;

    const d = `
      M 50 0
      Q ${50 + sway} ${(length + pull) / 2}
        50 ${length + pull}
    `;
    path.setAttribute('d', d);
  };

  /* ---------------- LAMP SWING ---------------- */
  const startSwing = () => {
    const gravity = 0.02;
    const damping = 0.985;

    const animate = () => {
      velocity.current += -angle.current * gravity;
      velocity.current *= damping;
      angle.current += velocity.current;

      gsap.set(lampPivotRef.current, {
        rotation: angle.current * 57.3,
      });

      drawRope(lampRopeRef.current, LAMP_ROPE, 0, angle.current * 80);

      if (Math.abs(velocity.current) > 0.0001) {
        raf.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  /* ---------------- PULL CORD ---------------- */
  useEffect(() => {
    if (!pullRef.current) return;

    Draggable.create(pullRef.current, {
      type: 'y',
      bounds: { minY: 0, maxY: 20 },

      onPress() {
        if (raf.current) cancelAnimationFrame(raf.current);
      },

      onDrag() {
        drawRope(pullRopeRef.current, PULL_ROPE, this.y, 0);
      },

      onRelease() {
        // toggle theme
        if (this.y > 10) {
          setTheme(isDark ? 'light' : 'dark');
        }

        // easter egg
        if (Math.abs(this.velocityY) > 2300) {
          setFallen(true);
          return;
        }

        gsap.to(this.target, {
          y: 0,
          duration: 0.4,
          ease: 'elastic.out(1,0.4)',
        });

        gsap.to(
          { pull: this.y },
          {
            pull: 0,
            duration: 0.4,
            ease: 'elastic.out(1,0.4)',
            onUpdate() {
              drawRope(pullRopeRef.current, PULL_ROPE, this.targets()[0].pull, 0);
            },
          }
        );

        startSwing();
      },
    });
  }, [isDark]);

  /* ---------------- FALL ---------------- */
  useEffect(() => {
    if (!fallen) return;

    gsap.to(lampPivotRef.current, {
      y: 700,
      rotation: 720,
      duration: 1.2,
      ease: 'power4.in',
    });
  }, [fallen]);

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    drawRope(lampRopeRef.current, LAMP_ROPE);
    drawRope(pullRopeRef.current, PULL_ROPE);
  }, []);

  return (
    <div className="fixed top-0 right-5 z-50 select-none">
      {/* 💡 LAMP */}
      <div ref={lampPivotRef} className="origin-top flex flex-col items-center">
        <svg width="100" height={LAMP_ROPE}>
          <path
            ref={lampRopeRef}
            stroke={isDark ? 'oklch(44.2% 0.017 285.786)' : '#9ca3af'}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative -mt-5">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <path
              d="
                M20 26
                C20 22 24 20 28 20
                H36
                C40 20 44 22 44 26
                L58 40
                C60 43 58 45 54 45
                H10
                C6 45 4 43 6 40
                Z
              "
              fill={isDark ? '#333' : '#202020ff'}
            />

            <path
              d="
                M24 45
                H40
                V47
                C40 50 36 52 32 52 
                C28 52 24 50 24 47
                V45
                Z
              "
              fill={isDark ? '#666' : '#FFE680'}
            />
          </svg>

          {!isDark && (
            <div
              className="absolute top-full left-1/4 -translate-x-1/2
                         w-[300px] h-[320px]
                         bg-gradient-to-b from-yellow-300/40 to-transparent
                         blur-2xl"
            />
          )}
        </div>
      </div>

      {/* 🧵 PULL CORD */}
      <div className="absolute top-0 -right-8 flex flex-col items-center">
        <svg width="100" height={PULL_ROPE + 10}>
          <path
            ref={pullRopeRef}
            stroke={isDark ? 'oklch(44.2% 0.017 285.786)' : '#9ca3af'}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <div
          ref={pullRef}
          className="w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-600 cursor-grab -mt-5"
        />
      </div>
    </div>
  );
}
